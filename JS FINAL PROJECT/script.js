// 👇 API key yahan paste karein
const API_KEY = "AIzaSyBVqGpqUNxtTEpsyfors9mQOVqRQLdgXe8";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ✅ DOM elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// ✅ User message show karne ka function
function addUserMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message user-message";
  msgDiv.innerHTML = `
        <div>${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ✅ Bot message show karne ka function
function addBotMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message bot-message";
  msgDiv.innerHTML = `
        <div>${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  speakMessage(message); // 🔊 Bot ka jawab sunana
}

// ✅ Typing indicator show/hide
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "message bot-message typing-indicator";
  typing.id = "typing";
  typing.innerHTML = `
        <span>Typing</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// ✅ Gemini API call karne ka function
async function sendMessage() {
  const userMessage = chatInput.value.trim();

  if (userMessage === "") return;

  addUserMessage(userMessage);
  chatInput.value = "";
  showTyping();

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await response.json();
    hideTyping();

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Kuch masla hua, dobara try karein.";
    addBotMessage(botReply);
  } catch (error) {
    hideTyping();
    addBotMessage("❌ Error aagaya. Internet ya API key check karein.");
    console.error("Error:", error);
  }
}

// ✅ Enter ya Send button pe message bhejna
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// 🧠 Voice Input Setup (SpeechRecognition)
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false; // ✅ Ek message par rok do
  recognition.lang = "en-US"; // ✅ Aap chahein to "ur-PK" bhi kar sakte hain
  recognition.interimResults = false;

  // ✅ Voice start hone par button active dikhao
  recognition.onstart = () => {
    voiceBtn.classList.add("listening");
  };

  // ✅ Voice band hone par button normal karo
  recognition.onend = () => {
    voiceBtn.classList.remove("listening");
  };

  // ✅ Jab voice se message mil jaye
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    sendMessage();
  };
}

// ✅ Voice button par click se mic start karo
voiceBtn.addEventListener("click", () => {
  if (recognition) {
    recognition.start();
  } else {
    alert("❌ Voice recognition supported nahi hai is browser mein.");
  }
});

// 🔊 Voice Output (SpeechSynthesis)
function speakMessage(message) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "ur-pk"; // ✅ Aap chahein to "ur-PK" bhi kar sakte hain

    speechSynthesis.speak(utterance);
  }
}
