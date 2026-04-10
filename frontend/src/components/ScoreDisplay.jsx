import React from 'react';
import LadyJusticeScale from './LadyJusticeScale';
import JudgingBubble from './JudgingBubble';

export default function ScoreDisplay({ score, percentage, message }) {
  const getBadgeColor = () => {
    return 'bg-secondary border border-ethicLight text-ethicLight';
  };

  const getBadgeText = (s) => {
    if (s >= 70) return '● EXCELLENT INTEGRITY';
    if (s >= 40) return '● QUESTIONABLE INTEGRITY';
    return '● UNETHICAL USAGE';
  };

  return (
    <div className="card-law overflow-visible p-6 text-center flex flex-col items-center justify-between min-h-[400px]">
      <div className="w-full mb-2">
        <span className={`px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-md ${getBadgeColor()}`}>
          {getBadgeText(score)}
        </span>
      </div>
      
      <div className="w-full flex-grow flex items-center justify-center relative">
        <JudgingBubble message={message} />
        <LadyJusticeScale score={score} />
      </div>
      
      <p className="text-xl text-ethicLight font-serif font-medium mt-4 bg-ethicLight/5 py-2 px-6 rounded-lg border border-ethicLight/20">
        Final Score: {score} / 100
      </p>
    </div>
  );
}
