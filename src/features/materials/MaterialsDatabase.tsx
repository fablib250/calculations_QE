import React, { useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { Search, Filter, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { MaterialCard } from './MaterialCard';
import { materialsData } from '../../data/materialsData';
import { MaterialDetail } from './MaterialDetail';

export const MaterialsDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [expandedFilters, setExpandedFilters] = useState(false);
  
  const filteredMaterials = materialsData.filter(material => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'all', name: 'All Materials' },
    { id: 'metal', name: 'Metals & Alloys' },
    { id: 'polymer', name: 'Polymers' },
    { id: 'ceramic', name: 'Ceramics' },
    { id: 'composite', name: 'Composites' },
    { id: 'semiconductor', name: 'Semiconductors' },
  ];
  
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-cyan-300">Materials Database</h2>
        <p className="text-cyan-500/80 mt-1">Comprehensive information on engineering materials</p>
      </header>
      
      <HolographicPanel>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="lg:flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-cyan-800/50 rounded-md text-cyan-300 placeholder:text-cyan-700/50 focus:outline-none focus:border-cyan-600/70"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Category filters for desktop */}
          <div className="hidden lg:flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-3 py-2 text-sm rounded-md border ${
                  categoryFilter === category.id
                    ? 'bg-cyan-900/50 border-cyan-700/70 text-cyan-300'
                    : 'bg-black/30 border-cyan-900/30 text-cyan-500 hover:bg-black/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Filters toggle for mobile */}
          <button
            className="lg:hidden flex items-center justify-between px-3 py-2 bg-black/30 border border-cyan-800/50 rounded-md text-cyan-400"
            onClick={() => setExpandedFilters(!expandedFilters)}
          >
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              <span>Filters</span>
            </div>
            {expandedFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {/* Mobile filters */}
        {expandedFilters && (
          <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-3 py-2 text-sm rounded-md border ${
                  categoryFilter === category.id
                    ? 'bg-cyan-900/50 border-cyan-700/70 text-cyan-300'
                    : 'bg-black/30 border-cyan-900/30 text-cyan-500 hover:bg-black/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </HolographicPanel>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HolographicPanel 
            title={`Materials (${filteredMaterials.length})`}
            className="h-[600px] overflow-auto"
          >
            {filteredMaterials.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="text-cyan-500 mb-4">
                  <Layers className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-400">No materials found</h3>
                <p className="text-cyan-500/70 mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMaterials.map((material, index) => (
                  <MaterialCard 
                    key={index}
                    material={material}
                    onClick={() => setSelectedMaterial(material)}
                    isSelected={selectedMaterial?.id === material.id}
                  />
                ))}
              </div>
            )}
          </HolographicPanel>
        </div>
        
        <div>
          <MaterialDetail material={selectedMaterial} />
        </div>
      </div>
    </div>
  );
};