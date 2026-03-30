from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import pywhatkit as kit

# ----------------------------
# Load Environment Variables
# ----------------------------
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env")

# ----------------------------
# Flask Setup
# ----------------------------
app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",   # VS Code Live Server
    "https://yourdomain.com"
])

# ----------------------------
# Health Check
# ----------------------------
@app.route("/")
def home():
    return jsonify({"status": "Backend running ✅"})


# ----------------------------
# Webinar Registration
# ----------------------------
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        name = data.get("name")
        phone = data.get("phone")
        webinar = data.get("webinar")

        if not name or not phone or not webinar:
            return jsonify({
                "success": False,
                "error": "Missing required fields"
            }), 400

        message = (
            f"Hi {name}, your Edu Navia webinar "
            f"registration for '{webinar}' is confirmed! 🎓"
        )

        kit.sendwhatmsg_instantly(
            phone_no=phone,
            message=message,
            wait_time=10,
            tab_close=True
        )

        return jsonify({
            "success": True,
            "message": "WhatsApp message sent!"
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ----------------------------
# Gemini AI Route (SECURE)
# ----------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message")

        if not user_message:
            return jsonify({"error": "Message required"}), 400

        GEMINI_URL = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            "gemini-2.0-flash:generateContent"
        )

        instruction = """
You are EduBot, AI assistant for Edu Navia.

Only answer questions related to:
- Universities
- Courses
- Consulting
- Resources
- University Comparison
- Exam Tracker
- Exam Info

If unrelated, reply:
"I'm here to assist only with Edu Navia-related queries."
"""

        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {"text": f"{instruction}\n\nUser: {user_message}"}
                    ],
                }
            ]
        }

        response = requests.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=15
        )

        result = response.json()

        bot_reply = result["candidates"][0]["content"]["parts"][0]["text"]

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------
# Run Server
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True)