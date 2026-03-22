import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { doctors } from "../data/doctors";

const REPLIES = [
  "I understand. Can you describe the symptoms in more detail?",
  "How long have you been experiencing this?",
  "Have you taken any medication recently?",
  "That's helpful. Let me note that down.",
  "I'd recommend an in-person visit for proper diagnosis.",
  "Please stay hydrated and get adequate rest.",
  "Is the discomfort constant or does it come and go?",
  "On a scale of 1–10, how would you rate the pain?",
];

const fmt = (d) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, user } = useApp();

  const doctor = doctors.find((d) => d.id === Number(id));

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "doctor",
      text: "Hello! I'm here to help. How are you feeling today?",
      time: new Date(Date.now() - 60000),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();
  const patientInitial = (profile?.fullName ||
    user?.name ||
    "P")[0].toUpperCase();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Doctor not found.</p>
      </div>
    );
  }

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((p) => [
      ...p,
      { id: Date.now(), from: "patient", text, time: new Date() },
    ]);
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((p) => [
          ...p,
          {
            id: Date.now() + 1,
            from: "doctor",
            text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
            time: new Date(),
          },
        ]);
      },
      1200 + Math.random() * 800,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-sky-100 flex-shrink-0">
            <img
              src={doctor.photo}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=e0f2fe&color=0284c7&rounded=true`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-sm truncate">
              {doctor.name}
            </h3>
            <p className="text-sky-500 text-xs">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full space-y-4">
        <div className="flex justify-center">
          <span className="text-xs text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-slate-100 shadow-sm">
            Today
          </span>
        </div>

        {messages.map((msg) => {
          const isPatient = msg.from === "patient";
          return (
            <div
              key={msg.id}
              className={`flex ${isPatient ? "justify-end" : "justify-start"} items-end gap-2`}
            >
              {!isPatient && (
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-sky-100 flex-shrink-0">
                  <img
                    src={doctor.photo}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=D&background=e0f2fe&color=0284c7&rounded=true&size=32`;
                    }}
                  />
                </div>
              )}
              <div
                className={`max-w-xs flex flex-col gap-1 ${isPatient ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    isPatient
                      ? "bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-br-sm shadow-md shadow-sky-200"
                      : "bg-white text-slate-800 rounded-bl-sm shadow-sm border border-slate-100"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-slate-400 px-1">
                  {fmt(msg.time)}
                </span>
              </div>
              {isPatient && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  {patientInitial}
                </div>
              )}
            </div>
          );
        })}

        {typing && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-sky-100 flex-shrink-0">
              <img
                src={doctor.photo}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=D&background=e0f2fe&color=0284c7&rounded=true&size=32`;
                }}
              />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-slate-100">
              <div className="flex gap-1 items-center h-4">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-slate-100 p-4 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Describe your symptoms..."
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </div>
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-cyan-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              style={{ transform: "rotate(-45deg) translate(1px,-1px)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
