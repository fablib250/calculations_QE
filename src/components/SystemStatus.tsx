import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(Math.floor(Math.random() * 30) + 10);
  const [memoryUsage, setMemoryUsage] = useState(Math.floor(Math.random() * 40) + 20);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate changing system metrics
      setCpuUsage(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(5, Math.min(95, prev + change));
      });
      
      setMemoryUsage(prev => {
        const change = Math.floor(Math.random() * 8) - 4;
        return Math.max(10, Math.min(90, prev + change));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Activity className="w-4 h-4 text-cyan-500 mr-1" />
        <div className="text-xs">
          <div className="flex items-center">
            <span className="mr-1">CPU:</span>
            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  cpuUsage > 80 ? 'bg-red-500' : cpuUsage > 50 ? 'bg-yellow-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${cpuUsage}%` }}
              ></div>
            </div>
            <span className="ml-1">{cpuUsage}%</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">MEM:</span>
            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  memoryUsage > 80 ? 'bg-red-500' : memoryUsage > 50 ? 'bg-yellow-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${memoryUsage}%` }}
              ></div>
            </div>
            <span className="ml-1">{memoryUsage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};