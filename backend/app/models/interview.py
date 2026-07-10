from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class InterviewHistory(Base):
    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    role = Column(String)

    difficulty = Column(String)

    score = Column(Float)

    feedback = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())