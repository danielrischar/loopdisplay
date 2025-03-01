import React from 'react';

interface RankPlaqueProps {
  rank: string;
  year: string;
}

const RankPlaque: React.FC<RankPlaqueProps> = ({ rank, year }) => {
  // SVG dimensions
  const width = 600;
  const height = 300;
  
  // Get rank emblem path based on rank
  const getRankEmblem = () => {
    switch (rank) {
      case 'Tiger':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <circle cx="0" cy="0" r="50" fill="none" stroke="black" strokeWidth="2" />
            <path d="M-30,-30 C-10,0 -10,30 -30,30 C0,10 30,30 30,30 C30,-30 0,-10 -30,-30" fill="none" stroke="black" strokeWidth="2" />
            <circle cx="-15" cy="-5" r="5" fill="black" />
            <circle cx="15" cy="-5" r="5" fill="black" />
          </g>
        );
      case 'Wolf':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <path d="M0,-40 L-40,0 L-20,40 L20,40 L40,0 Z" fill="none" stroke="black" strokeWidth="2" />
            <circle cx="-15" cy="-5" r="5" fill="black" />
            <circle cx="15" cy="-5" r="5" fill="black" />
            <path d="M-10,15 C0,25 10,15 0,5 C-10,15 0,25 10,15" fill="none" stroke="black" strokeWidth="2" />
          </g>
        );
      case 'Bear':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="black" strokeWidth="2" />
            <circle cx="-15" cy="-15" r="8" fill="black" />
            <circle cx="15" cy="-15" r="8" fill="black" />
            <path d="M-10,10 C0,20 10,10 0,0 C-10,10 0,20 10,10" fill="none" stroke="black" strokeWidth="2" />
            <path d="M-30,-30 C-40,-10 -40,20 -20,30" fill="none" stroke="black" strokeWidth="2" />
            <path d="M30,-30 C40,-10 40,20 20,30" fill="none" stroke="black" strokeWidth="2" />
          </g>
        );
      case 'Webelos':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <path d="M0,-50 L14,-15 L50,-15 L20,5 L30,40 L0,20 L-30,40 L-20,5 L-50,-15 L-14,-15 Z" fill="none" stroke="black" strokeWidth="2" />
          </g>
        );
      case 'Arrow of Light':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <path d="M-60,0 L60,0" stroke="black" strokeWidth="3" />
            <path d="M40,-20 L60,0 L40,20" fill="none" stroke="black" strokeWidth="3" />
            <path d="M-30,-30 L0,30 L30,-30" fill="none" stroke="black" strokeWidth="3" />
          </g>
        );
      case 'Eagle':
        return (
          <g transform="translate(300, 120) scale(0.8)">
            <path d="M0,-50 L15,-15 L50,-15 L25,5 L35,40 L0,15 L-35,40 L-25,5 L-50,-15 L-15,-15 Z" fill="none" stroke="black" strokeWidth="2" />
            <path d="M-20,-10 C-10,0 0,-5 0,-15 C0,-5 10,0 20,-10" fill="none" stroke="black" strokeWidth="2" />
          </g>
        );
      default:
        // Default scout emblem (fleur-de-lis)
        return (
          <g transform="translate(300, 120) scale(1.5)">
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
        );
    }
  };
  
  return (
    <svg
      id="rank-plaque"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect x="0" y="0" width={width} height={height} fill="white" stroke="black" strokeWidth="2" />
      
      {/* Border design */}
      <rect x="15" y="15" width={width - 30} height={height - 30} fill="none" stroke="black" strokeWidth="1" />
      
      {/* Rank title */}
      <text
        x={width / 2}
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        textAnchor="middle"
        fontWeight="bold"
      >
        {rank} Rank
      </text>
      
      {/* Rank emblem */}
      {getRankEmblem()}
      
      {/* Year */}
      <text
        x={width / 2}
        y={height - 50}
        fontFamily="Arial, sans-serif"
        fontSize="28"
        textAnchor="middle"
      >
        {year}
      </text>
    </svg>
  );
};

export default RankPlaque;