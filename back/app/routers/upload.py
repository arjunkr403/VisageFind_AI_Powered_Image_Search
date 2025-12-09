from fastapi import APIRouter, UploadFile, File, HTTPException
from app.ml.embeddings import gen_img_embedding
import app.ml.faiss_index as faiss_store

# HTTPException Used to return custom error responses
import uuid  # Used to generate unique IDs for filenames to avoid collisions
from PIL import Image  # verify files are real images
import aiofiles  # Async file saving
from app.services.db import get_db_connection, release_db_connection
from app.services.cache import redis_client
import numpy as np

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/")
# Accepts an uploaded file from the client using multipart/form-data
# UploadFile allows streaming large files without loading them fully into memory
# File(...) means this field is required
async def upload_image(file: UploadFile = File(...)):

    # validating file type
    if file.content_type not in [
        "image/png",
        "image/jpg",
        "image/jpeg",
    ]:  # Only allow PNG or JPEG images
        raise HTTPException(
            status_code=400, detail="Invalid file type"
        )  # If someone uploads a PDF, EXE, ZIP → return HTTP 400

    try:
        img = Image.open(file.file)
        img.verify()  # Ensures the file is a real image
        file.file.seek(0)  # Reset pointer back to start after verification
    except Exception:
        raise HTTPException(
            status_code=400, detail="Uploaded file is not a valid image"
        )

    # create unique name
    file_id = str(uuid.uuid4())
    extension = file.filename.split(".")[-1]  # extract original extension
    filename = f"{file_id}.{extension}"

    # defining where file will store in backend
    filepath = f"app/uploads/{filename}"

    # aiofiles saves files without blocking other requests
    async with aiofiles.open(filepath, "wb") as buffer:
        content = await file.read()
        await buffer.write(content)

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO images (filename, filepath)
                VALUES (%s, %s)
                RETURNING id;
            """,
                (filename, filepath),
            )
            image_id = cur.fetchone()["id"]  # getting id of inserted row
            conn.commit()

        vector = gen_img_embedding(filepath)

        with conn.cursor() as cur:
            cur.execute(
                """
                    INSERT INTO embeddings (image_id, vector)
                    VALUES (%s, %s)
                    ON CONFLICT (image_id) DO UPDATE
                    SET vector = EXCLUDED.vector;
                """,
                (image_id, vector),
            )
            conn.commit()
            # updating FAISS index in real time
        if faiss_store.faiss_index is not None:  # ensure FAISS is loaded
            vector_np = np.array([vector], dtype="float32")
            faiss_store.faiss_index.add(vector_np)  # add new embedding to index
            faiss_store.faiss_ids.append(image_id)  # maintain mapping
    finally:
        release_db_connection(conn)  # IMPORTANT
    # Cache upload metadata
    redis_client.set(f"image:{filename}", filepath)
    return {
        "message": "Image uploaded successfully",
        "image_id": image_id,
        "filename": filename,
        "path": filepath,
    }
