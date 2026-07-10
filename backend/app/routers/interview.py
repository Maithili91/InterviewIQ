from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ollama_service import ask_llama
from app.models.interview import InterviewHistory
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
import re

router = APIRouter(prefix="/interview", tags=["Interview"])


class InterviewRequest(BaseModel):
    role: str
    difficulty: str
    resume: str = ""
    
class SubmitAnswer(BaseModel):
    user_id: int
    role: str
    difficulty: str
    answer: str     

@router.post("/question")
def generate_question(data: InterviewRequest):

    prompt = f"""
You are a professional interviewer.

Candidate Role:{data.role} Candidate Resume {data.role}
Instructions:
If resume is available:
- Ask questions only from
- Projects
- Skills
- Internship
- Technologies
- Experience
If resume is empty:
Generate a normal interview question.
Difficulty:
{data.difficulty}
Return ONLY one interview question.
"""

    question = ask_llama(prompt)

    return {
        "question": question
    }

@router.post("/submit")
def submit_answer(data: SubmitAnswer, db: Session = Depends(get_db)):
    prompt = f"""
    You are an interview evaluator.

    Role: {data.role}

    Candidate Answer:
    {data.answer}

    Give:
    1. Score out of 10
    2. Short feedback

    Return in this format only:

    Score: 8.5
    Feedback: Good answer. Improve communication.
    """

    result = ask_llama(prompt)

    match = re.search(r"Score\s*:\s*(\d+(\.\d+)?)", result)

    if match:
        score = float(match.group(1))
    else:
        score = 0.0
    history = InterviewHistory(
            user_id=data.user_id,
            role=data.role,
            difficulty=data.difficulty,
            score=score,
            feedback=result
        )

    db.add(history)
    db.commit()

    return {
            "score": score,
            "feedback": result
        }