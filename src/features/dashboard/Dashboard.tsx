import React from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { Cpu, Atom, Microscope, Database, Zap, Activity, Layers, Workflow } from 'lucide-react';
import { DashboardStat } from './DashboardStat';
import { StatusRing } from './StatusRing';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-cyan-300">Material Science Agent Dashboard</h2>
        <p className="text-cyan-500/80 mt-1">Material analysis and engineering assistant</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HolographicPanel
          title="System Status"
          className="md:col-span-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardStat
              icon={<Cpu className="w-5 h-5" />}
              label="Processors"
              value="16/16"
              subValue="Online"
              color="cyan"
            />
            <DashboardStat
              icon={<Activity className="w-5 h-5" />}
              label="System Load"
              value="28%"
              subValue="Nominal"
              color="green"
            />
            <DashboardStat
              icon={<Database className="w-5 h-5" />}
              label="Database"
              value="Connected"
              subValue="7.2TB Available"
              color="blue"
            />
            <DashboardStat
              icon={<Zap className="w-5 h-5" />}
              label="Power"
              value="Optimal"
              subValue="96% Efficiency"
              color="orange"
            />
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-black/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">System Diagnostics</h3>
              <div className="space-y-2">
                {[
                  { name: 'Quantum Processor', status: 'Online', health: 96 },
                  { name: 'Neural Network', status: 'Active', health: 98 },
                  { name: 'Material Database', status: 'Synced', health: 100 },
                  { name: 'Sensor Array', status: 'Calibrated', health: 92 },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-cyan-300">{item.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-cyan-400/80">{item.status}</span>
                      <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${item.health}%` }}
                        ></div>
                      </div>
                      <span className="text-cyan-500">{item.health}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 bg-black/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">Recent Activity</h3>
              <div className="space-y-2 text-xs">
                {[
                  { text: 'Material analysis complete: Titanium Alloy', time: '3m ago' },
                  { text: 'Database updated with new compounds', time: '17m ago' },
                  { text: 'System calibration performed', time: '1h ago' },
                  { text: 'Neural network training completed', time: '3h ago' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-cyan-300">{item.text}</span>
                    <span className="text-cyan-500/70">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </HolographicPanel>
        
        <HolographicPanel title="System Resources">
          <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-2 gap-4">
              <StatusRing value={72} label="CPU" />
              <StatusRing value={64} label="Memory" />
              <StatusRing value={38} label="Storage" />
              <StatusRing value={91} label="Network" />
            </div>
          </div>
        </HolographicPanel>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HolographicPanel 
          title="Quick Actions"
          className="md:col-span-1"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Atom />, label: 'Periodic Table' },
              { icon: <Microscope />, label: 'Material Analysis' },
              { icon: <Layers />, label: 'Compounds' },
              { icon: <Workflow />, label: 'Diagnostics' },
            ].map((action, index) => (
              <button 
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors"
              >
                <div className="text-cyan-400 mb-2">{action.icon}</div>
                <span className="text-xs text-cyan-300">{action.label}</span>
              </button>
            ))}
          </div>
        </HolographicPanel>
        
        <HolographicPanel 
          title="Latest Materials Analysis"
          className="md:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-cyan-400 border-b border-cyan-900/50">
                  <th className="px-2 py-2 text-left">Material</th>
                  <th className="px-2 py-2 text-left">Composition</th>
                  <th className="px-2 py-2 text-left">Properties</th>
                  <th className="px-2 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    material: 'Titanium Alloy', 
                    composition: 'Ti-6Al-4V', 
                    properties: 'High strength, low density', 
                    status: 'Analyzed'
                  },
                  { 
                    material: 'Carbon Fiber', 
                    composition: 'C (Graphite Structure)', 
                    properties: 'High tensile strength', 
                    status: 'In Progress'
                  },
                  { 
                    material: 'Neodymium Magnet', 
                    composition: 'Nd₂Fe₁₄B', 
                    properties: 'Strong magnetic field', 
                    status: 'Analyzed'
                  },
                  { 
                    material: 'Silicon Carbide', 
                    composition: 'SiC', 
                    properties: 'High temperature resistance', 
                    status: 'Pending'
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-cyan-900/30 hover:bg-cyan-900/10">
                    <td className="px-2 py-2 text-cyan-300">{item.material}</td>
                    <td className="px-2 py-2 text-cyan-400/80">{item.composition}</td>
                    <td className="px-2 py-2 text-cyan-500/70">{item.properties}</td>
                    <td className="px-2 py-2 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'Analyzed' ? 'bg-green-900/30 text-green-400' :
                        item.status === 'In Progress' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-orange-900/30 text-orange-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HolographicPanel>
      </div>
    </div>
  );
};