import React from 'react';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  type?: 'number' | 'operator' | 'function' | 'equals' | 'memory' | 'scientific';
  className?: string;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  type = 'number',
  className = '',
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'number':
        return 'bg-gray-800/60 hover:bg-gray-700/60 text-cyan-300';
      case 'operator':
        return 'bg-cyan-900/60 hover:bg-cyan-800/60 text-cyan-300';
      case 'function':
        return 'bg-blue-900/60 hover:bg-blue-800/60 text-blue-300';
      case 'equals':
        return 'bg-green-900/60 hover:bg-green-800/60 text-green-300';
      case 'memory':
        return 'bg-purple-900/60 hover:bg-purple-800/60 text-purple-300';
      case 'scientific':
        return 'bg-indigo-900/60 hover:bg-indigo-800/60 text-indigo-300';
      default:
        return 'bg-gray-800/60 hover:bg-gray-700/60 text-cyan-300';
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-md border border-gray-700/50 font-mono transition-all duration-150 
        active:scale-95 ${getButtonStyle()} ${className}`}
    >
      {label}
    </button>
  );
};