import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Editor from '@monaco-editor/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FileText, Play, Save, RefreshCw, Upload, GitBranch } from 'lucide-react';
import { CalculationResult, RelaxationStep } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const QuantumWorkflow: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('scf.in');
  const [files, setFiles] = useState({
    'scf.in': `&CONTROL
  calculation = 'scf',
  prefix = 'material',
  outdir = './tmp',
  pseudo_dir = './pseudo',
/
&SYSTEM
  ibrav = 2, celldm(1) = 10.2,
  nat = 1, ntyp = 1,
  ecutwfc = 40.0,
/
&ELECTRONS
  conv_thr = 1.0d-8,
/
ATOMIC_SPECIES
  Si 28.0855 Si.pz-vbc.UPF
ATOMIC_POSITIONS
  Si 0.0 0.0 0.0
K_POINTS automatic
  4 4 4 1 1 1`,
    'relax.in': `&CONTROL
  calculation = 'relax',
  prefix = 'material',
  outdir = './tmp',
  pseudo_dir = './pseudo',
/
&SYSTEM
  ibrav = 2, celldm(1) = 10.2,
  nat = 1, ntyp = 1,
  ecutwfc = 40.0,
/
&ELECTRONS
  conv_thr = 1.0d-8,
/
&IONS
  ion_dynamics = 'bfgs',
/
ATOMIC_SPECIES
  Si 28.0855 Si.pz-vbc.UPF
ATOMIC_POSITIONS
  Si 0.0 0.0 0.0
K_POINTS automatic
  4 4 4 1 1 1`,
    'bands.in': `&CONTROL
  calculation = 'bands',
  prefix = 'material',
  outdir = './tmp',
  pseudo_dir = './pseudo',
/
&SYSTEM
  ibrav = 2, celldm(1) = 10.2,
  nat = 1, ntyp = 1,
  ecutwfc = 40.0,
/
&ELECTRONS
  conv_thr = 1.0d-8,
/
ATOMIC_SPECIES
  Si 28.0855 Si.pz-vbc.UPF
ATOMIC_POSITIONS
  Si 0.0 0.0 0.0
K_POINTS crystal_b
6
0.0 0.0 0.0  10 ! Γ
0.5 0.0 0.0  10 ! X
0.5 0.5 0.0  10 ! M`,
    'plot.py': `import numpy as np
import matplotlib.pyplot as plt

# Load band structure data
data = np.loadtxt('bands.dat.gnu')
k = data[:,0]
E = data[:,1]

# Plot band structure
plt.figure(figsize=(10, 6))
plt.plot(k, E, 'b-', linewidth=1)
plt.xlabel('k-point')
plt.ylabel('Energy (eV)')
plt.axhline(0, color='k', linestyle='--', alpha=0.5)
plt.title('Electronic Band Structure')
plt.grid(True, alpha=0.3)
plt.show()`
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResults, setCalculationResults] = useState<CalculationResult[]>([]);
  const [relaxationSteps, setRelaxationSteps] = useState<RelaxationStep[]>([]);
  const [calculationName, setCalculationName] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setFiles(prev => ({
          ...prev,
          [file.name]: content
        }));
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.in', '.py', '.out', '.dat']
    }
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFiles(prev => ({
        ...prev,
        [activeFile]: value
      }));
    }
  };

  const startCalculation = () => {
    setIsCalculating(true);
    setCalculationResults([]);
    setRelaxationSteps([]);
    
    // Simulate calculation progress
    let step = 0;
    const interval = setInterval(() => {
      if (step < 20) {
        const newResult: CalculationResult = {
          step: step + 1,
          totalEnergy: -100 - Math.random() * 5,
          kineticEnergy: 50 + Math.random() * 2,
          convergence: Math.exp(-step/3),
          forces: [Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1]
        };
        
        const newRelaxStep: RelaxationStep = {
          step: step + 1,
          energy: -100 - Math.random() * 2,
          maxForce: 0.5 * Math.exp(-step/4),
          avgForce: 0.3 * Math.exp(-step/4)
        };

        setCalculationResults(prev => [...prev, newResult]);
        setRelaxationSteps(prev => [...prev, newRelaxStep]);
        step++;
      } else {
        clearInterval(interval);
        setIsCalculating(false);
      }
    }, 1000);
  };

  const handleSaveToGitHub = async () => {
    if (!calculationName.trim()) {
      alert('Please enter a name for your calculation');
      return;
    }

    // Simulate GitHub save
    try {
      console.log('Saving to GitHub:', calculationName, files[activeFile]);
      alert('Calculation saved successfully!');
      setCalculationName('');
    } catch (error) {
      alert('Error saving calculation: ' + (error as Error).message);
    }
  };

  const convergenceData = {
    labels: calculationResults.map(r => r.step.toString()),
    datasets: [
      {
        label: 'Convergence',
        data: calculationResults.map(r => r.convergence),
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.1
      }
    ]
  };

  const energyData = {
    labels: relaxationSteps.map(r => r.step.toString()),
    datasets: [
      {
        label: 'Total Energy (Ry)',
        data: relaxationSteps.map(r => r.energy),
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: 'rgba(6, 182, 212, 0.1)'
        },
        ticks: { 
          color: '#0891b2',
          font: { family: 'monospace' }
        }
      },
      x: {
        grid: {
          color: 'rgba(6, 182, 212, 0.1)'
        },
        ticks: { 
          color: '#0891b2',
          font: { family: 'monospace' }
        }
      }
    },
    plugins: {
      legend: {
        labels: { 
          color: '#0891b2',
          font: { family: 'monospace' }
        }
      }
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Input Files Section */}
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4 border border-cyan-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cyan-300">Input Files</h3>
              <div className="flex space-x-2">
                <button
                  onClick={startCalculation}
                  disabled={isCalculating}
                  className={`px-4 py-2 rounded-md flex items-center text-sm ${
                    isCalculating
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  }`}
                >
                  {isCalculating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isCalculating ? 'Running...' : 'Run'}
                </button>
              </div>
            </div>

            {/* File Tabs */}
            <div className="flex space-x-1 mb-4 overflow-x-auto">
              {Object.keys(files).map(filename => (
                <button
                  key={filename}
                  onClick={() => setActiveFile(filename)}
                  className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
                    activeFile === filename
                      ? 'bg-cyan-600 text-white'
                      : 'bg-black/50 text-cyan-400 hover:bg-black/70'
                  }`}
                >
                  <FileText className="w-3 h-3 inline mr-1" />
                  {filename}
                </button>
              ))}
            </div>

            {/* Code Editor */}
            <div className="h-80 rounded-lg overflow-hidden border border-cyan-800/30">
              <Editor
                height="100%"
                defaultLanguage={activeFile.endsWith('.py') ? 'python' : 'plaintext'}
                theme="vs-dark"
                value={files[activeFile]}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            {/* File Upload */}
            <div
              {...getRootProps()}
              className={`mt-4 border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-cyan-800/50 hover:border-cyan-600/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
              <p className="text-cyan-300 text-sm">
                {isDragActive
                  ? 'Drop files here...'
                  : 'Drag & drop QE files or click to select'}
              </p>
            </div>

            {/* GitHub Save */}
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="text"
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                placeholder="Calculation name"
                className="flex-1 px-3 py-2 bg-black/30 border border-cyan-800/50 rounded text-cyan-300 placeholder:text-cyan-700/50 text-sm"
              />
              <button
                onClick={handleSaveToGitHub}
                className="px-3 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-sm flex items-center"
              >
                <GitBranch className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4 border border-cyan-800/50">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Calculation Progress</h3>
            
            {/* SCF Convergence Chart */}
            <div className="bg-black/20 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-medium text-cyan-400 mb-2">SCF Convergence</h4>
              <div className="h-48">
                <Line data={convergenceData} options={chartOptions} />
              </div>
            </div>

            {/* Energy Evolution Chart */}
            <div className="bg-black/20 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-medium text-cyan-400 mb-2">Energy Evolution</h4>
              <div className="h-48">
                <Line data={energyData} options={chartOptions} />
              </div>
            </div>

            {/* Latest Results */}
            {calculationResults.length > 0 && (
              <div className="bg-black/20 rounded-lg p-3">
                <h4 className="text-sm font-medium text-cyan-400 mb-2">Latest Results</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-xs text-cyan-500">Total Energy</p>
                    <p className="text-cyan-300 font-mono text-sm">
                      {calculationResults[calculationResults.length - 1].totalEnergy.toFixed(6)} Ry
                    </p>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-xs text-cyan-500">Convergence</p>
                    <p className="text-cyan-300 font-mono text-sm">
                      {calculationResults[calculationResults.length - 1].convergence.toExponential(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information Panel */}
      <div className="bg-black/30 rounded-lg p-4 border border-cyan-800/50">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Quantum ESPRESSO Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-cyan-400 font-medium mb-2">Calculation Types</h4>
            <ul className="text-cyan-300 text-sm space-y-1">
              <li>• <strong>SCF:</strong> Self-consistent field calculation</li>
              <li>• <strong>Relax:</strong> Structural optimization</li>
              <li>• <strong>Bands:</strong> Electronic band structure</li>
              <li>• <strong>DOS:</strong> Density of states</li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-400 font-medium mb-2">Key Features</h4>
            <ul className="text-cyan-300 text-sm space-y-1">
              <li>• Real-time calculation monitoring</li>
              <li>• Interactive input file editing</li>
              <li>• Convergence visualization</li>
              <li>• GitHub integration for saving</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};