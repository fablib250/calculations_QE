import React from 'react';

interface ElementCardProps {
  element: any;
  colorBy: 'category' | 'state' | 'electronegativity';
  onClick: () => void;
  isSelected: boolean;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  colorBy,
  onClick,
  isSelected,
}) => {
  const getBackgroundColor = () => {
    if (colorBy === 'category') {
      switch (element.category) {
        case 'alkali metal': return 'from-red-500/20 to-red-700/10';
        case 'alkaline earth metal': return 'from-orange-500/20 to-orange-700/10';
        case 'transition metal': return 'from-yellow-500/20 to-yellow-700/10';
        case 'post-transition metal': return 'from-green-500/20 to-green-700/10';
        case 'metalloid': return 'from-teal-500/20 to-teal-700/10';
        case 'nonmetal': return 'from-blue-500/20 to-blue-700/10';
        case 'halogen': return 'from-indigo-500/20 to-indigo-700/10';
        case 'noble gas': return 'from-purple-500/20 to-purple-700/10';
        case 'lanthanide': return 'from-pink-500/20 to-pink-700/10';
        case 'actinide': return 'from-rose-500/20 to-rose-700/10';
        default: return 'from-gray-500/20 to-gray-700/10';
      }
    } else if (colorBy === 'state') {
      switch (element.phase) {
        case 'Gas': return 'from-red-500/20 to-red-700/10';
        case 'Liquid': return 'from-blue-500/20 to-blue-700/10';
        case 'Solid': return 'from-green-500/20 to-green-700/10';
        default: return 'from-gray-500/20 to-gray-700/10';
      }
    } else if (colorBy === 'electronegativity') {
      const en = element.electronegativity || 0;
      if (en === 0) return 'from-gray-500/20 to-gray-700/10';
      if (en < 1) return 'from-blue-900/20 to-blue-700/10';
      if (en < 2) return 'from-blue-500/20 to-blue-700/10';
      if (en < 3) return 'from-green-500/20 to-green-700/10';
      if (en < 4) return 'from-yellow-500/20 to-yellow-700/10';
      return 'from-red-500/20 to-red-700/10';
    }
    return 'from-gray-500/20 to-gray-700/10';
  };

  return (
    <div
      onClick={onClick}
      className={`w-full aspect-square bg-gradient-to-br ${getBackgroundColor()} 
        border ${isSelected ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-gray-700/50'} 
        rounded-md flex flex-col p-1 cursor-pointer select-none
        transition-all duration-200 hover:scale-105 hover:shadow-lg hover:z-10
        ${isSelected ? 'z-20 scale-105' : 'hover:z-10'}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono text-cyan-500/80">{element.number}</span>
        <span className="text-[10px] font-mono text-cyan-500/80">{element.atomic_mass?.toFixed(1)}</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center -mt-2">
        <div className="text-xl font-bold text-cyan-300 mb-0.5">{element.symbol}</div>
        <div className="text-[8px] text-center text-cyan-400/80 truncate w-full">
          {element.name}
        </div>
      </div>
      
      <div className="flex justify-between items-end text-[8px] mt-1">
        <span className="text-cyan-500/60">{element.category?.split(' ')[0]}</span>
        <span className="text-cyan-500/60">{element.phase}</span>
      </div>
    </div>
  );
};