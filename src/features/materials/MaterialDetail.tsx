import React, { useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { Layers, ChevronRight, BarChart, PlusSquare, Minus, Info } from 'lucide-react';

interface MaterialDetailProps {
  material: any;
}

export const MaterialDetail: React.FC<MaterialDetailProps> = ({ material }) => {
  const [activeTab, setActiveTab] = useState('properties');
  
  const getCategoryColor = () => {
    if (!material) return 'cyan';
    
    switch (material.category) {
      case 'metal': return 'blue';
      case 'polymer': return 'green';
      case 'ceramic': return 'orange';
      case 'composite': return 'purple';
      case 'semiconductor': return 'purple';
      default: return 'cyan';
    }
  };
  
  if (!material) {
    return (
      <HolographicPanel title="Material Details" className="h-[600px]">
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <Layers className="w-16 h-16 text-cyan-500/50 mb-4" />
          <h3 className="text-lg font-semibold text-cyan-400">No Material Selected</h3>
          <p className="text-cyan-500/70 mt-2">Select a material from the list to view detailed information</p>
        </div>
      </HolographicPanel>
    );
  }
  
  return (
    <HolographicPanel 
      title={material.name} 
      className="h-[600px] flex flex-col"
      glowColor={getCategoryColor()}
    >
      {/* Tabs */}
      <div className="flex border-b border-cyan-900/50 mb-4">
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'properties' ? 'text-cyan-300 border-b-2 border-cyan-500' : 'text-cyan-500/70 hover:text-cyan-400'}`}
          onClick={() => setActiveTab('properties')}
        >
          Properties
        </button>
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'applications' ? 'text-cyan-300 border-b-2 border-cyan-500' : 'text-cyan-500/70 hover:text-cyan-400'}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'composition' ? 'text-cyan-300 border-b-2 border-cyan-500' : 'text-cyan-500/70 hover:text-cyan-400'}`}
          onClick={() => setActiveTab('composition')}
        >
          Composition
        </button>
      </div>
      
      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeTab === 'properties' && (
          <div className="space-y-4">
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Physical Properties</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyan-500/70">Density:</span>
                  <span className="text-cyan-300">{material.properties.density}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500/70">Melting Point:</span>
                  <span className="text-cyan-300">{material.properties.meltingPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500/70">Thermal Conductivity:</span>
                  <span className="text-cyan-300">{material.properties.thermalConductivity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500/70">Electrical Resistivity:</span>
                  <span className="text-cyan-300">{material.properties.electricalResistivity}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Mechanical Properties</h4>
              <div className="space-y-3">
                {material.properties.mechanical.map((prop: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cyan-500/70">{prop.name}:</span>
                      <span className="text-cyan-300">{prop.value}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${prop.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Chemical Properties</h4>
              <div className="space-y-2 text-sm">
                {material.properties.chemical.map((prop: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-cyan-400">{prop.name}: </span>
                      <span className="text-cyan-300">{prop.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Primary Applications</h4>
              <div className="space-y-2">
                {material.applications.primary.map((app: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <PlusSquare className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0 mr-2" />
                    <span className="text-sm text-cyan-300">{app}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Industry Sectors</h4>
              <div className="grid grid-cols-2 gap-2">
                {material.applications.industries.map((industry: string, index: number) => (
                  <div key={index} className="flex items-center bg-cyan-900/20 rounded-md py-1 px-2 text-sm">
                    <BarChart className="w-3 h-3 text-cyan-500 mr-1.5" />
                    <span className="text-cyan-300">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Limitations</h4>
              <div className="space-y-2">
                {material.applications.limitations.map((limit: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Minus className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0 mr-2" />
                    <span className="text-sm text-cyan-300">{limit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'composition' && (
          <div className="space-y-4">
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Chemical Composition</h4>
              {material.composition ? (
                <div className="space-y-3">
                  {material.composition.elements && (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-cyan-900/30">
                          <th className="py-1 text-left text-cyan-500/70">Element</th>
                          <th className="py-1 text-right text-cyan-500/70">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {material.composition.elements.map((element: any, index: number) => (
                          <tr key={index} className="border-b border-cyan-900/20">
                            <td className="py-1 text-cyan-300">{element.name} ({element.symbol})</td>
                            <td className="py-1 text-cyan-300 text-right">{element.percentage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  
                  {material.composition.structure && (
                    <div className="mt-3">
                      <h5 className="text-sm text-cyan-400 mb-1">Structure</h5>
                      <p className="text-sm text-cyan-300">{material.composition.structure}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-start bg-black/30 p-2 rounded-md">
                  <Info className="w-4 h-4 text-cyan-500 mt-0.5 mr-2" />
                  <p className="text-sm text-cyan-400">Detailed composition data not available for this material.</p>
                </div>
              )}
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Manufacturing Process</h4>
              {material.manufacturing ? (
                <div className="space-y-2 text-sm">
                  {material.manufacturing.map((process: any, index: number) => (
                    <div key={index} className="mb-2">
                      <h5 className="text-cyan-400">{process.name}</h5>
                      <p className="text-cyan-300 mt-1">{process.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start bg-black/30 p-2 rounded-md">
                  <Info className="w-4 h-4 text-cyan-500 mt-0.5 mr-2" />
                  <p className="text-sm text-cyan-400">Manufacturing process details not available.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </HolographicPanel>
  );
};