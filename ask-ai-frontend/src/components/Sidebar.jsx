import React, { useState } from "react";
import { FaBars, FaComments } from "react-icons/fa";

export default function Sidebar({ chatHistory }) {
  const [collapsed, setCollapsed] = useState(false);

  const prompts = chatHistory.filter((_, i) => i % 2 === 0);

  return (
    <div className={`bg-zinc-800 ${collapsed ? "w-16" : "w-64"} transition-all duration-300 p-4 overflow-y-auto text-white shadow-lg`}>
      <button
        className="mb-4 text-sm text-gray-400 hover:text-white flex items-center gap-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </button>
      {!collapsed && (
        <ul className="space-y-2">
          {prompts.map((msg, idx) => (
            <li key={idx} className="hover:bg-zinc-700 p-3 rounded flex items-center gap-2">
              <FaComments />
              {msg.text.slice(0, 30) + (msg.text.length > 30 ? "…" : "")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
