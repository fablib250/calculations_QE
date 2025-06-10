import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { HolographicPanel } from '../../components/HolographicPanel';
import { CalculatorButton } from './CalculatorButton';
import { FormulaReference } from './FormulaReference';
import Plot from 'react-plotly.js';
import { create, all } from 'mathjs';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const math = create(all);

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [memoryValue, setMemoryValue] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showScientific, setShowScientific] = useState(true);
  const [plot2dExpr, setPlot2dExpr] = useState('');
  const [plot3dExpr, setPlot3dExpr] = useState('');
  const [plotType, setPlotType] = useState<'2d' | '3d' | null>(null);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [latexDisplay, setLatexDisplay] = useState('');
  
  const handleNumberInput = (num: string) => {
    const newDisplay = display === '0' ? num : display + num;
    setDisplay(newDisplay);
    updateLatex(newDisplay);
  };
  
  const handleOperator = (op: string) => {
    setFormula(prev => {
      if (prev === '') return `${display} ${op}`;
      return `${prev} ${display} ${op}`;
    });
    setDisplay('0');
    updateLatex(op);
  };

  const updateLatex = (input: string) => {
    let latex = input
      .replace(/\*/g, '\\cdot ')
      .replace(/\//g, '\\div ')
      .replace(/sqrt/g, '\\sqrt')
      .replace(/pi/g, '\\pi ')
      .replace(/sin/g, '\\sin')
      .replace(/cos/g, '\\cos')
      .replace(/tan/g, '\\tan');
    setLatexDisplay(latex);
  };
  
  const handleEquals = () => {
    try {
      const fullExpression = `${formula} ${display}`;
      const result = math.evaluate(fullExpression);
      setHistory(prev => [...prev, `${fullExpression} = ${result}`]);
      setDisplay(result.toString());
      setFormula('');
      updateLatex(`${result}`);
    } catch {
      setDisplay('Error');
    }
  };
  
  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setLatexDisplay('');
  };
  
  const handleMemory = (action: 'add' | 'subtract' | 'recall' | 'clear') => {
    const currentValue = parseFloat(display);
    
    switch (action) {
      case 'add':
        setMemoryValue(prev => (prev || 0) + currentValue);
        break;
      case 'subtract':
        setMemoryValue(prev => (prev || 0) - currentValue);
        break;
      case 'recall':
        if (memoryValue !== null) {
          setDisplay(memoryValue.toString());
          updateLatex(memoryValue.toString());
        }
        break;
      case 'clear':
        setMemoryValue(null);
        break;
    }
  };
  
  const handleScientific = (func: string) => {
    try {
      const currentValue = parseFloat(display);
      let result: number;
      
      // Convert to radians if in DEG mode
      const value = angleMode === 'DEG' ? (currentValue * Math.PI / 180) : currentValue;
      
      switch (func) {
        case 'sin':
          result = Math.sin(value);
          break;
        case 'cos':
          result = Math.cos(value);
          break;
        case 'tan':
          result = Math.tan(value);
          break;
        case 'log':
          result = Math.log10(currentValue);
          break;
        case 'ln':
          result = Math.log(currentValue);
          break;
        case 'sqrt':
          result = Math.sqrt(currentValue);
          break;
        case 'square':
          result = currentValue * currentValue;
          break;
        case 'cube':
          result = currentValue * currentValue * currentValue;
          break;
        case 'inv':
          result = 1 / currentValue;
          break;
        case 'fact':
          result = math.factorial(currentValue);
          break;
        case 'abs':
          result = Math.abs(currentValue);
          break;
        default:
          return;
      }
      
      setDisplay(result.toString());
      setHistory(prev => [...prev, `${func}(${currentValue}) = ${result}`]);
      updateLatex(`${func}(${currentValue}) = ${result}`);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const render2DPlot = () => {
    if (!plot2dExpr) return null;
    try {
      const xValues = [];
      const yValues = [];
      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        const scope = { x };
        const y = math.evaluate(plot2dExpr, scope);
        yValues.push(y);
      }
      return (
        <Plot
          data={[{
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'cyan' },
          }]}
          layout={{
            width: 600,
            height: 400,
            title: `y = ${plot2dExpr}`,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0.2)',
            font: { color: '#00ffff' },
            xaxis: {
              gridcolor: 'rgba(0,255,255,0.1)',
              zerolinecolor: 'rgba(0,255,255,0.2)',
            },
            yaxis: {
              gridcolor: 'rgba(0,255,255,0.1)',
              zerolinecolor: 'rgba(0,255,255,0.2)',
            },
          }}
        />
      );
    } catch {
      return <p className="text-red-500">Invalid expression for plotting</p>;
    }
  };

  const render3DPlot = () => {
    if (!plot3dExpr) return null;
    try {
      const xValues = [];
      const yValues = [];
      const zValues = [];
      
      const size = 30;
      for (let xi = 0; xi < size; xi++) {
        xValues[xi] = -10 + (20 / size) * xi;
        yValues[xi] = -10 + (20 / size) * xi;
      }
      
      for (let i = 0; i < size; i++) {
        const zRow = [];
        for (let j = 0; j < size; j++) {
          const x = xValues[j];
          const y = yValues[i];
          const scope = { x, y };
          const z = math.evaluate(plot3dExpr, scope);
          zRow.push(z);
        }
        zValues.push(zRow);
      }
      
      return (
        <Plot
          data={[{
            z: zValues,
            x: xValues,
            y: yValues,
            type: 'surface',
            colorscale: 'Viridis',
          }]}
          layout={{
            width: 600,
            height: 500,
            title: `z = ${plot3dExpr}`,
            paper_bgcolor: 'rgba(0,0,0,0)',
            scene: {
              xaxis: { gridcolor: 'rgba(0,255,255,0.1)' },
              yaxis: { gridcolor: 'rgba(0,255,255,0.1)' },
              zaxis: { gridcolor: 'rgba(0,255,255,0.1)' },
            },
          }}
        />
      );
    } catch {
      return <p className="text-red-500">Invalid expression for 3D plotting</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-cyan-300">Scientific Calculator</h2>
        <p className="text-cyan-500/80 mt-1">Advanced calculations for material engineering</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HolographicPanel title="F43 Engineering Calculator">
            <div className="flex flex-col h-full">
              {/* Display */}
              <div className="bg-black/40 rounded-md p-3 mb-4 border border-cyan-800/50">
                <div className="text-xs text-cyan-500/70 mb-1">
                  {formula}
                </div>
                <div className="text-2xl text-cyan-300 font-bold text-right">
                  {display}
                </div>
                <div className="mt-2 text-cyan-400/80">
                  <BlockMath>{latexDisplay || '0'}</BlockMath>
                </div>
              </div>
              
              {/* Angle Mode Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG')}
                  className="px-3 py-1 text-sm bg-cyan-900/30 text-cyan-300 rounded-md border border-cyan-700/50"
                >
                  {angleMode}
                </button>
              </div>
              
              {/* Calculator Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {/* Memory Row */}
                <CalculatorButton label="MC" onClick={() => handleMemory('clear')} type="memory" />
                <CalculatorButton label="MR" onClick={() => handleMemory('recall')} type="memory" />
                <CalculatorButton label="M+" onClick={() => handleMemory('add')} type="memory" />
                <CalculatorButton label="M-" onClick={() => handleMemory('subtract')} type="memory" />
                
                {/* Scientific Mode Toggle */}
                <CalculatorButton 
                  label={showScientific ? "Basic" : "Scientific"} 
                  onClick={() => setShowScientific(!showScientific)} 
                  type="function" 
                  className="col-span-2"
                />
                <CalculatorButton label="C" onClick={handleClear} type="function" />
                <CalculatorButton label="←" onClick={() => setDisplay(prev => prev.slice(0, -1) || '0')} type="function" />
                
                {showScientific && (
                  <>
                    {/* Scientific Functions */}
                    <CalculatorButton label="sin" onClick={() => handleScientific('sin')} type="scientific" />
                    <CalculatorButton label="cos" onClick={() => handleScientific('cos')} type="scientific" />
                    <CalculatorButton label="tan" onClick={() => handleScientific('tan')} type="scientific" />
                    <CalculatorButton label="log" onClick={() => handleScientific('log')} type="scientific" />
                    
                    <CalculatorButton label="ln" onClick={() => handleScientific('ln')} type="scientific" />
                    <CalculatorButton label="√" onClick={() => handleScientific('sqrt')} type="scientific" />
                    <CalculatorButton label="x²" onClick={() => handleScientific('square')} type="scientific" />
                    <CalculatorButton label="x³" onClick={() => handleScientific('cube')} type="scientific" />
                    
                    <CalculatorButton label="1/x" onClick={() => handleScientific('inv')} type="scientific" />
                    <CalculatorButton label="n!" onClick={() => handleScientific('fact')} type="scientific" />
                    <CalculatorButton label="|x|" onClick={() => handleScientific('abs')} type="scientific" />
                    <CalculatorButton label="π" onClick={() => handleNumberInput(Math.PI.toString())} type="scientific" />
                  </>
                )}
                
                {/* Numbers and Basic Operations */}
                <CalculatorButton label="7" onClick={() => handleNumberInput('7')} />
                <CalculatorButton label="8" onClick={() => handleNumberInput('8')} />
                <CalculatorButton label="9" onClick={() => handleNumberInput('9')} />
                <CalculatorButton label="÷" onClick={() => handleOperator('/')} type="operator" />
                
                <CalculatorButton label="4" onClick={() => handleNumberInput('4')} />
                <CalculatorButton label="5" onClick={() => handleNumberInput('5')} />
                <CalculatorButton label="6" onClick={() => handleNumberInput('6')} />
                <CalculatorButton label="×" onClick={() => handleOperator('*')} type="operator" />
                
                <CalculatorButton label="1" onClick={() => handleNumberInput('1')} />
                <CalculatorButton label="2" onClick={() => handleNumberInput('2')} />
                <CalculatorButton label="3" onClick={() => handleNumberInput('3')} />
                <CalculatorButton label="-" onClick={() => handleOperator('-')} type="operator" />
                
                <CalculatorButton label="0" onClick={() => handleNumberInput('0')} />
                <CalculatorButton label="." onClick={() => handleNumberInput('.')} />
                <CalculatorButton label="=" onClick={handleEquals} type="equals" />
                <CalculatorButton label="+" onClick={() => handleOperator('+')} type="operator" />
              </div>
            </div>
          </HolographicPanel>

          {/* Plotting Section */}
          <div className="mt-6">
            <HolographicPanel title="Function Plotting">
              <div className="space-y-4">
                {/* 2D Plot Input */}
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    2D Function (y = f(x))
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={plot2dExpr}
                      onChange={(e) => setPlot2dExpr(e.target.value)}
                      placeholder="e.g., sin(x) + x^2"
                      className="flex-1 bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300 placeholder:text-cyan-700/50"
                    />
                    <button
                      onClick={() => setPlotType('2d')}
                      className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-700/50 hover:bg-cyan-800/50"
                    >
                      Plot 2D
                    </button>
                  </div>
                </div>

                {/* 3D Plot Input */}
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    3D Function (z = f(x,y))
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={plot3dExpr}
                      onChange={(e) => setPlot3dExpr(e.target.value)}
                      placeholder="e.g., sin(sqrt(x^2 + y^2))"
                      className="flex-1 bg-black/30 border border-cyan-800/50 rounded px-3 py-2 text-cyan-300 placeholder:text-cyan-700/50"
                    />
                    <button
                      onClick={() => setPlotType('3d')}
                      className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-700/50 hover:bg-cyan-800/50"
                    >
                      Plot 3D
                    </button>
                  </div>
                </div>

                {/* Plot Display */}
                <div className="mt-4">
                  {plotType === '2d' && render2DPlot()}
                  {plotType === '3d' && render3DPlot()}
                </div>
              </div>
            </HolographicPanel>
          </div>
        </div>
        
        <div>
          <HolographicPanel title="Calculation History" className="mb-6 h-64 overflow-auto">
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-cyan-500/60 text-sm italic">No calculations yet</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="text-sm border-b border-cyan-900/30 py-1">
                    {item}
                  </div>
                ))
              )}
            </div>
          </HolographicPanel>
          
          <FormulaReference />
        </div>
      </div>
    </div>
  );
};