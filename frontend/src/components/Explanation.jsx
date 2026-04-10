import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export default function Explanation({ explanation }) {
  return (
    <div className="card-law p-6">
      <h3 className="flex items-center gap-2 text-lg font-serif tracking-widest uppercase text-ethicLight mb-4 border-b border-ethicLight/20 pb-3">
        <FaInfoCircle />
        Verdict Explanation
      </h3>
      <p className="text-ethicLight/80 font-sans leading-relaxed">
        {explanation}
      </p>
    </div>
  );
}
