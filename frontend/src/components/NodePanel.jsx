import { useEffect, useState } from "react";
import { fetchResources } from "../services/api";
import { X, Clock, Globe, Loader2 } from "lucide-react";

export default function NodePanel({ node, onClose }) {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!node) return;
    setLoading(true);
    setResources(null);
    fetchResources(node.data.title)
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [node]);

  if (!node) return null;
  const d = node.data;

  const diffColor = {
    Beginner: "text-green-400 bg-green-950 border-green-800",
    Intermediate: "text-yellow-400 bg-yellow-950 border-yellow-800",
    Advanced: "text-red-400 bg-red-950 border-red-800",
  }[d.difficulty] || "text-blue-400 bg-blue-950";

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] z-50 flex flex-col"
      style={{ background: "#080d1a", borderLeft: "1px solid #1e293b" }}>

      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-start justify-between">
        <div>
          <span className={`text-xs font-mono px-2 py-1 rounded border ${diffColor}`}>
            {d.difficulty}
          </span>
          <h2 className="text-xl font-bold text-white mt-2">{d.title}</h2>
          <div className="flex items-center gap-1 mt-1 text-slate-400 text-sm">
            <Clock size={12} /> <span>{d.estimated_time}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
          <X size={20} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Description */}
        <section>
          <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">About</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{d.description}</p>
        </section>

        {/* Prerequisites */}
        {d.prerequisites?.length > 0 && (
          <section>
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">Prerequisites</h3>
            <div className="flex flex-wrap gap-2">
              {d.prerequisites.map(p => (
                <span key={p} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                  {p.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Loader2 size={14} className="animate-spin" /> Fetching resources...
          </div>
        )}

        {resources && (
          <>
            {/* Wikipedia */}
            {resources.wikipedia?.url && (
              <section>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Globe size={12} /> Wikipedia
                </h3>
                <a href={resources.wikipedia.url} target="_blank" rel="noreferrer"
                  className="block p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-indigo-600 transition-colors">
                  <p className="text-white text-sm font-medium">{resources.wikipedia.title}</p>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-3">{resources.wikipedia.summary}</p>
                </a>
              </section>
            )}

            {/* YouTube Videos */}
            {resources.videos?.length > 0 && (
              <section>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Videos
                </h3>
                <div className="space-y-3">
                  {resources.videos.map((v, i) => (
                    <a key={i} href={v.url} target="_blank" rel="noreferrer"
                      className="flex gap-3 p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-red-700 transition-colors">
                      <img src={v.thumbnail} alt={v.title} className="w-24 h-16 object-cover rounded flex-shrink-0" />
                      <div>
                        <p className="text-white text-xs font-medium line-clamp-2">{v.title}</p>
                        <p className="text-slate-500 text-xs mt-1">{v.channel} · {v.published}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}