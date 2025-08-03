document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeBtn = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatBotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotIcon = document.getElementById("chatbot-icon");

  chatbotIcon.addEventListener("click", () => {
    chatbotContainer.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

  sendBtn.addEventListener("click", sendMessage);
  chatBotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});

function sendMessage() {
  const inputEl = document.getElementById("chatbot-input");
  const userMessage = inputEl.value.trim();
  if (userMessage) {
    appendMessage("user", userMessage);
    inputEl.value = "";
    getBotResponse(userMessage);
  }
}

function appendMessage(sender, message) {
  const messageContainer = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

async function getBotResponse(userMessage) {
  const API_KEY = "AIzaSyAtbNRDp_zJsDohfLv0d-es2713vZCpukI"; // Replace with your real key
   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const instruction = `You are EduBot, an AI assistant for Edu Navia. 
Only answer questions strictly related to Edu Navia’s features, such as: 
- Universities
- Courses
- About Us
- Consulting
- Resources
- University Comparison
- Advanced University Search
- Exam Tracker
- Exam Info

If the user asks anything beyond these features (such as personal questions, general knowledge, current events, unrelated academic questions, etc.), reply with:

"I'm here to assist only with Edu Navia-related queries. Please ask about our universities, courses, tools, or services."
"I'm here to help only with Edu Navia-related queries."`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${instruction}\n\nUser: ${userMessage}` }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.candidates || !data.candidates.length) {
      throw new Error("No response from Gemini API");
    }

    const botMessage = data.candidates[0].content.parts[0].text;
    appendMessage("bot", botMessage);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "Sorry, I'm having trouble responding. Please try again.");
  }
}
appendMessage("bot", "...");
const typingElement = document.querySelector(".message.bot:last-child");
typingElement.classList.add("typing");

// After fetch success:
typingElement.remove();
appendMessage("bot", botMessage);
