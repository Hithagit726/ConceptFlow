# ConceptFlow 🧠

An AI-powered visual learning roadmap generator that helps you explore any topic interactively. Enter any topic and get an interactive knowledge graph with resources, progress tracking, and an AI chat assistant.



## 🌐 Live Demo
[conceptflow.vercel.app](https://concept-flow-34bs27lof-hitha-s-projects2.vercel.app/)

## ✨ Features

- 🗺️ **Interactive Knowledge Graph** — zoom, pan, drag nodes freely
- 🤖 **AI Roadmap Generation** — powered by Google Gemini generates structured learning paths 
- 📚 **Real Resources** — click any node to see Wikipedia summaries and YouTube videos
- ✅ **Progress Tracking** — mark concepts as complete with a live progress bar
- 💬 **AI Chat Assistant** — ask questions about any concept in the roadmap
- 🔐 **User Authentication** — sign in/ sign up with Clerk
- 🎨 **Dark UI** — glassmorphism aesthetic

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- TailwindCSS
- React Flow
- Clerk Auth

**Backend:**
- FastAPI (Python)
- Google Gemini API
- Wikipedia REST API
- YouTube Data API v3

**Deployment:**
- Frontend → Vercel
- Backend → Railway

## 📁 Project Structure
conceptflow/
├── backend/
│   ├── routers/
│   │   ├── roadmap.py
│   │   └── resources.py
│   ├── services/
│   │   ├── ai_service.py
│   │   ├── wikipedia_service.py
│   │   └── youtube_service.py
│   ├── models/
│   │   └── schemas.py
│   └── main.py
└── frontend/
└── src/
├── components/
│   ├── Graph.jsx
│   ├── CustomNode.jsx
│   ├── NodePanel.jsx
│   └── ChatPanel.jsx
├── services/
│   └── api.js
└── App.jsx

## 👤 Author
Built by [Hitha](https://github.com/Hithagit726)