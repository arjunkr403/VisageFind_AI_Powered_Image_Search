from fastapi import FastAPI
from app.routers import health
app = FastAPI() #creates a FastAPI application obj

@app.get("/") # called 'decorator'attaches below function to the route defined in the decorator itself.
def home():
    return {"message": "Backend running!"}


app.include_router(health.router)