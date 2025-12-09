from app.services.db import get_db_connection, release_db_connection


def create_tables():  # to initialize db schema

    conn = get_db_connection()  # borrow connection
    try:
        with conn: #auto-commit block
            with conn.cursor() as cur:  # used to execute SQL commands,sends queries to db , retrives results

                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS images (
                        id SERIAL PRIMARY KEY, 
                        filename TEXT NOT NULL, 
                        filepath TEXT NOT NULL,
                        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
                    );
                    """
                )
                
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS embeddings (
                        id SERIAL PRIMARY KEY,
                        image_id INTEGER REFERENCES images(id) ON DELETE CASCADE,
                        vector FLOAT8[]
                    );
                    """
                    # If the image is deleted, its embedding gets deleted automatically (cascade delete).
                    # vector FLOAT8[]=> PostgreSQL array type (float8 = double precision = Python float).
                )

    finally:
        release_db_connection(conn)  # return connection to pool
