const API_KEY = "AlzaSyDGqsXRdj1RS5sutsq86rvPDksYwhJRI6w";

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chatbot-window");
const chatToggle = document.getElementById("chat-toggle");
const chatClose = document.getElementById("chat-close");

function addMessage(text, isUser) {
  if (!chatMessages) return;
  const msg = document.createElement("div");
  msg.className = `message ${isUser ? "user-message" : "ai-message"}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  userInput.value = "";

  const loading = document.createElement("div");
  loading.className = "message ai-message";
  loading.textContent = "NovaCore AI is thinking...";
  chatMessages.appendChild(loading);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    chatMessages.removeChild(loading);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't respond.";
    addMessage(reply, false);
  } catch (error) {
    chatMessages.removeChild(loading);
    addMessage("Error connecting to Gemini.", false);
    console.error(error);
  }
}

// Toggle Chat Window
if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    if (chatWindow) {
      chatWindow.style.display = (chatWindow.style.display === "block") ? "none" : "block";
    }
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    if (chatWindow) chatWindow.style.display = "none";
  });
}

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (userInput) userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Welcome Message
window.onload = () => {
  if (chatMessages) {
    addMessage("Hello! I'm NovaCore AI (Gemini). How can I help you?", false);
  }
};
