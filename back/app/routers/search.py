from fastapi import APIRouter, UploadFile, File, HTTPException
from app.ml.embeddings import gen_img_embedding
from app.services.embedding_store import fetch_all_embeddings
from app.services.db import get_db_connection,release_db_connection
import app.ml.faiss_index as faiss_store # import module, not snapshot
import numpy as np
import uuid
import aiofiles
import os
router = APIRouter(prefix="/search", tags=["Search"])


@router.post("/")
async def search_similar_images(file: UploadFile = File(...), top_k: int = 5):

    temp_name = f"temp_{uuid.uuid4()}.jpg"
    temp_path = f"app/uploads/{temp_name}"

    try:
        # read uploaded image into bytes
        content = await file.read()
        # saving file asynchronously
        async with aiofiles.open(temp_path, "wb") as out_file:
            await out_file.write(content)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to save uploaded image")

    # generating CLIP embedding for the uploaded image

    try:
        query_embedding = gen_img_embedding(
            temp_path
        )  # creates embedding for the given image path
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or unreadable image file")

    all_data = fetch_all_embeddings()  # from the embedding_store

    if len(all_data) == 0:
        raise HTTPException(status_code=404, detail="No embeddings found in database")

    # extracting list of image_ids and their vectors

    ids, vectors = zip(*((row["image_id"], row["vector"]) for row in all_data))
    ids = list(ids)
    vectors = list(vectors)
    
    #load global FAISS index 
    if faiss_store.faiss_index is None:
        raise HTTPException(status_code=500, detail="FAISS index not initialized")
    
    #searching FAISS engine for nearest neighbours
    
    try:
        # distances = Distance/similarity scores, shape -> (n_queries, k)
        # indices = Index positions of nearest vectors, shape -> (n_queries, k)
        # search() always needs =>{ vector, number_of_results}
        distances,indices=faiss_store.faiss_index.search(
            np.array([query_embedding]).astype("float32"),
            top_k
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Error during FAISS search")
    
    
    #Map FAISS results -> real image_ids
    
    results = []
    
    for score, idx in zip (distances[0],indices[0]):
        image_id=ids[idx]
        conn= get_db_connection()
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT filename,filepath FROM images WHERE id=%s", (image_id,))
                row=cur.fetchone()
                filename=row["filename"]
                url=f"http://localhost:8000/uploads/{filename}"
                
                results.append({
                    "image_id":ids[idx], # map FAISS index -> real image_id 
                    "score" : float(score), #lower score = more similar
                    "filename" : filename,
                    "url" : url
                })
        finally:
            release_db_connection(conn)
    
    #search image cleanup
    try:
        os.remove(temp_path)
    except:
        pass
    
    #final response    
    return {
        "query_image" : temp_name,
        "results" :results
    }
    
    
    # High Order Overview
    
    # 1. save uploaded images(async)
    # 2. convert image -> embedding
    # 3. fetch stored embeddings from postgres
    # 4. Build FAISS index
    # 5. Run similarity search
    # 6. Map FAISS index -> real image ids
    