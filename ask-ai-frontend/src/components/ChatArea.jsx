import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatArea({ chat }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-zinc-900 text-white">
      {chat.map((msg, idx) => (
        <div key={idx} className="mb-4">
          <div className={`font-semibold ${msg.sender === "user" ? "text-blue-400" : "text-green-400"}`}>
            {msg.sender === "user" ? "You:" : "ASK AI:"}
          </div>
          <div className="text-gray-300">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
