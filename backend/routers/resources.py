import asyncio
from fastapi import APIRouter
from models.schemas import ResourceRequest
from services.wikipedia_service import get_wikipedia_summary
from services.youtube_service import search_youtube_videos
from pydantic import BaseModel
from typing import List, Optional
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    topic: str
    node: Optional[str] = None
    messages: List[ChatMessage]

@router.post("/resources")
async def get_resources(request: ResourceRequest):
    concept = request.concept
    wiki, videos = await asyncio.gather(
        get_wikipedia_summary(concept),
        search_youtube_videos(concept)
    )
    return {
        "concept": concept,
        "wikipedia": wiki,
        "videos": videos
    }

@router.post("/chat")
async def chat(request: ChatRequest):
    system = f"""You are a helpful learning assistant for the topic: {request.topic}.
{"The user is currently looking at the concept: " + request.node if request.node else ""}
Give clear, concise, friendly answers. Use examples where helpful. Keep responses under 150 words."""

    history = "\n".join([
        f"{'User' if m.role == 'user' else 'Assistant'}: {m.content}"
        for m in request.messages
    ])

    prompt = f"{system}\n\nConversation:\n{history}\n\nAssistant:"

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    return {"reply": response.text.strip()}