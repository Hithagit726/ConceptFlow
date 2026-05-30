# ConceptFlow 🧠

An AI-powered visual learning roadmap generator that helps you explore any topic interactively. Enter any topic and get an interactive knowledge graph with resources, progress tracking, and an AI chat assistant.



## 🌐 Live Demo
[conceptflow.vercel.app](https://concept-flow-34bs27lof-hitha-s-projects2.vercel.app/)

## 📸 Screenshots

### Home Screen
<img width="1919" height="890" alt="Screenshot 2026-05-30 120934" src="https://github.com/user-attachments/assets/db77e50d-e4ca-44de-a327-63d6b8791bde" />


### Roadmap Graph
<img width="1914" height="904" alt="Screenshot 2026-05-30 120917" src="https://github.com/user-attachments/assets/a3d06d5c-2456-4296-83f6-5ab4a03a27c8" />


### Node Details Panel and Progress Tracking
<img width="1911" height="890" alt="Screenshot 2026-05-30 124634" src="https://github.com/user-attachments/assets/1548dc89-5e19-4374-906b-a3cbe2b2065b" />
<img width="503" height="865" alt="Screenshot 2026-05-30 124651" src="https://github.com/user-attachments/assets/eb4a7c44-d7c0-4b63-8ee5-787382c3ac7c" />


### AI Chat
<img width="1917" height="905" alt="Screenshot 2026-05-30 123127" src="https://github.com/user-attachments/assets/89ee2df9-cf64-42f6-8476-18716b6efb8f" />


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

## 🏗️ Architecture

<img width="1440" height="1040" alt="image" src="https://github.com/user-attachments/assets/aafa8020-0ff5-4244-aba5-acfb24c4fea7" />

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
