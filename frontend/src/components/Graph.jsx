import { useCallback, useState } from "react";
import {
  ReactFlow, Background, Controls, MiniMap,
  useNodesState, useEdgesState,
  BackgroundVariant, MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";

const nodeTypes = { custom: CustomNode };

function layoutNodes(nodes, edges) {
  const inDegree = {};
  const adj = {};
  nodes.forEach(n => { inDegree[n.id] = 0; adj[n.id] = []; });
  edges.forEach(e => {
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    adj[e.source].push(e.target);
  });

  const queue = nodes.filter(n => (inDegree[n.id] || 0) === 0).map(n => n.id);
  const levels = {};
  queue.forEach(id => levels[id] = 0);

  while (queue.length) {
    const curr = queue.shift();
    (adj[curr] || []).forEach(next => {
      levels[next] = Math.max(levels[next] || 0, (levels[curr] || 0) + 1);
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    });
  }

  const levelGroups = {};
  nodes.forEach(n => {
    const lv = levels[n.id] || 0;
    if (!levelGroups[lv]) levelGroups[lv] = [];
    levelGroups[lv].push(n.id);
  });

  const HORIZ_GAP = 250, VERT_GAP = 160;
  const positioned = {};
  Object.entries(levelGroups).forEach(([lv, ids]) => {
    const totalW = ids.length * HORIZ_GAP;
    ids.forEach((id, i) => {
      positioned[id] = {
        x: i * HORIZ_GAP - totalW / 2 + HORIZ_GAP / 2,
        y: parseInt(lv) * VERT_GAP
      };
    });
  });
  return positioned;
}

export default function Graph({ roadmap, onNodeClick }) {
  const [completed, setCompleted] = useState({});

  const handleToggleComplete = useCallback((id) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const positions = layoutNodes(roadmap.nodes, roadmap.edges);

  const initialNodes = roadmap.nodes.map(n => ({
    id: n.id,
    type: "custom",
    position: positions[n.id] || { x: 0, y: 0 },
    data: {
      id: n.id,
      title: n.title,
      description: n.description,
      difficulty: n.difficulty,
      estimated_time: n.estimated_time,
      prerequisites: n.prerequisites,
      related_concepts: n.related_concepts,
      completed: false,
      onToggleComplete: handleToggleComplete,
    }
  }));

  const initialEdges = roadmap.edges.map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    style: { stroke: "#6366f1", strokeWidth: 2 }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Sync completed state into nodes
  const syncedNodes = nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      completed: completed[n.id] || false,
      onToggleComplete: handleToggleComplete,
    }
  }));

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalCount = roadmap.nodes.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const handleNodeClick = useCallback((_, node) => onNodeClick(node), [onNodeClick]);

  return (
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="px-6 py-3 border-b border-slate-800 flex items-center gap-4">
        <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
          {completedCount}/{totalCount} completed
        </span>
        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-green-400 font-mono">{percent}%</span>
      </div>

      {/* Graph */}
      <div className="flex-1">
        <ReactFlow
          nodes={syncedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background variant={BackgroundVariant.Dots} color="#1e293b" gap={24} size={1.5} />
          <Controls style={{ background: "#0f172a", border: "1px solid #1e293b" }} />
          <MiniMap
            nodeColor={n => {
              if (completed[n.id]) return "#22c55e";
              const d = n.data?.difficulty;
              return d === "Beginner" ? "#22c55e" : d === "Intermediate" ? "#f59e0b" : "#ef4444";
            }}
            style={{ background: "#0f172a", border: "1px solid #1e293b" }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}