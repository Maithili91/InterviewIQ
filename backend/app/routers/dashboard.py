from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.interview import InterviewHistory

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats/{user_id}")
def get_dashboard_stats(user_id: int, db: Session = Depends(get_db)):

    interviews = db.query(InterviewHistory).filter(
        InterviewHistory.user_id == user_id
    )

    completed = interviews.count()

    avg_score = db.query(
        func.avg(InterviewHistory.score)
    ).filter(
        InterviewHistory.user_id == user_id
    ).scalar()

    best_score = db.query(
        func.max(InterviewHistory.score)
    ).filter(
        InterviewHistory.user_id == user_id
    ).scalar()

    return {
        "completed": completed,
        "average": round(avg_score, 2) if avg_score else 0,
        "best": best_score if best_score else 0
    }