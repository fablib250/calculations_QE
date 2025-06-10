import React from 'react';
import { Play, Pause, RotateCcw, Settings, Thermometer, Gauge, Droplets } from 'lucide-react';
import { Material } from '../../types/materials';

interface SimulationControlsProps {
  environmentParams: {
    temperature: number;
    pressure: number;
    humidity: number;
  };
  updateParams: (params: { temperature: number; pressure: number; humidity: number }) => void;
  simulationActive: boolean;
  selectedMaterial: Material | null;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  environmentParams,
  updateParams,
  simulationActive,
  selectedMaterial
}) => {
  const handleParamChange = (param: keyof typeof environmentParams, value: number) => {
    updateParams({
      ...environmentParams,
      [param]: value
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-blue-500/30">
        <h2 className="font-semibold flex items-center">
          <Settings className="h-4 w-4 mr-2 text-blue-400" />
          Simulation Controls
        </h2>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Environment Parameters */}
        <div className="space-y-4">
          <h3 className="font-medium text-blue-400">Environment Parameters</h3>
          
          <div className="space-y-3">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Thermometer className="h-4 w-4 mr-2 text-orange-400" />
                Temperature: {environmentParams.temperature} K
              </label>
              <input
                type="range"
                min="77"
                max="2000"
                value={environmentParams.temperature}
                onChange={(e) => handleParamChange('temperature', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>77K (Liquid N₂)</span>
                <span>2000K (High Temp)</span>
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Gauge className="h-4 w-4 mr-2 text-green-400" />
                Pressure: {environmentParams.pressure} kPa
              </label>
              <input
                type="range"
                min="0.1"
                max="1000"
                value={environmentParams.pressure}
                onChange={(e) => handleParamChange('pressure', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.1 kPa (Vacuum)</span>
                <span>1000 kPa (High Pressure)</span>
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                Humidity: {environmentParams.humidity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={environmentParams.humidity}
                onChange={(e) => handleParamChange('humidity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0% (Dry)</span>
                <span>100% (Saturated)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Material Status */}
        {selectedMaterial && (
          <div className="space-y-3">
            <h3 className="font-medium text-blue-400">Material Status</h3>
            <div className="bg-gray-900 p-3 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Material:</span>
                <span className="text-white">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{selectedMaterial.category}</span>
              </div>
              {selectedMaterial.properties?.meltingPoint && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Melting Point:</span>
                  <span className={`${
                    environmentParams.temperature >= selectedMaterial.properties.meltingPoint 
                      ? 'text-red-400' 
                      : 'text-white'
                  }`}>
                    {selectedMaterial.properties.meltingPoint} K
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Simulation Status */}
        <div className="space-y-3">
          <h3 className="font-medium text-blue-400">Simulation Status</h3>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`flex items-center ${simulationActive ? 'text-green-400' : 'text-gray-400'}`}>
                {simulationActive ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Running
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    Stopped
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Presets */}
        <div className="space-y-3">
          <h3 className="font-medium text-blue-400">Quick Presets</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => updateParams({ temperature: 298, pressure: 101, humidity: 50 })}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
            >
              Room Temperature (298K)
            </button>
            <button
              onClick={() => updateParams({ temperature: 77, pressure: 101, humidity: 0 })}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
            >
              Liquid Nitrogen (77K)
            </button>
            <button
              onClick={() => updateParams({ temperature: 1273, pressure: 101, humidity: 0 })}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
            >
              High Temperature (1273K)
            </button>
            <button
              onClick={() => updateParams({ temperature: 298, pressure: 0.1, humidity: 0 })}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors"
            >
              Vacuum Conditions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;