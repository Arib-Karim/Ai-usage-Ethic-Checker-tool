import React from 'react';

export default function LadyJusticeScale({ score, message }) {
  // Score is 0 to 100.
  // Ethical is Left Pan
  // Unethical is Right Pan
  // If score = 100 (Ethical), Left Pan goes DOWN (heavier).
  // If score = 100, Math: 50 - 100 = -50. -50 / 50 = -1. Tilt = -25 deg.
  // Rotate(-25) around center lowers the left side. Perfect.
  const ethicalWeight = score;
  const unethicalWeight = 100 - score;
  const maxTilt = 25;
  const tilt = ((50 - score) / 50) * maxTilt;

  return (
    <div className="flex flex-col items-center justify-center pt-2 pb-6 relative">

      <svg width="300" height="320" viewBox="0 0 300 320" className="overflow-visible drop-shadow-2xl">
        {/* Lady Justice Silhouette Background */}
        <g fill="#164359" opacity="0.4">
          {/* Head & Blindfold */}
          <circle cx="150" cy="50" r="18" />
          <rect x="127" y="47" width="46" height="6" fill="#061E29" /> 
          {/* Dress */}
          <path d="M 135 75 L 165 75 C 180 150 200 280 200 280 L 100 280 C 100 280 120 150 135 75 Z" />
          {/* Left Arm (holding scale) */}
          <path d="M 135 85 L 100 110 L 150 135" stroke="#164359" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right Arm (resting at side) */}
          <path d="M 165 85 L 190 130 L 180 160" stroke="#164359" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        
        {/* Center Pillar */}
        <polygon points="146,130 154,130 158,280 142,280" fill="#F3F4F4" opacity="0.6" />
        <path d="M 120 280 L 180 280 L 190 295 L 110 295 Z" fill="#F3F4F4" opacity="0.8" />
        <path d="M 100 295 L 200 295 L 200 305 L 100 305 Z" fill="#061E29" />

        {/* The Animated Scales */}
        {/* Main pivot point: cx=150, cy=135 */}
        <g transform={`rotate(${tilt}, 150, 135)`} style={{ transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          {/* The Beam */}
          <path d="M 50 132 L 250 132 L 245 138 L 55 138 Z" fill="#F3F4F4" />
          <circle cx="50" cy="135" r="4" fill="#F3F4F4" />
          <circle cx="250" cy="135" r="4" fill="#F3F4F4" />
          
          {/* Left Pan (Ethical) */}
          {/* Counter-rotate to stay upright */}
          <g transform={`translate(50, 135) rotate(${-tilt})`} style={{ transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <line x1="0" y1="0" x2="-35" y2="80" stroke="#F3F4F4" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="0" y1="0" x2="35" y2="80" stroke="#F3F4F4" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M -45 80 L 45 80 C 45 105 -45 105 -45 80 Z" fill="#F3F4F4" opacity="0.3" />
            <text x="0" y="115" textAnchor="middle" fill="#F3F4F4" fontSize="12" className="font-sans font-bold tracking-widest uppercase">Ethical</text>
            <text x="0" y="135" textAnchor="middle" fill="#F3F4F4" fontSize="16" className="font-bold">{ethicalWeight}%</text>
            {/* Weight block rendering relative to percentage */}
            <rect x="-15" y={80 - (ethicalWeight * 0.4)} width="30" height={ethicalWeight * 0.4} fill="#F3F4F4" fillOpacity="0.6" />
          </g>
          
          {/* Right Pan (Unethical) */}
          <g transform={`translate(250, 135) rotate(${-tilt})`} style={{ transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <line x1="0" y1="0" x2="-35" y2="80" stroke="#F3F4F4" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="0" y1="0" x2="35" y2="80" stroke="#F3F4F4" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M -45 80 L 45 80 C 45 105 -45 105 -45 80 Z" fill="#F3F4F4" opacity="0.3" />
            <text x="0" y="115" textAnchor="middle" fill="#F3F4F4" fontSize="12" className="font-sans font-bold tracking-widest uppercase">Unethical</text>
            <text x="0" y="135" textAnchor="middle" fill="#F3F4F4" fontSize="16" className="font-bold">{unethicalWeight}%</text>
             {/* Weight block rendering relative to percentage */}
             <rect x="-15" y={80 - (unethicalWeight * 0.4)} width="30" height={unethicalWeight * 0.4} fill="#F3F4F4" fillOpacity="0.6" />
          </g>
        </g>
        
        {/* Center Pin overlay */}
        <circle cx="150" cy="135" r="7" fill="#F3F4F4" />
        <circle cx="150" cy="135" r="4" fill="#061E29" />
      </svg>
    </div>
  );
}
