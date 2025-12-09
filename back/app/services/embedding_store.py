from app.services.db import get_db_connection,release_db_connection

def fetch_all_embeddings():
    conn=get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT image_id,vector FROM embeddings")
            data = cur.fetchall() #fetch all rows
            return data
    finally:
        release_db_connection(conn)