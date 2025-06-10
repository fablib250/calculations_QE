import React from 'react';

interface HolographicPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowColor?: string;
}

export const HolographicPanel: React.FC<HolographicPanelProps> = ({ 
  children, 
  title, 
  className = '',
  glowColor = 'cyan'
}) => {
  const colorMap: Record<string, string> = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-700/50 shadow-cyan-900/20',
    blue: 'from-blue-500/20 to-indigo-500/10 border-blue-700/50 shadow-blue-900/20',
    green: 'from-green-500/20 to-emerald-500/10 border-green-700/50 shadow-green-900/20',
    purple: 'from-purple-500/20 to-violet-500/10 border-purple-700/50 shadow-purple-900/20',
    orange: 'from-orange-500/20 to-amber-500/10 border-orange-700/50 shadow-orange-900/20',
  };
  
  const glowClasses = colorMap[glowColor] || colorMap.cyan;
  
  return (
    <div className={`relative backdrop-blur-sm bg-gradient-to-br ${glowClasses} border rounded-lg overflow-hidden shadow-lg ${className}`}>
      {title && (
        <div className="border-b border-inherit p-3 text-sm font-semibold">
          <div className="flex items-center justify-between">
            <span className="flex-1">{title}</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400/70"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400/40"></div>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
      </div>
    </div>
  );
};