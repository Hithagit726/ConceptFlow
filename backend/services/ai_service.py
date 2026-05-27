import os
import json
from google import genai

PROMPT_TEMPLATE = """You are an expert educational curriculum designer.
Generate a complete learning roadmap for: {topic}

Return ONLY valid JSON, no markdown blocks, no backticks, no explanation, just raw JSON:
{{
  "topic": "{topic}",
  "nodes": [
    {{
      "id": "snake_case_id",
      "title": "Human Readable Title",
      "description": "2-3 sentence explanation of what this concept is",
      "difficulty": "Beginner",
      "estimated_time": "1 week",
      "prerequisites": [],
      "related_concepts": []
    }}
  ],
  "edges": [
    {{
      "source": "prerequisite_node_id",
      "target": "dependent_node_id"
    }}
  ]
}}

Rules:
- Include 8-15 nodes
- IDs must be snake_case and unique
- Start from fundamentals, progress to advanced
- difficulty must be exactly one of: Beginner, Intermediate, Advanced
- No circular edges
- Return ONLY the JSON object, nothing else"""

def generate_roadmap_sync(topic: str) -> dict:
    key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=key)
    prompt = PROMPT_TEMPLATE.format(topic=topic)
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )
    raw = response.text.strip()
    print("RAW RESPONSE:", raw[:300], flush=True)
    if "```" in raw:
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()
    start = raw.find("{")
    end = raw.rfind("}") + 1
    if start != -1 and end > start:
        raw = raw[start:end]
    return json.loads(raw)

async def generate_roadmap(topic: str) -> dict:
    import asyncio
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, generate_roadmap_sync, topic)