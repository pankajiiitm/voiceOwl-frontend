import React, { useState } from "react";
import { motion } from "framer-motion";
import { createTranscription } from "../services/api";

export default function TranscriptionForm() {
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!audioUrl.trim()) return setMessage("Please enter an audio URL");
    setLoading(true);
    setMessage(null);
    try {
      const data = await createTranscription(audioUrl);
      setMessage(
        `Transcription queued — id: ${data._id || data.transcriptionId || "—"}`
      );
      setAudioUrl("");
    } catch (err: any) {
      setMessage(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div layout>
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
        New Transcription
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="sr-only">Audio URL</label>
          <input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://example.com/sample.mp3"
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-700 text-white rounded-lg shadow"
          >
            {loading ? "Processing…" : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => {
              setAudioUrl("");
              setMessage(null);
            }}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            Clear
          </button>
        </div>

        {message && (
          <div className="mt-2 text-sm text-brand-700 dark:text-brand-300">
            {message}
          </div>
        )}
      </form>

      <div className="mt-6 text-xs text-gray-500">
        Tip: You can paste an S3 URL or any public mp3 link.
      </div>
    </motion.div>
  );
}
