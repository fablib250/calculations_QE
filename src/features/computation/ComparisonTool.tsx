import React from 'react';
import { ArrowLeftRight, ChevronRight, BarChart3 } from 'lucide-react';
import { Material } from '../../types/materials';

interface ComparisonToolProps {
  materialA: Material | null;
  materialB: Material | null;
  onClose: () => void;
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ materialA, materialB, onClose }) => {
  // Helper function to compare properties and return a visualization
  const getComparisonIndicator = (valueA: number | undefined, valueB: number | undefined) => {
    if (valueA === undefined || valueB === undefined) return null;
    
    const diff = ((valueB - valueA) / valueA) * 100;
    
    if (Math.abs(diff) < 1) {
      // Values are nearly identical
      return <span className="text-gray-400">≈</span>;
    }
    
    if (diff > 0) {
      // B is higher than A
      return (
        <span className="text-green-400 flex items-center">
          <ChevronRight className="h-4 w-4 transform rotate-90" />
          {diff.toFixed(0)}%
        </span>
      );
    } else {
      // A is higher than B
      return (
        <span className="text-red-400 flex items-center">
          <ChevronRight className="h-4 w-4 transform -rotate-90" />
          {Math.abs(diff).toFixed(0)}%
        </span>
      );
    }
  };
  
  // Render comparison bar
  const renderComparisonBar = (labelA: string, valueA: number | undefined, valueB: number | undefined, max: number, unit: string) => {
    if (valueA === undefined || valueB === undefined) {
      return <div className="text-gray-500">Insufficient data for comparison</div>;
    }
    
    const percentA = (valueA / max) * 100;
    const percentB = (valueB / max) * 100;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{labelA}</span>
          <span>{unit}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-6 bg-gray-800 rounded-md overflow-hidden relative">
            <div 
              className="h-full bg-blue-500 absolute left-0 top-0"
              style={{ width: `${percentA}%` }}
            />
            <div 
              className="h-full bg-orange-500 absolute left-0 top-0"
              style={{ width: `${percentB}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-white">
              <span>{valueA}</span>
              <span>{valueB}</span>
            </div>
          </div>
          <div className="w-10 text-xs">
            {getComparisonIndicator(valueA, valueB)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{materialA?.name}</span>
          <span>{materialB?.name}</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
      <div className="p-3 border-b border-blue-500/30 flex justify-between items-center">
        <h2 className="font-semibold flex items-center">
          <ArrowLeftRight className="h-4 w-4 mr-2 text-blue-400" />
          Material Comparison
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200"
        >
          &times;
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1">
        {!materialA || !materialB ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-400">
              {!materialA && !materialB
                ? 'Select two materials to compare'
                : !materialA
                ? 'Select first material to compare'
                : 'Select second material to compare'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-blue-400">A</span>
                </div>
                <h3 className="font-medium">{materialA.name}</h3>
                <p className="text-sm text-gray-400">{materialA.category}</p>
              </div>
              
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-gray-600" />
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-orange-400">B</span>
                </div>
                <h3 className="font-medium">{materialB.name}</h3>
                <p className="text-sm text-gray-400">{materialB.category}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-blue-400 border-b border-blue-500/30 pb-2">Physical Properties</h3>
              
              {renderComparisonBar(
                'Density', 
                materialA.properties?.density, 
                materialB.properties?.density,
                Math.max(
                  materialA.properties?.density || 0,
                  materialB.properties?.density || 0
                ) * 1.2,
                'g/cm³'
              )}
              
              {renderComparisonBar(
                'Melting Point', 
                materialA.properties?.meltingPoint, 
                materialB.properties?.meltingPoint,
                Math.max(
                  materialA.properties?.meltingPoint || 0,
                  materialB.properties?.meltingPoint || 0
                ) * 1.2,
                'K'
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-blue-400 border-b border-blue-500/30 pb-2">Thermal Properties</h3>
              
              {renderComparisonBar(
                'Thermal Conductivity', 
                materialA.properties?.thermalConductivity, 
                materialB.properties?.thermalConductivity,
                Math.max(
                  materialA.properties?.thermalConductivity || 0,
                  materialB.properties?.thermalConductivity || 0
                ) * 1.2,
                'W/(m·K)'
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-blue-400 border-b border-blue-500/30 pb-2">Mechanical Properties</h3>
              
              {renderComparisonBar(
                'Tensile Strength', 
                materialA.properties?.tensileStrength, 
                materialB.properties?.tensileStrength,
                Math.max(
                  materialA.properties?.tensileStrength || 0,
                  materialB.properties?.tensileStrength || 0
                ) * 1.2,
                'MPa'
              )}
            </div>
            
            {/* Comparison summary */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <h3 className="font-medium text-blue-400 mb-2">Key Differences</h3>
              <ul className="space-y-2 text-sm">
                {materialA.properties?.density && materialB.properties?.density && (
                  <li>
                    <span className="text-orange-400">{materialB.name}</span> is 
                    {materialB.properties.density > materialA.properties.density ? ' denser than ' : ' less dense than '}
                    <span className="text-blue-400">{materialA.name}</span> by 
                    {' ' + Math.abs(((materialB.properties.density - materialA.properties.density) / materialA.properties.density) * 100).toFixed(1)}%.
                  </li>
                )}
                
                {materialA.properties?.thermalConductivity && materialB.properties?.thermalConductivity && (
                  <li>
                    <span className="text-orange-400">{materialB.name}</span> 
                    {materialB.properties.thermalConductivity > materialA.properties.thermalConductivity ? ' conducts heat better than ' : ' conducts heat worse than '}
                    <span className="text-blue-400">{materialA.name}</span>.
                  </li>
                )}
                
                {materialA.properties?.tensileStrength && materialB.properties?.tensileStrength && (
                  <li>
                    <span className="text-orange-400">{materialB.name}</span> has 
                    {materialB.properties.tensileStrength > materialA.properties.tensileStrength ? ' higher ' : ' lower '}
                    tensile strength than <span className="text-blue-400">{materialA.name}</span>.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTool;