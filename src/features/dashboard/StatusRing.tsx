import React from 'react';

interface StatusRingProps {
  value: number;
  label: string;
  size?: number;
  thickness?: number;
}

export const StatusRing: React.FC<StatusRingProps> = ({
  value,
  label,
  size = 80,
  thickness = 8,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  // Determine color based on value
  const getColor = () => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-orange-500';
    if (value >= 40) return 'text-yellow-500';
    return 'text-cyan-500';
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(0, 75, 100, 0.2)"
            strokeWidth={thickness}
          />
          
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={getColor()}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-cyan-300">{value}%</span>
        </div>
      </div>
      <span className="mt-1 text-xs text-cyan-400">{label}</span>
    </div>
  );
};