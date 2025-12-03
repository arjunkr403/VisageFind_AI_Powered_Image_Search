import psycopg2  # psycopg2 is a PostgreSQL database adapter for Python.It allows you to connect and run SQL queries against PostgreSQL.
from psycopg2.extras import RealDictCursor  # return results as dictionaries.
from app.config import settings  # values from .env


# function to call anywhere to get a new DB connection
def get_db_connection():
    connection = psycopg2.connect(
        host=settings.POSTGRES_HOST,
        database=settings.POSTGRES_DB,
        user=settings.POSTGRES_USER,
        password=settings.POSTGRES_PASSWORD,
        cursor_factory=RealDictCursor,  # Makes query results return dictionaries instead of tuples.
    )
    return connection
