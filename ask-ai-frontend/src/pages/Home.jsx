import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Footer from "../components/Footer";

function Home() {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch past chats on load
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await axios.get("http://localhost:3003/chats");
        const formatted = res.data
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map(c => ({ sender: "user", text: c.user_message }))
          .flatMap((m, i) => [m, { sender: "bot", text: res.data[i].bot_response }]);
        setChat(formatted);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };
    loadChats();
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setChat(prev => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    try {
      const resAI = await axios.post("http://localhost:3003/api/generate", {
        prompt: message
      });

      const botReply = resAI.data.response.trim();

      setChat(prev => [...prev, { sender: "bot", text: botReply }]);

      // Save to chats table using correct column names
      await axios.post("http://localhost:3003/chats", {
        user_message: message,
        bot_response: botReply
      });
    } catch (err) {
      console.error(err);
      setChat(prev => [...prev, { sender: "bot", text: "❌ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar chatHistory={chat} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatArea chat={chat} />
          <ChatInput onSend={handleSendMessage} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
