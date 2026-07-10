from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.interview import InterviewHistory
from app.routers.resume import router as resume_router

from app.routers.auth import router as auth_router
from app.routers.interview import router as interview_router
from app.routers.history import router as history_router
from app.routers.dashboard import router as dashboard_router
Base.metadata.create_all(bind=engine)
 
app = FastAPI(
    title="AI Interview Coach"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(interview_router)
app.include_router(history_router)
app.include_router(dashboard_router)
app.include_router(resume_router)
 


@app.get("/")
def home():
    return {"message": "Backend Running"}