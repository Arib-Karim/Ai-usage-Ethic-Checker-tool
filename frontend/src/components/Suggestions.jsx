import React from 'react';
import { FaLightbulb, FaCheckCircle } from 'react-icons/fa';

export default function Suggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="card-law p-6">
      <h3 className="flex items-center gap-2 text-lg font-serif tracking-widest uppercase text-ethicLight mb-4 border-b border-ethicLight/20 pb-3">
        <FaLightbulb className="text-ethicLight" />
        Recommendations
      </h3>
      <ul className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex gap-3 text-ethicLight/80 font-sans leading-relaxed">
            <FaCheckCircle className="text-ethicLight/60 mt-1 flex-shrink-0" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
