import { sendChatMessage } from "../services/api";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, X, Bot } from "lucide-react";

export default function ChatPanel({ topic, selectedNode, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm your learning assistant for **${topic}**. Ask me anything about this roadmap or any concept in it!`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When a node is selected, suggest asking about it
  useEffect(() => {
    if (!selectedNode) return;
    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: `You selected **${selectedNode.data.title}**. Want me to explain it, give examples, or quiz you on it?`
      }
    ]);
  }, [selectedNode?.id]);

async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(
        topic,
        selectedNode?.data?.title || null,
        [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      );
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[500px] z-50 flex flex-col rounded-2xl overflow-hidden"
      style={{ background: "#080d1a", border: "1px solid #1e293b", boxShadow: "0 0 40px #6366f130" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-indigo-400" />
          <span className="text-sm font-semibold text-white">AI Assistant</span>
          {selectedNode && (
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {selectedNode.data.title}
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {m.content.split("**").map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-3 py-2 rounded-xl">
              <Loader2 size={14} className="animate-spin text-slate-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors"
        >
          <Send size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
}