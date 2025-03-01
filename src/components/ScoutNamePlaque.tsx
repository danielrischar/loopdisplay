import React from 'react';

interface ScoutNamePlaqueProps {
  scoutName: string;
  pack: string;
  council: string;
  town: string;
}

const ScoutNamePlaque: React.FC<ScoutNamePlaqueProps> = ({ scoutName, pack, council, town }) => {
  // SVG dimensions
  const width = 600;
  const height = 200;
  
  // Calculate font sizes based on name length
  const nameFontSize = Math.min(48, Math.max(24, 400 / Math.max(1, scoutName.length)));
  
  return (
    <svg
      id="scout-plaque"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect x="0" y="0" width={width} height={height} fill="white" stroke="black" strokeWidth="2" />
      
      {/* Border design */}
      <rect x="10" y="10" width={width - 20} height={height - 20} fill="none" stroke="black" strokeWidth="1" />
      
      {/* Scout emblem - simplified fleur-de-lis */}
      <g transform="translate(300, 40) scale(0.5)">
        <path
          d="M0,-30 C-10,-20 -15,-10 -15,0 C-15,10 -10,20 0,30 C10,20 15,10 15,0 C15,-10 10,-20 0,-30 Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        <line x1="0" y1="0" x2="0" y2="40" stroke="black" strokeWidth="2" />
        <path
          d="M-15,40 C-10,35 -5,30 0,30 C5,30 10,35 15,40"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </g>
      
      {/* Scout name */}
      <text
        x={width / 2}
        y={height / 2 + 10}
        fontFamily="Arial, sans-serif"
        fontSize={nameFontSize}
        textAnchor="middle"
        fontWeight="bold"
      >
        {scoutName}
      </text>
      
      {/* Pack information */}
      <text
        x={width / 2}
        y={height - 50}
        fontFamily="Arial, sans-serif"
        fontSize="16"
        textAnchor="middle"
      >
        {pack}
      </text>
      
      {/* Council and town */}
      <text
        x={width / 2}
        y={height - 30}
        fontFamily="Arial, sans-serif"
        fontSize="14"
        textAnchor="middle"
      >
        {council} {town ? `• ${town}` : ''}
      </text>
    </svg>
  );
};

export default ScoutNamePlaque;