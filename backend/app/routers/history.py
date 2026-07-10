from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.interview import InterviewHistory

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):

    history = (
        db.query(InterviewHistory)
        .filter(InterviewHistory.user_id == user_id)
        .order_by(InterviewHistory.created_at.desc())
        .all()
    )

    return history