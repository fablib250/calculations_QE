import React from 'react';
import { ArrowRight, AlertTriangle, ThermometerSun, TrendingUp, Weight, Zap } from 'lucide-react';
import { Material } from '../../types/materials';

interface MaterialPropertyPanelProps {
  material: Material;
  simulationActive: boolean;
  environmentParams: {
    temperature: number;
    pressure: number;
    humidity: number;
  };
  isComparison?: boolean;
}

const MaterialPropertyPanel: React.FC<MaterialPropertyPanelProps> = ({ 
  material, 
  simulationActive, 
  environmentParams,
  isComparison = false
}) => {
  // Calculate current state properties based on environmental parameters
  const calculateCurrentProperties = () => {
    const baseProperties = material.properties || {};
    
    // Simple simulation calculations - in a real app these would be more complex physics models
    const tempRatio = environmentParams.temperature / 298; // Ratio to room temperature
    const pressureEffect = environmentParams.pressure / 101; // Ratio to standard pressure
    
    // Calculate modified properties
    const currentDensity = baseProperties.density * (1 - 0.01 * (tempRatio - 1)); // Density decreases with temperature
    const currentConductivity = baseProperties.thermalConductivity * tempRatio * 0.9; // Conductivity changes with temperature
    const currentStrength = baseProperties.tensileStrength * (1 - 0.05 * Math.max(0, tempRatio - 1)); // Strength decreases at high temps
    
    // Check if material would change state (solid/liquid/gas)
    let stateWarning = null;
    if (baseProperties.meltingPoint && environmentParams.temperature >= baseProperties.meltingPoint) {
      stateWarning = "Material is in liquid state at current temperature";
    }
    if (baseProperties.boilingPoint && environmentParams.temperature >= baseProperties.boilingPoint) {
      stateWarning = "Material is in gaseous state at current temperature";
    }
    
    return {
      density: currentDensity.toFixed(2),
      thermalConductivity: currentConductivity.toFixed(2),
      tensileStrength: currentStrength.toFixed(2),
      stateWarning
    };
  };
  
  const currentProperties = simulationActive ? calculateCurrentProperties() : null;
  
  // Get property color based on change (increase=green, decrease=red)
  const getPropertyChangeColor = (current: number, base: number) => {
    const percentChange = ((current - base) / base) * 100;
    if (percentChange > 1) return "text-green-400";
    if (percentChange < -1) return "text-red-400";
    return "text-gray-300";
  };

  const renderProperty = (name: string, value: any, unit: string, icon: React.ReactNode, simValue?: string) => {
    const baseValue = value || 'N/A';
    
    return (
      <div className="flex justify-between items-center p-3 border-b border-blue-500/10">
        <div className="flex items-center space-x-2">
          <div className="text-blue-400">
            {icon}
          </div>
          <span>{name}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-300">{baseValue} {unit}</span>
          
          {simulationActive && simValue && (
            <>
              <ArrowRight className="h-4 w-4 mx-2 text-gray-500" />
              <span className={getPropertyChangeColor(parseFloat(simValue), parseFloat(baseValue.toString()))}>
                {simValue} {unit}
              </span>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-blue-500/30">
        <h2 className="font-semibold">
          {isComparison ? 'Comparison Properties' : 'Material Properties'}
          {simulationActive && <span className="ml-2 text-sm text-orange-400">(Live Simulation)</span>}
        </h2>
      </div>
      
      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-gray-800">
        <div className="p-3 border-b border-blue-500/30 bg-gray-800/50">
          <h3 className="font-semibold text-blue-400">General Information</h3>
          <p className="text-sm text-gray-400 mt-1">{material.description || 'No description available.'}</p>
        </div>
        
        <div className="divide-y divide-blue-500/10">
          <div className="p-3 grid grid-cols-2 gap-3">
            <div>
              <span className="text-sm text-gray-400">Material ID</span>
              <p>{material.id}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Category</span>
              <p>{material.category}</p>
            </div>
          </div>
          
          {currentProperties?.stateWarning && (
            <div className="p-3 bg-red-900/20 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-red-300">{currentProperties.stateWarning}</span>
            </div>
          )}
          
          {/* Physical Properties */}
          <div className="divide-y divide-blue-500/10">
            <div className="p-3 bg-gray-800/50">
              <h3 className="font-semibold text-blue-400">Physical Properties</h3>
            </div>
            
            {renderProperty(
              "Density", 
              material.properties?.density, 
              "g/cm³", 
              <Weight className="h-4 w-4" />,
              currentProperties?.density
            )}
            
            {renderProperty(
              "Melting Point", 
              material.properties?.meltingPoint, 
              "K", 
              <ThermometerSun className="h-4 w-4" />
            )}
            
            {renderProperty(
              "Boiling Point", 
              material.properties?.boilingPoint, 
              "K", 
              <ThermometerSun className="h-4 w-4" />
            )}
          </div>
          
          {/* Thermal Properties */}
          <div className="divide-y divide-blue-500/10">
            <div className="p-3 bg-gray-800/50">
              <h3 className="font-semibold text-blue-400">Thermal Properties</h3>
            </div>
            
            {renderProperty(
              "Thermal Conductivity", 
              material.properties?.thermalConductivity, 
              "W/(m·K)", 
              <Zap className="h-4 w-4" />,
              currentProperties?.thermalConductivity
            )}
            
            {renderProperty(
              "Thermal Expansion", 
              material.properties?.thermalExpansion, 
              "10⁻⁶/K", 
              <TrendingUp className="h-4 w-4" />
            )}
          </div>
          
          {/* Mechanical Properties */}
          <div className="divide-y divide-blue-500/10">
            <div className="p-3 bg-gray-800/50">
              <h3 className="font-semibold text-blue-400">Mechanical Properties</h3>
            </div>
            
            {renderProperty(
              "Tensile Strength", 
              material.properties?.tensileStrength, 
              "MPa", 
              <TrendingUp className="h-4 w-4" />,
              currentProperties?.tensileStrength
            )}
            
            {renderProperty(
              "Young's Modulus", 
              material.properties?.youngsModulus, 
              "GPa", 
              <TrendingUp className="h-4 w-4" />
            )}
          </div>
          
          {/* Element Composition */}
          {material.composition && (
            <div className="divide-y divide-blue-500/10">
              <div className="p-3 bg-gray-800/50">
                <h3 className="font-semibold text-blue-400">Elemental Composition</h3>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(material.composition).map(([element, percentage]) => (
                    <div key={element} className="flex justify-between">
                      <span>{element}</span>
                      <span className="text-blue-300">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Applications */}
          {material.applications && (
            <div className="divide-y divide-blue-500/10">
              <div className="p-3 bg-gray-800/50">
                <h3 className="font-semibold text-blue-400">Common Applications</h3>
              </div>
              <div className="p-3">
                <ul className="list-disc list-inside space-y-1">
                  {material.applications.map((app, index) => (
                    <li key={index} className="text-gray-300">{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialPropertyPanel;