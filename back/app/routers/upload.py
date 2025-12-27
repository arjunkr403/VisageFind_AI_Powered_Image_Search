# HTTPException Used to return custom error responses
import uuid  # Used to generate unique IDs for filenames to avoid collisions
from typing import List

import aiofiles  # Async file saving
import app.ml.faiss_index as faiss_store
import numpy as np
from app.ml.embeddings import gen_img_embedding
from app.services.cache import redis_client
from app.services.db import get_db_connection, release_db_connection
from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image  # verify files are real images

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("")
@router.post("/")
# Accepts an uploaded file from the client using multipart/form-data
# UploadFile allows streaming large files without loading them fully into memory
# File(...) means this field is required
async def upload_images(files: List[UploadFile] = File(...)):
    uploaded_results = []
    # validating file type
    for file in files:
        # validating file type
        if file.content_type not in [
            "image/png",
            "image/jpg",
            "image/jpeg",
        ]:  # Only allow PNG or JPEG images
            # For batch, we could skip or raise. Keeping strict for now.
            raise HTTPException(
                status_code=400, detail=f"Invalid file type for {file.filename}"
            )  # If someone uploads a PDF, EXE, ZIP → return HTTP 400

        try:
            img = Image.open(file.file)
            img.verify()  # Ensures the file is a real image
            file.file.seek(0)  # Reset pointer back to start after verification
        except Exception:
            raise HTTPException(
                status_code=400,
                detail=f"Uploaded file {file.filename} is not a valid image",
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

        uploaded_results.append(
            {
                "image_id": image_id,
                "filename": filename,
                "path": filepath,
            }
        )

    return {"message": "Images uploaded successfully", "uploaded": uploaded_results}


@router.get("/history")
async def get_upload_history(limit: int = 50):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id ,filename,uploaded_at
                FROM images
                ORDER BY uploaded_at DESC
                LIMIT %s;
                """,
                (limit,),
            )
            rows = cur.fetchall()
            history = []
            for row in rows:
                history.append(
                    {
                        "id": row["id"],
                        "filename": row["filename"],
                        "time": row["uploaded_at"].strftime("%Y-%m-%d %H:%M:%S")
                        if row["uploaded_at"]
                        else "N/A",
                        "status": "Success",
                    }
                )
            return history
    finally:
        release_db_connection(conn)
