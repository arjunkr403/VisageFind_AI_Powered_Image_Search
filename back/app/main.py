from fastapi import FastAPI
from app.routers import health, upload, search
from app.ml.faiss_index import load_faiss_index
from app.services.init_db import create_tables
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()  # create DB tables when app starts
    load_faiss_index()      # this runs ONCE when the app starts
    yield                   # app runs 
    print("Shutting down...")
    # Startup code before the yield
    # Shutdown code after the yield

app = FastAPI(lifespan=lifespan)

app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads") #creates a public url at /uploads
@app.get(
    "/"
)  # called 'decorator'attaches below function to the route defined in the decorator itself.
def home():
    return {"message": "Backend running!"}



app.include_router(health.router)
app.include_router(upload.router)
app.include_router(search.router)
# app.include_router(embedding.router)
