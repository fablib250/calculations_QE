import React, { useEffect, useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';

interface ElementDetailProps {
  element: any;
}

export const ElementDetail: React.FC<ElementDetailProps> = ({ element }) => {
  const [activeTab, setActiveTab] = useState('properties');
  
  useEffect(() => {
    if (element) {
      setActiveTab('properties');
    }
  }, [element]);
  
  if (!element) {
    return (
      <HolographicPanel title="Element Details">
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="text-cyan-400 mb-4">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-cyan-500/80">No element selected</p>
          <p className="text-cyan-500/60 text-sm mt-2">Click on an element in the periodic table to view its details</p>
        </div>
      </HolographicPanel>
    );
  }
  
  return (
    <HolographicPanel title={`${element.name} (${element.symbol})`} glowColor={activeTab === 'applications' ? 'green' : activeTab === 'history' ? 'purple' : 'cyan'}>
      <div className="flex flex-col h-full">
        {/* Element summary */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-md flex items-center justify-center border border-gray-700/50 text-center
            ${element.category === 'nonmetal' ? 'bg-blue-900/50' : 
               element.category === 'noble gas' ? 'bg-purple-900/50' : 
               element.category === 'alkali metal' ? 'bg-red-900/50' : 
               element.category === 'alkaline earth metal' ? 'bg-orange-900/50' : 
               element.category === 'metalloid' ? 'bg-teal-900/50' : 
               element.category === 'halogen' ? 'bg-indigo-900/50' : 
               element.category === 'post-transition metal' ? 'bg-green-900/50' : 
               element.category === 'transition metal' ? 'bg-yellow-900/50' : 
               element.category === 'lanthanide' ? 'bg-pink-900/50' : 
               element.category === 'actinide' ? 'bg-rose-900/50' : 'bg-gray-900/50'
            }`}
          >
            <div>
              <div className="text-xs text-cyan-500/80">{element.number}</div>
              <div className="text-xl font-bold text-cyan-300">{element.symbol}</div>
              <div className="text-[10px] text-cyan-400/70">{element.atomic_mass?.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-cyan-300">{element.name}</h3>
            <div className="text-sm text-cyan-400">{element.category}</div>
            <div className="text-xs text-cyan-500/70 mt-1">{element.electron_configuration}</div>
          </div>
        </div>
        
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
            className={`px-4 py-2 text-sm ${activeTab === 'history' ? 'text-cyan-300 border-b-2 border-cyan-500' : 'text-cyan-500/70 hover:text-cyan-400'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
        
        {/* Tab content */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'properties' && (
            <div className="space-y-3">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Atomic Number</td>
                    <td className="py-1 text-cyan-300 text-right">{element.number}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Atomic Mass</td>
                    <td className="py-1 text-cyan-300 text-right">{element.atomic_mass?.toFixed(4)} u</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Period</td>
                    <td className="py-1 text-cyan-300 text-right">{element.period}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Group</td>
                    <td className="py-1 text-cyan-300 text-right">{element.group || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Phase</td>
                    <td className="py-1 text-cyan-300 text-right">{element.phase || 'Unknown'}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Density</td>
                    <td className="py-1 text-cyan-300 text-right">{element.density ? `${element.density} g/cm³` : 'Unknown'}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Melting Point</td>
                    <td className="py-1 text-cyan-300 text-right">{element.melt ? `${element.melt} K` : 'Unknown'}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Boiling Point</td>
                    <td className="py-1 text-cyan-300 text-right">{element.boil ? `${element.boil} K` : 'Unknown'}</td>
                  </tr>
                  <tr className="border-b border-cyan-900/30">
                    <td className="py-1 text-cyan-500/70">Electronegativity</td>
                    <td className="py-1 text-cyan-300 text-right">{element.electronegativity || 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-cyan-500/70">Electron Configuration</td>
                    <td className="py-1 text-cyan-300 text-right">{element.electron_configuration}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-cyan-400 mb-1">Electron Shell</h4>
                <div className="flex space-x-2">
                  {element.shells?.map((shell: number, index: number) => (
                    <div key={index} className="w-8 h-8 rounded-full border border-cyan-700/50 flex items-center justify-center text-xs text-cyan-300 bg-black/30">
                      {shell}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'applications' && (
            <div className="space-y-3">
              <p className="text-cyan-400/90">Common applications and uses of {element.name}:</p>
              
              <div className="bg-black/20 p-3 rounded-md border border-green-900/50 space-y-2">
                {element.category === 'transition metal' && (
                  <>
                    <div className="text-sm text-green-300 font-semibold">Industrial Applications</div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-cyan-400/80">
                      <li>Used in alloys for construction and manufacturing</li>
                      <li>Catalyst in chemical reactions and industrial processes</li>
                      <li>Component in high-strength structural materials</li>
                    </ul>
                  </>
                )}
                
                {element.category === 'nonmetal' && (
                  <>
                    <div className="text-sm text-green-300 font-semibold">Scientific Applications</div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-cyan-400/80">
                      <li>Essential component in various chemical compounds</li>
                      <li>Used in laboratory reagents and experiments</li>
                      <li>Critical element in biological processes</li>
                    </ul>
                  </>
                )}
                
                {element.category === 'noble gas' && (
                  <>
                    <div className="text-sm text-green-300 font-semibold">Specialized Applications</div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-cyan-400/80">
                      <li>Used in lighting and display technologies</li>
                      <li>Cryogenic applications and cooling systems</li>
                      <li>Protective atmospheres for sensitive materials</li>
                    </ul>
                  </>
                )}
                
                {element.category === 'alkali metal' && (
                  <>
                    <div className="text-sm text-green-300 font-semibold">Energy Applications</div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-cyan-400/80">
                      <li>Battery and energy storage technologies</li>
                      <li>Heat transfer media in certain systems</li>
                      <li>Component in specialized alloys</li>
                    </ul>
                  </>
                )}
                
                {(element.category !== 'transition metal' && element.category !== 'nonmetal' && 
                  element.category !== 'noble gas' && element.category !== 'alkali metal') && (
                  <>
                    <div className="text-sm text-green-300 font-semibold">General Applications</div>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-cyan-400/80">
                      <li>Component in various industrial processes</li>
                      <li>Used in specific technical applications</li>
                      <li>Research and experimental purposes</li>
                    </ul>
                  </>
                )}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">Material Properties</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/20 p-2 rounded border border-green-900/30">
                    <div className="text-xs text-green-400">Conductivity</div>
                    <div className="text-sm text-cyan-300">
                      {element.category === 'metal' || element.category === 'transition metal' || 
                       element.category === 'alkali metal' || element.category === 'alkaline earth metal' ? 
                        'High' : element.category === 'metalloid' ? 'Moderate' : 'Low'}
                    </div>
                  </div>
                  <div className="bg-black/20 p-2 rounded border border-green-900/30">
                    <div className="text-xs text-green-400">Reactivity</div>
                    <div className="text-sm text-cyan-300">
                      {element.category === 'alkali metal' || element.category === 'halogen' ? 
                        'High' : element.category === 'noble gas' ? 'Very Low' : 'Moderate'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded-md border border-purple-900/50">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Discovery</h4>
                <div className="space-y-2 text-sm text-cyan-400/80">
                  <p>
                    {element.name} (symbol: {element.symbol}) was discovered in 
                    {element.year_discovered ? ` ${element.year_discovered}` : ' ancient times'}.
                  </p>
                  
                  {element.named_by && (
                    <p>Named by: {element.named_by}</p>
                  )}
                  
                  <p>
                    The element was named 
                    {element.name_origin ? ` after ${element.name_origin}` : ' based on its properties'}.
                  </p>
                </div>
              </div>
              
              <div className="mt-3 bg-black/20 p-3 rounded-md border border-purple-900/50">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Historical Significance</h4>
                <div className="space-y-2 text-sm text-cyan-400/80">
                  {element.category === 'transition metal' && (
                    <p>This transition metal has played a significant role in industrial development, contributing to advances in metallurgy and material science.</p>
                  )}
                  
                  {element.category === 'nonmetal' && (
                    <p>As a nonmetal, this element has been fundamental to the development of chemistry and has applications across numerous scientific fields.</p>
                  )}
                  
                  {element.category === 'noble gas' && (
                    <p>The discovery of this noble gas helped scientists understand atomic structure and the concept of electron shells and chemical inertness.</p>
                  )}
                  
                  {(element.category !== 'transition metal' && element.category !== 'nonmetal' && element.category !== 'noble gas') && (
                    <p>This element has contributed to our understanding of periodic trends and chemical properties, helping to establish the modern periodic table.</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-cyan-400">Timeline</h4>
                <div className="mt-2 relative border-l-2 border-purple-900/50 pl-4 space-y-3">
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="text-xs text-purple-400">Discovery</div>
                    <div className="text-sm text-cyan-300">
                      {element.year_discovered ? element.year_discovered : 'Ancient times'}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="text-xs text-purple-400">Classification</div>
                    <div className="text-sm text-cyan-300">
                      Identified as a {element.category}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="text-xs text-purple-400">Modern Understanding</div>
                    <div className="text-sm text-cyan-300">
                      Electron configuration: {element.electron_configuration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </HolographicPanel>
  );
};