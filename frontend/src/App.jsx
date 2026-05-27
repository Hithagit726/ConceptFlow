import { useState } from "react";
import { Search, Loader2, GitBranch, Bot } from "lucide-react";
import { generateRoadmap } from "./services/api";
import Graph from "./components/Graph";
import NodePanel from "./components/NodePanel";
import ChatPanel from "./components/ChatPanel";

const EXAMPLES = ["Machine Learning", "Web Development", "Cybersecurity", "Operating Systems", "Blockchain"];

export default function App() {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  async function handleGenerate(t) {
    const query = t || topic;
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setRoadmap(null);
    setSelectedNode(null);
    try {
      const data = await generateRoadmap(query);
      setRoadmap(data);
    } catch (e) {
      setError("Failed to generate roadmap. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: "#050810" }}>

      {/* Top Bar */}
      <header className="flex items-center gap-4 px-6 py-4 border-b border-slate-800 flex-shrink-0 z-10">
        <div className="flex items-center gap-2">
          <GitBranch className="text-indigo-400" size={20} />
          <span className="font-bold text-white tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            ConceptFlow
          </span>
        </div>

        <div className="flex-1 flex gap-2 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGenerate()}
              placeholder="Enter a topic to explore..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {loading ? "Generating..." : "Generate"}
          </button>

          {roadmap && (
            <button
              onClick={() => setChatOpen(prev => !prev)}
              className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Bot size={14} />
              AI Chat
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative overflow-hidden">
        {!roadmap && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Explore Any Topic Visually
              </h1>
              <p className="text-slate-400 text-lg">
                Enter a topic above to generate an interactive learning roadmap
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map(ex => (
                <button key={ex} onClick={() => { setTopic(ex); handleGenerate(ex); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-600 text-slate-300 text-sm rounded-full transition-all">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader2 size={40} className="animate-spin text-indigo-400 mx-auto mb-4" />
              <p className="text-slate-400">Building your knowledge graph...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-950 border border-red-800 text-red-300 px-6 py-4 rounded-xl max-w-md text-center">
              {error}
            </div>
          </div>
        )}

        {roadmap && !loading && (
          <div className={`h-full transition-all ${selectedNode ? "mr-[420px]" : ""}`}>
            <Graph roadmap={roadmap} onNodeClick={setSelectedNode} />
          </div>
        )}

        {selectedNode && (
          <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </main>

      {chatOpen && roadmap && (
        <ChatPanel
          topic={roadmap.topic}
          selectedNode={selectedNode}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}