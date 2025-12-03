from fastapi import FastAPI
from app.routers import health,upload
from app.services.init_db import create_tables
app = FastAPI() #creates a FastAPI application obj

@app.get("/") # called 'decorator'attaches below function to the route defined in the decorator itself.
def home():
    return {"message": "Backend running!"}

create_tables() # create DB tables when app starts

app.include_router(health.router)
app.include_router(upload.router)