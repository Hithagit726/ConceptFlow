
const BASE_URL = "https://conceptflow-production.up.railway.app/api";

export async function generateRoadmap(topic) {
  const res = await fetch(`${BASE_URL}/generate-roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to generate roadmap");
  return res.json();
}

export async function fetchResources(concept) {
  const res = await fetch(`${BASE_URL}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ concept }),
  });
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}
export async function sendChatMessage(topic, node, messages) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, node, messages }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}