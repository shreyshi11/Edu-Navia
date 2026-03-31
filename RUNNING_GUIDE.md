# 🚀 Edu Navia - Complete Execution Roadmap

Because Edu Navia is a modern, modular application, it utilizes a decoupled architecture where the **Frontend UI** and the **AI Backend** operate on separate engines.

Here is the exact, step-by-step process you must follow to get the entire platform completely operational from a cold start.

---

## 🟢 Step 1: Start the Primary AI Engine (Backend)
This runs the FastAPI server that loads your `.pkl` Machine Learning models into memory. It powers the Course Recommendations, the AI Predictor tools, and the University Wishlist AI.

1. Open a terminal in VS Code or PowerShell.
2. Navigate into your backend folder:
   ```powershell
   cd "D:\Edu Navia\backend"
   ```
3. Run the Python start script:
   ```powershell
   python main.py
   ```
   *(Wait until you see the message: `✅ Models successfully loaded! Fast AI Recommendations are ON.`)*

---

## 🟢 Step 2: Start the Frontend UI (Vite Server)
This runs the Vite Development Server, securely handles your Firebase Environment Variables (`import.meta.env`), and automatically proxies any AI requests to the Python Backend you started in Step 1.

1. Open a **brand new terminal window** (keep Step 1 running in the background).
2. Ensure you are in the root directory:
   ```powershell
   cd "D:\Edu Navia"
   ```
3. Start the node server:
   ```powershell
   npm run dev
   ```
4. **Important:** After it starts, open the URL it provides (usually `http://localhost:3000`) in your browser to interact with the site. *Do not try to load the site from port 8000.*

---

## 🟡 Optional Add-ons (Run only if needed)
If you wish to test your extra features, you can launch them in completely separate terminals.

### 1. The WhatsApp Webinar Registration Bot
This runs your Flask server which uses `pywhatkit` to send automated WhatsApp confirmations to users who register for webinars.
*   **Command:** 
    ```powershell
    cd "D:\Edu Navia"
    python app.py
    ```
*   *(This runs safely on port 5000)*

### 2. The Legacy / Alternate AI Engine
If you have older HTML testing files configured to fetch AI insights from `ai2.py` rather than `main.py`.
*   **Command:** 
    ```powershell
    cd "D:\Edu Navia"
    uvicorn ai2:app --reload --port 8001
    ```
*   *(This safely runs on port 8001 so it avoids crashing `main.py`!)*

---

### 🛑 Troubleshooting Guide
*   **Error: `only one usage of each socket address`**
    *   *Cause:* You tried to start a python script (`main.py` or `ai2.py`) on a port that is already in use by another terminal.
    *   *Fix:* Close all your terminals and start fresh from Step 1.
*   **Error: The AI recommendation sidebar doesn't show up**
    *   *Cause:* Your frontend and backend aren't talking properly.
    *   *Fix:* Make sure `python main.py` is actively running, and ensure your `vite.config.js` has the proxy properly configured routing to `http://127.0.0.1:8000`.
