import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://voiceowl-backend.onrender.com";

export async function createTranscription(audioUrl: string) {
  const res = await axios.post(`${BASE_URL}/api/transcription`, { audioUrl });
  return res.data;
}

export async function getRecentTranscriptions() {
  const res = await axios.get(`${BASE_URL}/api/transcriptions`);
  return res.data;
}
