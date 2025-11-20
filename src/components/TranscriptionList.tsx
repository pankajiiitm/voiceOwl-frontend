import React, { useEffect, useState } from 'react';
import { getRecentTranscriptions } from '../services/api';

type Transcription = {
  _id: string;
  audioUrl: string;
  transcription: string;
  source?: string;
  createdAt?: string;
};

export default function TranscriptionList() {
  const [items, setItems] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecentTranscriptions();
      // data is array of docs
      setItems(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // refresh every 10 seconds for convenience
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card">
      <h2>Recent Transcriptions (last 30 days)</h2>
      <button onClick={load} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      {error && <div className="error">Error: {error}</div>}
      <ul className="list">
        {items.length === 0 && !loading && <li>No transcriptions found.</li>}
        {items.map((it) => (
          <li key={it._id}>
            <div><strong>Id:</strong> <code>{it._id}</code></div>
            <div><strong>Audio:</strong> {it.audioUrl}</div>
            <div><strong>Transcription:</strong> {it.transcription}</div>
            <div><strong>Source:</strong> {it.source || 'mock'}</div>
            <div><small>{it.createdAt ? new Date(it.createdAt).toLocaleString() : ''}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
