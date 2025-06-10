import React, { useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { Atom, Calculator, Database, Play, Save, Settings, Share2, Microscope, Zap } from 'lucide-react';
import { QuantumWorkflow } from './QuantumWorkflow';
import { SimulationParams } from './types';
import { motion } from 'framer-motion';

export const MaterialsComputation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'quantum' | 'results'>('quantum');
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    temperature: 300,
    pressure: 1,
    timeSteps: 1000,
    cutoffEnergy: 40,
    kPoints: [4, 4, 4],
    convergenceTolerance: 1e-8,
    maxIterations: 100,
    exchangeCorrelation: 'PBE',
    pseudopotentials: ['Si.pz-vbc.UPF']
  });

  const [isSimulating, setIsSimulating] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setActiveTab('results');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-cyan-300">Materials Computation</h2>
        <p className="text-cyan-500/80 mt-1">Advanced quantum mechanical calculations and visualizations</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Tools and Parameters */}
        <div className="lg:col-span-1 space-y-6">
          <HolographicPanel title="Tools">
            <div className="space-y-4">
              <button
                onClick={() => setActiveTab('structure')}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  activeTab === 'structure'
                    ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-700/50'
                    : 'bg-black/20 text-cyan-500 hover:bg-cyan-900/30'
                }`}
              >
                <Atom className="w-5 h-5 mr-3" />
                Structure Builder
              </button>

              <button
                onClick={() => setActiveTab('quantum')}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  activeTab === 'quantum'
                    ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-700/50'
                    : 'bg-black/20 text-cyan-500 hover:bg-cyan-900/30'
                }`}
              >
                <Calculator className="w-5 h-5 mr-3" />
                Quantum Workflow
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  activeTab === 'results'
                    ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-700/50'
                    : 'bg-black/20 text-cyan-500 hover:bg-cyan-900/30'
                }`}
              >
                <Database className="w-5 h-5 mr-3" />
                Results Analysis
              </button>
            </div>
          </HolographicPanel>

          <HolographicPanel title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors">
                <Microscope className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="text-xs text-cyan-300">Analysis</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors">
                <Share2 className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="text-xs text-cyan-300">Share</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors">
                <Settings className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="text-xs text-cyan-300">Settings</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors">
                <Save className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="text-xs text-cyan-300">Save</span>
              </button>
            </div>
          </HolographicPanel>

          <HolographicPanel title="Simulation Parameters">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">
                  Temperature (K)
                </label>
                <input
                  type="number"
                  value={simulationParams.temperature}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    temperature: parseFloat(e.target.value)
                  }))}
                  className="w-full bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">
                  Pressure (atm)
                </label>
                <input
                  type="number"
                  value={simulationParams.pressure}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    pressure: parseFloat(e.target.value)
                  }))}
                  className="w-full bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">
                  Exchange-Correlation
                </label>
                <select
                  value={simulationParams.exchangeCorrelation}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    exchangeCorrelation: e.target.value
                  }))}
                  className="w-full bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300"
                >
                  <option value="PBE">PBE</option>
                  <option value="LDA">LDA</option>
                  <option value="HSE">HSE</option>
                </select>
              </div>

              <button
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className="w-full flex items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin mr-2">
                      <Zap className="w-5 h-5" />
                    </div>
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Simulation
                  </>
                )}
              </button>
            </div>
          </HolographicPanel>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <HolographicPanel className="h-[800px] overflow-auto">
            {activeTab === 'quantum' ? (
              <QuantumWorkflow />
            ) : activeTab === 'structure' ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Atom className="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-cyan-400">Structure Builder</h3>
                  <p className="text-cyan-500/70 mt-2">Structure builder interface will be displayed here</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Database className="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-cyan-400">Results Analysis</h3>
                  <p className="text-cyan-500/70 mt-2">Analysis tools and visualizations will appear here</p>
                </div>
              </div>
            )}
          </HolographicPanel>
        </div>
      </div>
    </div>
  );
};