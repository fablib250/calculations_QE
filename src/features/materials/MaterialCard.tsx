import React from 'react';

interface MaterialCardProps {
  material: any;
  onClick: () => void;
  isSelected: boolean;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onClick,
  isSelected,
}) => {
  const getCategoryColor = () => {
    switch (material.category) {
      case 'metal': return 'from-blue-500/20 to-cyan-500/10';
      case 'polymer': return 'from-green-500/20 to-emerald-500/10';
      case 'ceramic': return 'from-orange-500/20 to-amber-500/10';
      case 'composite': return 'from-purple-500/20 to-violet-500/10';
      case 'semiconductor': return 'from-pink-500/20 to-rose-500/10';
      default: return 'from-gray-500/20 to-slate-500/10';
    }
  };
  
  const getCategoryIcon = () => {
    switch (material.category) {
      case 'metal': return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 7V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V7" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 17V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'polymer': return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 4V20M17 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'ceramic': return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L21 18H3L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9L15 15H9L12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
      case 'composite': return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 2V22M15 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
      case 'semiconductor': return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 4V8M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12H8M16 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
      default: return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 3V21" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
  };
  
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 
        bg-gradient-to-br ${getCategoryColor()} 
        border ${isSelected ? 'border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-cyan-800/30'}
        hover:border-cyan-700/70 transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-cyan-300">{material.name}</h3>
        <div className={`p-1 rounded ${isSelected ? 'bg-cyan-500/30 text-cyan-300' : 'bg-cyan-900/30 text-cyan-500'}`}>
          {getCategoryIcon()}
        </div>
      </div>
      
      <p className="text-sm text-cyan-400/70 mb-3 line-clamp-2">{material.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/30 rounded p-1">
          <span className="block text-cyan-500/70">Density</span>
          <span className="text-cyan-300">{material.properties.density}</span>
        </div>
        <div className="bg-black/30 rounded p-1">
          <span className="block text-cyan-500/70">Melting Point</span>
          <span className="text-cyan-300">{material.properties.meltingPoint}</span>
        </div>
      </div>
    </div>
  );
};