import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRecentTranscriptions } from "../services/api";

type Item = {
  _id: string;
  audioUrl: string;
  transcription?: string;
  source?: string;
  createdAt?: string;
};

export default function TranscriptionList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getRecentTranscriptions();
      setItems(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Recent Transcriptions
        </h2>

        <button
          onClick={load}
          disabled={loading}
          className="text-sm px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700"
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

      <div className="space-y-3">
        <AnimatePresence>
          {items.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 text-center text-gray-500"
            >
              No transcriptions found.
            </motion.div>
          )}

          {items.map((it) => (
            <motion.div
              key={it._id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">
                    Id:{" "}
                    <code className="text-xs bg-gray-100 px-1 rounded">
                      {it._id}
                    </code>
                  </div>

                  <a
                    className="block mt-2 text-sm text-blue-700 dark:text-blue-300 break-words"
                    href={it.audioUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {it.audioUrl}
                  </a>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {it.transcription || (
                      <span className="italic text-gray-400">
                        (no transcription yet)
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs text-white ${
                      it.source === "azure"
                        ? "bg-purple-600"
                        : it.source === "ws"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {(it.source || "api").toUpperCase()}
                  </span>

                  <small className="text-xs text-gray-400">
                    {it.createdAt
                      ? new Date(it.createdAt).toLocaleString()
                      : ""}
                  </small>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
