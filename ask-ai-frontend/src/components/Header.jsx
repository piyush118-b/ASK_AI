import React, { useState, useRef, useEffect } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: "Piyush Bagdi",
    email: "piyush@example.com"
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-zinc-800 text-white px-6 py-4 shadow-md">
      <div className="flex items-center space-x-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest animate-pulse">
        <span className="text-3xl">ASK</span>
        <span className="text-3xl">AI</span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
        >
          {initials}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-zinc-900 text-white rounded-lg shadow-lg p-4 z-50 border border-zinc-700">
            <p className="text-sm mb-2 text-gray-400">Signed in as</p>
            <p className="font-semibold text-white break-words mb-4">{user.email}</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
