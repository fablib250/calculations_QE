import React from 'react';

interface DashboardStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color?: 'cyan' | 'blue' | 'green' | 'orange' | 'purple';
}

export const DashboardStat: React.FC<DashboardStatProps> = ({
  icon,
  label,
  value,
  subValue,
  color = 'cyan'
}) => {
  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-900/30',
    blue: 'text-blue-400 bg-blue-900/30',
    green: 'text-green-400 bg-green-900/30',
    orange: 'text-orange-400 bg-orange-900/30',
    purple: 'text-purple-400 bg-purple-900/30',
  };
  
  const iconClasses = colorMap[color] || colorMap.cyan;
  
  return (
    <div className="flex items-center bg-black/20 rounded-lg p-3">
      <div className={`${iconClasses} p-2 rounded-md mr-3`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-cyan-500/80">{label}</div>
        <div className="text-sm font-semibold text-cyan-300">{value}</div>
        {subValue && <div className="text-xs text-cyan-500/60">{subValue}</div>}
      </div>
    </div>
  );
};