import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

export default function JudgingMessage({ message, score }) {
  const isGood = score >= 70;
  const isBad = score < 40;
  
  return (
    <div className={`card-law p-6 relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 rounded-full opacity-10 blur-2xl
        ${isGood ? 'bg-green-500' : isBad ? 'bg-red-500' : 'bg-yellow-500'}`} 
      />
      
      <FaQuoteLeft className="text-3xl text-[#164359] mb-3" />
      
      <p className="text-xl font-serif italic text-white leading-relaxed">
        "{message}"
      </p>
    </div>
  );
}
