import React, { useEffect, useRef, useState } from "react";

/* ---------------------------
  Helper: voice input hook
---------------------------- */
const useVoiceInput = (appendText) => {
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice input not supported on this browser.");
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;

    recognitionRef.current.onresult = (e) => {
      const text = e.results[0][0].transcript;
      appendText((prev) => (prev ? prev + " " + text : text));
    };

    recognitionRef.current.onerror = () => {
      /* ignore */
    };

    recognitionRef.current.start();
  };

  const stopListening = () => recognitionRef.current?.stop?.();

  return { startListening, stopListening };
};

/* ---------------------------
  Helper: text-to-speech
---------------------------- */
const speakText = (text) => {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
};

/* ---------------------------
  Animated AI Avatar
---------------------------- */
const AIAvatar = ({ size = 56 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full flex items-center justify-center relative"
    >
      {/* glowing ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 30px rgba(34,197,94,0.35), inset 0 0 12px rgba(34,197,94,0.15)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(6,95,70,0.12))",
          animation: "avatarPulse 2.6s ease-in-out infinite",
        }}
      />
      {/* orb */}
      <div
        className="rounded-full flex items-center justify-center text-xl font-bold text-white"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background: "linear-gradient(135deg,#34D399,#059669)",
          transform: "translateZ(0)",
        }}
      >
        🤖
      </div>

      <style>{`
        @keyframes avatarPulse {
          0% { transform: scale(0.98) translateZ(0); box-shadow: 0 0 12px rgba(34,197,94,0.2) }
          50% { transform: scale(1.04) translateZ(0); box-shadow: 0 0 36px rgba(34,197,94,0.45) }
          100% { transform: scale(0.98) translateZ(0); box-shadow: 0 0 12px rgba(34,197,94,0.2) }
        }
      `}</style>
    </div>
  );
};

