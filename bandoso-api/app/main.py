from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, document, chat, visitor_logs
from app.db.qdrant import init_vector_stores
from app.config import config

app = FastAPI(title="BanDoSo - API")

@app.on_event("startup")
async def startup_event():
    """Initialize vector stores on startup"""
    try:
        init_vector_stores()
        print("Vector stores initialized successfully")
    except Exception as e:
        print(f"Error initializing vector stores: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(users.router)
app.include_router(chat.router)
app.include_router(document.router)
app.include_router(visitor_logs.router)