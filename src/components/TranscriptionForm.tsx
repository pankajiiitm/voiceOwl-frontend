import React, { useState } from 'react';
import { createTranscription } from '../services/api';

export default function TranscriptionForm() {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{_id?: string, error?: string} | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!audioUrl) return setResult({ error: 'audioUrl required' });
    setLoading(true);
    setResult(null);
    try {
      const data = await createTranscription(audioUrl);
      // backend returns { _id }
      setResult({ _id: data._id });
      setAudioUrl('');
    } catch (err: any) {
      setResult({ error: err?.response?.data?.error || err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Create Transcription</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Audio URL
          <input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://example.com/sample.mp3"
            type="text"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {result?.error && <div className="error">Error: {result.error}</div>}
      {result?._id && (
        <div className="success">
          Created transcription with id: <code>{result._id}</code>
        </div>
      )}
    </div>
  );
}
