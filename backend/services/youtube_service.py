import httpx
import os

YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search"

async def search_youtube_videos(concept: str, max_results: int = 3) -> list:
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        return []

    params = {
        "part": "snippet",
        "q": f"{concept} tutorial explained",
        "type": "video",
        "maxResults": max_results,
        "relevanceLanguage": "en",
        "videoDuration": "medium",
        "key": api_key
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(YOUTUBE_API, params=params, timeout=8.0)
            if response.status_code == 200:
                items = response.json().get("items", [])
                return [
                    {
                        "title": item["snippet"]["title"],
                        "channel": item["snippet"]["channelTitle"],
                        "thumbnail": item["snippet"]["thumbnails"]["medium"]["url"],
                        "url": f"https://youtube.com/watch?v={item['id']['videoId']}",
                        "published": item["snippet"]["publishedAt"][:10]
                    }
                    for item in items
                ]
        except Exception:
            pass
    return []