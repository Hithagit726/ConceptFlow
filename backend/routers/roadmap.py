from fastapi import APIRouter, HTTPException
from models.schemas import RoadmapRequest
from services.ai_service import generate_roadmap
import traceback
import os
print("GEMINI KEY EXISTS:", bool(os.getenv("GEMINI_API_KEY")))
print("GEMINI KEY VALUE:", os.getenv("GEMINI_API_KEY")[:5] if os.getenv("GEMINI_API_KEY") else "NONE")
router = APIRouter()

@router.post("/generate-roadmap")
async def create_roadmap(request: RoadmapRequest):
    if not request.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty")
    try:
        roadmap = await generate_roadmap(request.topic.strip())
        return roadmap
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to generate roadmap: {str(e)}")

@router.get("/topic-details/{concept_id}")
async def get_topic_details(concept_id: str, title: str):
    return {"id": concept_id, "title": title}