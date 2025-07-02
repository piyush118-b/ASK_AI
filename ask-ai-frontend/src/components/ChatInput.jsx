import React, { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-zinc-800 border-t border-zinc-700 p-4 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={loading ? "Please wait..." : "Type your message..."}
        disabled={loading}
        className="flex-1 bg-zinc-700 border-none rounded-l px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-cyan-600 text-white px-4 py-2 rounded-r hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
