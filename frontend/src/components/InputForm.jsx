import React, { useState } from 'react';

export default function InputForm({ onCheck, loading, error }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length >= 10) {
      onCheck(text);
    }
  };

  return (
    <div className="card-law p-6 md:p-8 mt-4">
      <h2 className="text-2xl font-serif font-semibold mb-4 text-white">Ethical Assessment</h2>
      <p className="text-slate-300 mb-6 font-sans">
        Paste your AI-generated text or prompts below. We will analyze the content against originality, bias, and harmful intent metrics to ensure your integrity.
      </p>

      {error && (
        <div className="bg-ethicLight text-ethicDark p-5 rounded-lg mb-6 border-4 border-ethicLight shadow-2xl font-serif">
          <strong className="block text-xl uppercase tracking-tighter mb-1">Objection!</strong> 
          <span className="text-sm leading-tight break-words">
            {error.replace(/https?:\/\/[^\s]+/g, '[Link Censored]')}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-64 bg-ethicDark text-ethicLight border border-ethicLight/30 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-ethicLight/50 font-sans resize-none mb-2"
          placeholder="Paste your text or prompt here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          minLength={10}
          maxLength={5000}
        />
        <div className="flex justify-between items-center mb-6 text-sm text-slate-400">
          <span>{text.length} / 5000 characters</span>
          {text.length > 0 && text.length < 10 && (
            <span className="opacity-70">Minimum 10 characters required</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || text.length < 10}
          className={`w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all
            ${loading || text.length < 10 
              ? 'bg-ethicLight/10 text-ethicLight/30 cursor-not-allowed' 
              : 'bg-ethicLight hover:opacity-80 text-ethicDark shadow-lg'}`}
        >
          {loading ? 'Analyzing...' : 'Check Ethics'}
        </button>
      </form>
      <p className="text-xs text-slate-500 text-center mt-6">
        DISCLAIMER: This tool provides AI-generated estimates only. It is NOT a plagiarism detector and cannot verify against actual databases.
      </p>
    </div>
  );
}
