import { Handle, Position } from "@xyflow/react";
import { CheckCircle2, Circle } from "lucide-react";

const difficultyColors = {
  Beginner: { bg: "#052e16", border: "#22c55e", text: "#86efac" },
  Intermediate: { bg: "#1c1917", border: "#f59e0b", text: "#fcd34d" },
  Advanced: { bg: "#1f0a0a", border: "#ef4444", text: "#fca5a5" },
};

export default function CustomNode({ data, selected }) {
  const colors = difficultyColors[data.difficulty] || difficultyColors.Beginner;
  const completed = data.completed || false;

  return (
    <div
      style={{
        background: completed ? "#0f2a1a" : selected ? "#1e293b" : "#0f172a",
        border: `2px solid ${completed ? "#22c55e" : selected ? "#818cf8" : colors.border}`,
        boxShadow: completed
          ? `0 0 20px #22c55e60, 0 0 40px #22c55e30`
          : selected
          ? `0 0 20px #818cf880`
          : `0 0 10px ${colors.border}40`,
        transition: "all 0.3s ease",
        opacity: completed ? 0.85 : 1,
      }}
      className="rounded-xl px-4 py-3 min-w-[160px] max-w-[200px] cursor-pointer"
    >
      <Handle type="target" position={Position.Top} style={{ background: colors.border }} />

      {/* Top row: difficulty + check button */}
      <div className="flex items-center justify-between mb-2">
        <div
          style={{ color: colors.text, background: colors.bg }}
          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
        >
          {data.difficulty}
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            data.onToggleComplete(data.id);
          }}
          className="text-slate-500 hover:text-green-400 transition-colors"
        >
          {completed
            ? <CheckCircle2 size={16} className="text-green-400" />
            : <Circle size={16} />}
        </button>
      </div>

      <p className="text-sm font-semibold text-white leading-tight">
        {completed && <span className="mr-1">✓</span>}
        {data.title}
      </p>
      <p className="text-xs text-slate-400 mt-1">{data.estimated_time}</p>

      <Handle type="source" position={Position.Bottom} style={{ background: colors.border }} />
    </div>
  );
}