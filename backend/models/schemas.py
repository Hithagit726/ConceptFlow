from pydantic import BaseModel
from typing import List, Optional

class Node(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str
    estimated_time: str
    prerequisites: List[str]
    related_concepts: List[str]

class Edge(BaseModel):
    source: str
    target: str

class Roadmap(BaseModel):
    topic: str
    nodes: List[Node]
    edges: List[Edge]

class RoadmapRequest(BaseModel):
    topic: str

class ResourceRequest(BaseModel):
    concept: str