from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import roadmap, resources
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Rabbit Hole Mapper API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap.router, prefix="/api")
app.include_router(resources.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Rabbit Hole Mapper API is running"}