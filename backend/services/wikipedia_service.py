import httpx

WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"

async def get_wikipedia_summary(concept: str) -> dict:
    query = concept.replace(" ", "_")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{WIKI_API}{query}",
                headers={"User-Agent": "RabbitHoleMapper/1.0"},
                timeout=5.0
            )
            if response.status_code == 200:
                data = response.json()
                return {
                    "title": data.get("title", concept),
                    "summary": data.get("extract", "")[:500],
                    "url": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
                    "thumbnail": data.get("thumbnail", {}).get("source", None)
                }
        except Exception:
            pass
    return {"title": concept, "summary": "", "url": "", "thumbnail": None}