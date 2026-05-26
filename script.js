const API_KEY = "AlzaSyDGqsXRdj1RS5sutsq86rvPDksYwhJRI6w";

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, isUser) {
  const msg = document.createElement("div");
  msg.className = isUser ? "user-message" : "ai-message";
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
  loading.className = "ai-message";
  loading.textContent = "NovaCore AI is thinking...";
  chatMessages.appendChild(loading);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    chatMessages.removeChild(loading);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";
    addMessage(reply, false);

  } catch (error) {
    chatMessages.removeChild(loading);
    addMessage("Error: Check API key or internet connection.", false);
    console.error(error);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Welcome
window.onload = () => {
  addMessage("Hello! I am NovaCore AI. Ask me anything!", false);
};
