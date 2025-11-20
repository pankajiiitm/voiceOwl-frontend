import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState<any[]>([]);

  const backend = "https://voiceowl-backend.onrender.com/api";

  const loadRecords = async () => {
    try {
      const res = await axios.get(`${backend}/transcriptions`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const submitTranscription = async () => {
    if (!audioUrl.trim()) {
      setMessage("Please enter an audio URL.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${backend}/transcription`, { audioUrl });
      setMessage(`Transcription started. ID: ${res.data.transcriptionId}`);
      setAudioUrl("");
      loadRecords();
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          🎙️ VoiceOwl Transcription Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Simple, clean, and professional interface
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        {/* SECTION 1: Input Form */}
        <section className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-5 text-center">
            Start New Transcription
          </h2>

          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Enter audio URL…"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className=" w-80    
      p-3 
      border border-gray-300 
      rounded-xl 
      shadow-sm 
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-300 
      transition"
            />

            <button
              onClick={submitTranscription}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Processing…" : "Submit"}
            </button>

            {message && (
              <p className="text-sm text-blue-700 font-medium">{message}</p>
            )}
          </div>
        </section>

        {/* SECTION 2: Table */}
        <section className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-5">
            Last 30 Days Transcriptions
          </h2>

          <div className="overflow-hidden border rounded-xl">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Source</th>
                  <th className="p-3 border">Audio URL</th>
                  <th className="p-3 border">Created</th>
                </tr>
              </thead>

              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center p-6 text-gray-500 border"
                    >
                      No transcriptions found.
                    </td>
                  </tr>
                ) : (
                  records.map((r: any) => (
                    <tr
                      key={r._id}
                      className="border hover:bg-gray-50 transition"
                    >
                      <td className="p-3 border font-mono text-xs">{r._id}</td>

                      <td className="p-3 border">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${
                            r.source === "azure"
                              ? "bg-purple-600"
                              : r.source === "ws"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {r.source?.toUpperCase() || "API"}
                        </span>
                      </td>

                      <td className="p-3 border">
                        <a
                          href={r.audioUrl}
                          target="_blank"
                          className="text-blue-700 underline break-all"
                        >
                          {r.audioUrl}
                        </a>
                      </td>

                      <td className="p-3 border text-gray-600">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
