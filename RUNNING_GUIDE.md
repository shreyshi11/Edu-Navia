# 🚀 Edu Navia - Simplified Roadmap

Edu Navia now uses a **Unified Backend Architecture**. You only need to run ONE command to launch the entire platform (Frontend + AI Model + Chatbot + WhatsApp Backend).

---

## 🟢 Option 1: Quick Local Development
Use this when you are making changes to the UI and want to see updates instantly.

1.  **Terminal 1 (Backend - Unified API):**
    ```powershell
    cd "D:\Edu Navia\backend"
    python main.py
    ```
    *Powers the AI Recommendations, Chatbot, and WhatsApp registration.*

2.  **Terminal 2 (Frontend - Live Dev Mode):**
    ```powershell
    cd "D:\Edu Navia"
    npm run dev
    ```
    *Open the URL provided (default: http://localhost:3000).*

---

## 💎 Option 2: Production-Style Launch (Single Command)
This is the simplest way to run the entire app. It bundles the frontend and serves everything via Python.

1.  **Build the Frontend (Only needed once):**
    ```powershell
    npm run build
    ```
    *This creates a optimized `dist` folder.*

2.  **Launch the Unified Server:**
    ```powershell
    cd "D:\Edu Navia\backend"
    python main.py
    ```
    *Visit http://localhost:8000. Your entire platform is now running from a single terminal!*

---

## 🔐 Environment Setup
Ensure your [.env](file:///d:/Edu%20Navia/.env) file is configured in the root with these keys:
- `VITE_FIREBASE_API_KEY` (and other Firebase keys)
- `GEMINI_API_KEY` (for the AI Chatbot)
- `VITE_API_URL=http://localhost:8000`

---

### 🛑 Status Checklist
- [x] **Unified API:** Running on Port 8000.
- [x] **Static Assets:** Build complete and served from `/dist`.
- [x] **Models:** Loaded from `backend/models`.
- [x] **Chatbot:** Active via `os.dotenv` integration in `main.py`.

*No more separate `app.py` or Docker required! Just pure, fast execution.*
