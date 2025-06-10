import React, { useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { ElementCard } from './ElementCard';
import { ElementDetail } from './ElementDetail';
import { periodicTableData } from '../../data/periodicTableData';
import { Filter, Search, Atom } from 'lucide-react';

export const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [colorBy, setColorBy] = useState<'category' | 'state' | 'electronegativity'>('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleElementClick = (element: any) => {
    setSelectedElement(element);
  };

  const filteredElements = periodicTableData.filter(element => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      element.name.toLowerCase().includes(searchLower) ||
      element.symbol.toLowerCase().includes(searchLower) ||
      element.number.toString().includes(searchLower) ||
      element.category?.toLowerCase().includes(searchLower)
    );
  });

  // Group elements by period and group for display
  const getElementPosition = (element: any) => {
    const gridRow = element.period;
    const gridColumn = element.group;
    
    // Handle special cases like lanthanides and actinides
    if (element.category === 'lanthanide') {
      return { gridRow: 8, gridColumn: element.number - 56 };
    }
    if (element.category === 'actinide') {
      return { gridRow: 9, gridColumn: element.number - 88 };
    }
    
    return { gridRow, gridColumn };
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Interactive Periodic Table</h2>
          <p className="text-cyan-500/80 mt-1">Explore elements and their properties</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md bg-cyan-900/30 border border-cyan-700/50 text-cyan-400 hover:bg-cyan-900/50"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {showSearch && (
              <div className="absolute right-0 top-12 w-64 bg-gray-900/95 border border-cyan-700/50 rounded-md p-3 z-50 backdrop-blur-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search elements..."
                  className="w-full bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300 placeholder:text-cyan-700/50"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 bg-black/30 rounded-md border border-cyan-800/50 p-2">
            <Filter className="w-4 h-4 text-cyan-500" />
            <select 
              value={colorBy}
              onChange={(e) => setColorBy(e.target.value as any)}
              className="bg-transparent border-none text-cyan-300 text-sm focus:outline-none"
            >
              <option value="category">Category</option>
              <option value="state">State</option>
              <option value="electronegativity">Electronegativity</option>
            </select>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HolographicPanel title="Periodic Table of Elements">
            <div className="overflow-auto">
              <div className="relative min-w-[1000px] h-[600px] p-6">
                {/* Period labels */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around text-center">
                  {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                    <div key={period} className="text-cyan-500/70 text-sm font-mono">{period}</div>
                  ))}
                </div>
                
                {/* Group labels */}
                <div className="absolute left-8 right-8 top-0 h-8 flex justify-around items-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
                    <div key={group} className="text-cyan-500/70 text-sm font-mono">{group}</div>
                  ))}
                </div>

                {/* Elements grid */}
                <div className="absolute left-8 top-8">
                  {filteredElements.map((element) => {
                    const { gridRow, gridColumn } = getElementPosition(element);
                    const top = (gridRow - 1) * 64 + (gridRow > 7 ? 32 : 0);
                    const left = (gridColumn - 1) * 64;
                    
                    return (
                      <div
                        key={element.symbol}
                        style={{
                          position: 'absolute',
                          top: `${top}px`,
                          left: `${left}px`,
                          width: '60px',
                          height: '60px',
                        }}
                      >
                        <ElementCard
                          element={element}
                          colorBy={colorBy}
                          onClick={() => handleElementClick(element)}
                          isSelected={selectedElement?.symbol === element.symbol}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Lanthanides and Actinides labels */}
                <div className="absolute left-8 top-[520px] text-cyan-500/70 text-xs">
                  <div className="mb-16">Lanthanides</div>
                  <div>Actinides</div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-6 border-t border-cyan-900/50 pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colorBy === 'category' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-red-500/20 to-red-700/10 border border-red-700/30"></div>
                      <span className="text-xs text-cyan-400">Alkali Metals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500/20 to-orange-700/10 border border-orange-700/30"></div>
                      <span className="text-xs text-cyan-400">Alkaline Earth</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 border border-yellow-700/30"></div>
                      <span className="text-xs text-cyan-400">Transition Metals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500/20 to-green-700/10 border border-green-700/30"></div>
                      <span className="text-xs text-cyan-400">Post-Transition</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-teal-500/20 to-teal-700/10 border border-teal-700/30"></div>
                      <span className="text-xs text-cyan-400">Metalloids</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-700/30"></div>
                      <span className="text-xs text-cyan-400">Nonmetals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-500/20 to-indigo-700/10 border border-indigo-700/30"></div>
                      <span className="text-xs text-cyan-400">Halogens</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500/20 to-purple-700/10 border border-purple-700/30"></div>
                      <span className="text-xs text-cyan-400">Noble Gases</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-pink-500/20 to-pink-700/10 border border-pink-700/30"></div>
                      <span className="text-xs text-cyan-400">Lanthanides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-rose-500/20 to-rose-700/10 border border-rose-700/30"></div>
                      <span className="text-xs text-cyan-400">Actinides</span>
                    </div>
                  </>
                )}
                
                {colorBy === 'state' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-red-500/20 to-red-700/10 border border-red-700/30"></div>
                      <span className="text-xs text-cyan-400">Gas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-700/30"></div>
                      <span className="text-xs text-cyan-400">Liquid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500/20 to-green-700/10 border border-green-700/30"></div>
                      <span className="text-xs text-cyan-400">Solid</span>
                    </div>
                  </>
                )}
                
                {colorBy === 'electronegativity' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-900/20 to-blue-700/10 border border-blue-900/30"></div>
                      <span className="text-xs text-cyan-400">{"< 1.0"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-700/30"></div>
                      <span className="text-xs text-cyan-400">1.0 - 2.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500/20 to-green-700/10 border border-green-700/30"></div>
                      <span className="text-xs text-cyan-400">2.0 - 3.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 border border-yellow-700/30"></div>
                      <span className="text-xs text-cyan-400">3.0 - 4.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-red-500/20 to-red-700/10 border border-red-700/30"></div>
                      <span className="text-xs text-cyan-400">{"> 4.0"}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </HolographicPanel>
        </div>
        
        <div className="xl:col-span-1">
          <ElementDetail element={selectedElement} />
        </div>
      </div>
    </div>
  );
};