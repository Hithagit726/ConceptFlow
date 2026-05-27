import os
import sys
import uvicorn

# Force flush output
print("=== STARTING APP ===", flush=True)
print("GEMINI KEY:", bool(os.environ.get("GEMINI_API_KEY")), flush=True)
sys.stdout.flush()

port = int(os.environ.get("PORT", 8080))
uvicorn.run("main:app", host="0.0.0.0", port=port)