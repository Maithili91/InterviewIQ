from fastapi import APIRouter, UploadFile, File
import shutil
from app.services.resume_parser import extract_resume_text

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    path = f"uploads/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_resume_text(path)

    return {
    "message": "Resume Uploaded",
    "resume": resume_text
}