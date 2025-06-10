import React, { useState } from 'react';
import { Calculator, ChevronRight, DownloadCloud, Search, ArrowLeftRight, Zap, Atom, Upload } from 'lucide-react';
import MaterialVisualizer from './MaterialVisualizer';
import MaterialPropertyPanel from './MaterialPropertyPanel';
import SimulationControls from './SimulationControls';
import ComparisonTool from './ComparisonTool';
import QEFileUploader from './QEFileUploader';
import GitHubUploader from './GitHubUploader';
import { Material } from '../../types/materials';
import { materials } from '../../data/materialsData';

const MaterialsComputationLayout: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [comparisonMaterial, setComparisonMaterial] = useState<Material | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulationActive, setSimulationActive] = useState(false);
  const [qeFileContent, setQEFileContent] = useState<string | null>(null);
  const [qeFileName, setQEFileName] = useState<string>('');
  const [environmentParams, setEnvironmentParams] = useState({
    temperature: 298,
    pressure: 101,
    humidity: 50,
  });

  const filteredMaterials = materials.filter(
    material => material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material);
  };

  const handleComparisonSelect = (material: Material) => {
    setComparisonMaterial(material);
  };

  const toggleComparison = () => {
    setIsComparing(!isComparing);
  };

  const handleFileUpload = (content: string, fileName: string) => {
    setQEFileContent(content);
    setQEFileName(fileName);
  };

  const startSimulation = () => {
    setSimulationActive(true);
  };

  const stopSimulation = () => {
    setSimulationActive(false);
  };

  const updateEnvironmentParams = (params: typeof environmentParams) => {
    setEnvironmentParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Header with Material Science Agent branding */}
      <header className="relative border-b border-blue-500/30 bg-gray-900 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Atom className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
              Material Science <span className="text-orange-400">Agent</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleComparison}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border transition-all duration-300 ${
                isComparing 
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                  : 'bg-gray-800 border-blue-500/30 hover:bg-gray-700'
              }`}
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span>{isComparing ? 'Exit Comparison' : 'Compare Materials'}</span>
            </button>
            
            <button 
              onClick={simulationActive ? stopSimulation : startSimulation}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border transition-all duration-300 ${
                simulationActive 
                  ? 'bg-red-500/20 border-red-500 text-red-400' 
                  : 'bg-green-500/20 border-green-500 text-green-400'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>{simulationActive ? 'Stop Simulation' : 'Start Simulation'}</span>
            </button>
          </div>
        </div>
        
        <div className="max-w-md mx-auto mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-blue-500/30 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute left-3 top-2.5">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-9rem)]">
        {/* Materials selection sidebar */}
        <div className="col-span-3 bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-blue-500/30 bg-gray-900">
            <h2 className="font-semibold flex items-center">
              <Calculator className="h-4 w-4 mr-2 text-orange-400" />
              Materials Database
            </h2>
          </div>
          
          <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-gray-800">
            {filteredMaterials.length === 0 ? (
              <p className="text-gray-400 p-4 text-center">No materials found</p>
            ) : (
              <ul className="divide-y divide-blue-500/10">
                {filteredMaterials.map((material) => (
                  <li 
                    key={material.id}
                    onClick={() => isComparing ? handleComparisonSelect(material) : handleMaterialSelect(material)}
                    className={`p-3 cursor-pointer transition-all duration-200 hover:bg-gray-700 flex justify-between items-center ${
                      (selectedMaterial?.id === material.id || comparisonMaterial?.id === material.id) 
                        ? 'bg-blue-500/20 border-l-4 border-blue-500' 
                        : ''
                    }`}
                  >
                    <div>
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-gray-400">{material.category}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-blue-400" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* QE File Upload Section */}
          <div className="border-t border-blue-500/30">
            <QEFileUploader 
              onFileUpload={(content) => handleFileUpload(content, 'simulation.in')} 
            />
            {qeFileContent && (
              <GitHubUploader 
                fileContent={qeFileContent} 
                fileName={qeFileName} 
              />
            )}
          </div>
        </div>
        
        {/* Main content area */}
        <div className={`${isComparing ? 'col-span-4' : 'col-span-9'} grid grid-rows-2 gap-4`}>
          {/* 3D Visualization */}
          <div className="bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
            {selectedMaterial ? (
              <MaterialVisualizer 
                material={selectedMaterial} 
                simulationActive={simulationActive}
                environmentParams={environmentParams}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Select a material to visualize</p>
              </div>
            )}
          </div>
          
          {/* Properties and data */}
          <div className="bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
            {selectedMaterial ? (
              <MaterialPropertyPanel 
                material={selectedMaterial}
                simulationActive={simulationActive}
                environmentParams={environmentParams}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Select a material to view properties</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Comparison view or controls based on mode */}
        {isComparing ? (
          <div className="col-span-5 grid grid-rows-2 gap-4">
            <div className="bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
              {comparisonMaterial ? (
                <MaterialVisualizer 
                  material={comparisonMaterial} 
                  simulationActive={simulationActive}
                  environmentParams={environmentParams}
                  isComparison
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Select a second material to compare</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
              {comparisonMaterial ? (
                <MaterialPropertyPanel 
                  material={comparisonMaterial}
                  simulationActive={simulationActive}
                  environmentParams={environmentParams}
                  isComparison
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Select a second material to compare properties</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-9 md:col-span-5 lg:col-span-3 bg-gray-800 rounded-lg border border-blue-500/30 overflow-hidden">
            <SimulationControls 
              environmentParams={environmentParams}
              updateParams={updateEnvironmentParams}
              simulationActive={simulationActive}
              selectedMaterial={selectedMaterial}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsComputationLayout;