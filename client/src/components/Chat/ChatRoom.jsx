import React from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
} from "lucide-react";
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // TODO: Uncomment when integrating with React Router
  // import { useNavigate, useLocation } from 'react-router-dom';
  const navigate = useNavigate();
  // const location = useLocation();
  // const patient = location.state?.patient;

  // Mock patient data for demo
  const patient = {
    patientId: "P001",
    patientName: "Sarah Anderson",
    avatar: "SA",
    message:
      "I have been experiencing severe headaches for the past 3 days, especially in the morning.",
    time: "2 min ago",
  };

  // Initialize messages - Optimization: Only run once
  React.useEffect(() => {
    if (patient && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: "patient",
          text: patient.message,
          time: patient.time,
          timestamp: new Date().getTime(),
        },
      ]);
    }
  }, [patient]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(), // Better unique ID
      sender: "doctor",
      text: message,
      time: "Just now",
      timestamp: new Date().getTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  }, [message]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleBack = useCallback(() => {
    // TODO: React Router DOM Navigation - Uncomment in your project:
    navigate("/patients/notifications", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Go back to notifications"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>

              <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {patient?.avatar}
                </span>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {patient?.patientName}
                </h2>
                <p className="text-xs text-gray-500">
                  Patient ID: {patient?.patientId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Voice call"
                aria-label="Start voice call"
              >
                <Phone size={20} className="text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Video call"
                aria-label="Start video call"
              >
                <Video size={20} className="text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="More options"
                aria-label="More options"
              >
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    msg.sender === "doctor"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white shadow-sm text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "doctor"
                        ? "text-indigo-200"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Attach file"
              aria-label="Attach file"
            >
              <Paperclip size={20} className="text-gray-600" />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              aria-label="Message input"
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
