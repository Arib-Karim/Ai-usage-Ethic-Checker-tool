import React from 'react';

/**
 * JudgingBubble Component
 * A stylized speech bubble for Lady Justice's sarcastic remarks.
 * Positioned absolutely so it can overflow out of its parent containers.
 */
const JudgingBubble = ({ message }) => {
  if (!message) return null;

  return (
    <div className="absolute left-[-280px] top-6 z-20 w-80 animate-in fade-in slide-in-from-left-12 duration-1000">
      <div className="bg-ethicDark text-ethicLight p-5 rounded-2xl shadow-2xl relative border-2 border-ethicLight/80">
        <p className="text-sm font-sans italic font-semibold leading-relaxed whitespace-pre-line">
          "{message}"
        </p>
        
        {/* Pointy Beak Tail pointing to Justice's head - perfect bridge */}
        <div className="absolute top-6 -right-[2px] transform translate-x-full w-0 h-0 
          border-t-[10px] border-t-transparent 
          border-l-[35px] border-l-ethicLight 
          border-b-[10px] border-b-transparent">
          <div className="absolute top-[-10px] left-[-38px] w-0 h-0 
            border-t-[10px] border-t-transparent 
            border-l-[35px] border-l-ethicDark 
            border-b-[10px] border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default JudgingBubble;