/* ---------------------------
  3D Earth + Glowing Leaf Loader
---------------------------- */
const Loader3DEarth = ({ size = 80 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div style={{ width: size, height: size }} className="relative">
        {/* glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            filter: "blur(18px)",
            background:
              "radial-gradient(circle at 30% 20%, rgba(110,231,183,0.25), rgba(6,95,70,0.08))",
          }}
        />
        {/* rotating earth (SVG globe simplified) */}
        <svg
          viewBox="0 0 64 64"
          style={{
            width: size,
            height: size,
            transformOrigin: "center",
            animation: "earthRotate 14s linear infinite",
          }}
        >
          <defs>
            <linearGradient id="gLeaf" x1="0" x2="1">
              <stop offset="0" stopColor="#7AF5C5" />
              <stop offset="1" stopColor="#07966A" />
            </linearGradient>
          </defs>

          <circle cx="32" cy="32" r="30" fill="url(#gLeaf)" />
          {/* land shapes (stylized) */}
          <path d="M20 24c6-6 18-6 24 0c-4 6-14 6-20 14c-3-6-4-8-4-14z" fill="#043E2F" opacity="0.9"/>
          <circle cx="46" cy="18" r="2.5" fill="#044635" opacity="0.9" />
        </svg>

        {/* floating leaf */}
        <div
          style={{
            position: "absolute",
            bottom: -8,
            right: -8,
            transformOrigin: "center",
            animation: "leafFloat 3.6s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 24 24" width="34" height="34">
            <path d="M12 2C18 8 20 12 12 22C8 18 3 12 12 2z" fill="#A8F5C7" />
            <path d="M12 2C18 8 20 12 12 22" stroke="#045f43" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes earthRotate {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
        @keyframes leafFloat {
          0% { transform: translateY(0) rotate(-6deg) }
          50% { transform: translateY(-6px) rotate(6deg) }
          100% { transform: translateY(0) rotate(-6deg) }
        }
      `}</style>
    </div>
  );
};

/* ---------------------------
  Main Home component (combined)
---------------------------- */
export default function Home() {
  const STORAGE_KEY = "eco_chat_history_v1";
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [
        {
          sender: "bot",
          text: "Hello! I'm your Smart Eco Advisor 🌍✨ Ask me about energy, waste, or eco tips.",
          time: Date.now(),
        },
      ];
    } catch {
      return [
        {
          sender: "bot",
          text: "Hello! I'm your Smart Eco Advisor 🌍✨ Ask me about energy, waste, or eco tips.",
          time: Date.now(),
        },
      ];
    }
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // typing animation
  const [isWaiting, setIsWaiting] = useState(false); // loader state
  const [dashboardSuggestions, setDashboardSuggestions] = useState(null);

  // persist messages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      // ignore storage errors
    }
  }, [messages]);

  // voice input hook
  const { startListening } = useVoiceInput(setInput);

  // helper: append a message
  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, { ...msg, time: Date.now() }]);
  };

  // simple heuristic to produce energy suggestions from messages
  const computeEnergySuggestions = (allMessages) => {
    // crude heuristic: look for keywords and produce sample suggestions
    const text = allMessages.map((m) => m.text).join(" ").toLowerCase();
    const suggestions = [];

    if (text.includes("electric") || text.includes("ac") || text.includes("air conditioner")) {
      suggestions.push({
        title: "AC Optimization",
        detail: "Raise thermostat by 2°C, use fan assistance, and service AC annually.",
        estimate: "Save ~10–15% energy",
      });
    }
    if (text.includes("light") || text.includes("bulb")) {
      suggestions.push({
        title: "Lighting",
        detail: "Replace incandescent bulbs with LEDs and use motion sensors in low-use areas.",
        estimate: "Save ~5–10% energy",
      });
    }
    if (text.includes("vehicle") || text.includes("car") || text.includes("commute")) {
      suggestions.push({
        title: "Transport",
        detail: "Shift to carpooling, public transport, or EV charging during off-peak hours.",
        estimate: "Save fuel & emissions",
      });
    }
    if (!suggestions.length) {
      suggestions.push({
        title: "General Home Efficiency",
        detail: "Insulate windows, unplug idle devices, and run full-load laundry cycles.",
        estimate: "Save ~5–12% energy",
      });
    }
    return suggestions;
  };

  // send message -> call OpenAI API (via backend endpoint)
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    appendMessage({ sender: "user", text: userText });
    setInput("");
    setIsWaiting(true);
    setIsTyping(true);

    // Show loader first (3D earth)
    // Make request to your backend route which calls OpenAI securely.
    // Example: POST /api/openai { messages: [...] }
    // Backend should read OPENAI_API_KEY from env and forward to OpenAI.
    try {
      const payload = {
        // you can build a conversation array to send to the model
        messages: [
          ...messages.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
          { role: "user", content: userText },
        ],
      };

      // Replace '/api/openai' with your server endpoint that proxies to OpenAI
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // fallback fake response
        throw new Error("API request failed");
      }

      const data = await res.json();

      // expected: { reply: "text from model" } or adapt to your backend response shape
      const botReply = data.reply || "Sorry, I couldn't generate a response right now.";

      // small delay to show typing animation naturally
      await new Promise((r) => setTimeout(r, 700));
      appendMessage({ sender: "bot", text: botReply });
      speakText(botReply);

      // compute and set dashboard suggestions based on new conversation
      const newSuggestions = computeEnergySuggestions([...messages, { sender: "user", text: userText }, { sender: "bot", text: botReply }]);
      setDashboardSuggestions(newSuggestions);
    } catch (err) {
      // fallback / offline reply
      const fallback = "Thanks — here's a quick tip: switch to LED bulbs and unplug chargers when not in use.";
      appendMessage({ sender: "bot", text: fallback });
      speakText(fallback);

      const newSuggestions = computeEnergySuggestions([...messages, { sender: "user", text: userText }, { sender: "bot", text: fallback }]);
      setDashboardSuggestions(newSuggestions);
    } finally {
      setIsTyping(false);
      setIsWaiting(false);
    }
  };

  // quick handler: send on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-start px-6 py-20 bg-gradient-to-b from-green-100 to-white dark:from-black dark:to-gray-900 transition-all duration-300"
    >
      {/* HERO */}
      <h1 className="text-5xl font-extrabold text-center mb-4 dark:text-white">
        Your AI-Powered <span className="text-green-600 dark:text-green-400">Eco Advisor</span> 🌿
      </h1>
      <p className="text-lg max-w-2xl text-center text-gray-600 dark:text-gray-300 mb-8">
        Chat with an intelligent sustainability assistant that helps you track carbon, reduce waste,
        and build a greener lifestyle effortlessly.
      </p>

      {/* ACTIONS */}
      <div className="flex gap-4 items-center mb-8">
        <button
          onClick={() => setOpenChat(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 shadow-lg transform transition"
        >
          Launch Eco AI Chatbot
        </button>

        <button
          onClick={() => {
            // quick sample: prefill input with a suggestion
            setInput("How can I reduce my monthly electricity bill?");
            setOpenChat(true);
          }}
          className="bg-white border border-green-200 px-4 py-2 rounded-xl shadow hover:shadow-md"
        >
          Try a sample question
        </button>
      </div>

      {/* MINI CHAT PREVIEW CARD (on page) */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-6 border border-green-200 dark:border-gray-700 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">
            🌱
          </div>
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Eco Chatbot</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Tap "Launch" to open the full-screen chatbot with voice & dashboard features.</p>
          </div>
        </div>

        <div className="h-48 overflow-y-auto bg-green-50 dark:bg-black/40 p-4 rounded-2xl border border-green-200 dark:border-gray-700">
          {/* show last 3 messages as preview */}
          {messages.slice(-3).map((m, i) => (
            <div key={i} className={`mb-2 max-w-[85%] px-3 py-2 rounded-xl ${m.sender === "user" ? "ml-auto bg-green-600 text-white" : "bg-white dark:bg-gray-700 dark:text-gray-200"}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your eco question..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border dark:border-gray-600 outline-none"
          />
          <button onClick={sendMessage} className="px-5 py-3 bg-green-600 text-white rounded-xl">Send</button>
        </div>
      </div>

      {/* Energy suggestions (summary) */}
      {dashboardSuggestions && (
        <div className="w-full max-w-3xl mb-8">
          <h3 className="text-2xl font-semibold mb-3 dark:text-white">Energy Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardSuggestions.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
                <h4 className="font-semibold text-green-600 mb-1">{s.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{s.detail}</p>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-200">{s.estimate}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => window.location.href = "/dashboard"} className="px-4 py-2 bg-green-600 text-white rounded-xl">View Dashboard</button>
            <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(dashboardSuggestions)); }} className="px-4 py-2 border rounded-xl">Export</button>
          </div>
        </div>
      )}

      {/* FULLSCREEN CHAT MODAL (ChatGPT-style) */}
      {openChat && (
        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full md:w-[900px] h-[92vh] md:h-[88vh] bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-black rounded-t-3xl md:rounded-3xl shadow-2xl border border-green-200 dark:border-gray-700 flex flex-col overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-500 text-white">
              <div className="flex items-center gap-3">
                <AIAvatar size={44} />
                <div>
                  <div className="font-bold">Eco AI Assistant</div>
                  <div className="text-xs opacity-90">Sustainability guidance & energy insights</div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button onClick={() => {
                  // export chat history
                  const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "eco_chat_history.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }} className="px-3 py-1 rounded-md bg-white/20">Export</button>

                <button onClick={() => setOpenChat(false)} className="px-3 py-1 rounded-md bg-white/20">Close ✖</button>
              </div>
            </div>

            {/* main: messages + dashboard side */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Chat area */}
              <div className="col-span-2 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-transparent">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-4 py-3 rounded-xl shadow ${m.sender === "user" ? "bg-green-600 text-white" : "bg-white dark:bg-gray-800 dark:text-gray-200"}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {/* typing animation */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow flex items-center gap-2">
                        <div className="w-8 h-8"><AIAvatar size={28} /></div>
                        <div className="flex items-center">
                          <div className="typing-dots flex items-center gap-1">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* waiting loader overlay */}
                  {isWaiting && (
                    <div className="w-full flex justify-center py-4">
                      <Loader3DEarth size={72} />
                    </div>
                  )}
                </div>

                {/* input */}
                <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-3">
                  <button onClick={() => startListening()} className="p-3 rounded-xl bg-green-600 text-white">🎤</button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your question, or press microphone..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none"
                  />
                  <button onClick={sendMessage} className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl">Send</button>
                </div>
              </div>

              {/* Dashboard / suggestions panel */}
              <aside className="col-span-1 border-l dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
                <h4 className="font-bold text-lg text-green-600 mb-3">Energy Dashboard Suggestions</h4>
                {dashboardSuggestions ? (
                  <div className="space-y-3">
                    {dashboardSuggestions.map((s, i) => (
                      <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                        <div className="font-semibold text-sm">{s.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{s.detail}</div>
                        <div className="text-xs mt-2 font-medium">{s.estimate}</div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <button onClick={() => window.location.href = "/dashboard"} className="w-full px-3 py-2 rounded-xl bg-green-600 text-white">Open Full Dashboard</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 dark:text-gray-300">Ask a question to get personalized suggestions.</div>
                )}

                <div className="mt-6">
                  <h5 className="font-semibold">Quick Metrics (sample)</h5>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                    Estimated monthly consumption: <strong>420 kWh</strong><br/>
                    Suggested monthly saving: <strong>~10%</strong><br/>
                    Carbon reduction: <strong>~120 kg CO₂</strong>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {/* small footer note */}
      

      {/* styles for typing dots */}
      <style>{`
        .typing-dots .dot {
          width: 7px;
          height: 7px;
          background: #9AE6B4;
          border-radius: 9999px;
          display: inline-block;
          opacity: 0.9;
          transform: translateY(0);
          animation: typingJump 1s infinite;
        }
        .typing-dots .dot:nth-child(2) { animation-delay: 0.12s; }
        .typing-dots .dot:nth-child(3) { animation-delay: 0.24s; }
        @keyframes typingJump {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
