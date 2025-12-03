from fastapi import APIRouter 
#APIRouter is used to group routes (endpoints) in a modular way.

from app.services.db import get_db_connection #function that connects to PostgreSQL
from app.services.cache import redis_client # pre-configured Redis client

router=APIRouter() #router instance , creates a "mini FastAPI app"

@router.get("/health")
def health():
    #testing PostgreSQL
    try:
        connection=get_db_connection() #tries to connect
        connection.close()
        db_status="OK"
    except:
        db_status="FAILED"
        
    #tesing Redis
    try:
        redis_client.ping() #health check command
        redis_status="OK"
    except:
        redis_status="FAILED"
    
    return{
        "status":"running",
        "database":db_status,
        "redis":redis_status
    }