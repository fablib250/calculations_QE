import React, { useEffect, useRef } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Material } from '../../types/materials';

interface MaterialVisualizerProps {
  material: Material;
  simulationActive: boolean;
  environmentParams: {
    temperature: number;
    pressure: number;
    humidity: number;
  };
  isComparison?: boolean;
}

const MaterialVisualizer: React.FC<MaterialVisualizerProps> = ({ 
  material, 
  simulationActive, 
  environmentParams,
  isComparison = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation frame reference for cleanup
  const animationRef = useRef<number | null>(null);
  
  // Mock rendering function - in a real app, this would use WebGL/Three.js
  const renderMaterial = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions to match container
    if (containerRef.current) {
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    }
    
    // Draw background
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Base color from material
    const baseColor = material.color || '#3B82F6';
    
    // Center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Base radius for material visualization
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;
    
    // Draw material core
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = baseColor;
    ctx.fill();
    
    // Add some details based on material properties
    const density = material.properties?.density || 1;
    const thermalConductivity = material.properties?.thermalConductivity || 1;
    
    // Draw orbiting particles if simulation is active
    if (simulationActive) {
      const time = Date.now() / 1000;
      const particleCount = Math.round(density * 10);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * (i % 3 + 1) * 0.3;
        const distance = baseRadius * 1.3 + Math.sin(time * 2 + i) * 10;
        const size = 3 + Math.sin(time + i * 0.5) * 2;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Particle color based on temperature
        const tempFactor = Math.min(1, environmentParams.temperature / 500);
        ctx.fillStyle = tempFactor > 0.7 
          ? `rgba(255, ${Math.floor(165 - 165 * tempFactor)}, 0, 0.8)` 
          : `rgba(0, ${Math.floor(191 + 64 * tempFactor)}, 255, 0.8)`;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connecting lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${tempFactor > 0.7 ? '255, 165' : '66, 153'}, 255, 0.2)`;
        ctx.stroke();
      }
      
      // Draw heat waves based on thermal conductivity and temperature
      const waveIntensity = thermalConductivity * (environmentParams.temperature / 300);
      ctx.strokeStyle = `rgba(255, ${Math.floor(165 - 165 * Math.min(1, waveIntensity / 2))}, 0, 0.2)`;
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        const waveRadius = baseRadius * (1.5 + i * 0.2) + Math.sin(time * 3) * 5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    // Draw HUD-style elements
    // Material name
    ctx.font = '16px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(material.name, centerX, 30);
    
    // Property readouts
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0EA5E9';
    
    // Left side data
    const leftX = 20;
    let topY = 30;
    ctx.fillText(`DENSITY: ${material.properties?.density || 'N/A'} g/cm³`, leftX, topY);
    topY += 20;
    ctx.fillText(`MELT POINT: ${material.properties?.meltingPoint || 'N/A'} K`, leftX, topY);
    topY += 20;
    ctx.fillText(`CONDUCTIVITY: ${material.properties?.thermalConductivity || 'N/A'} W/(m·K)`, leftX, topY);
    
    // Reticle lines (Iron Man style)
    if (simulationActive) {
      ctx.strokeStyle = 'rgba(255, 128, 0, 0.5)';
      ctx.lineWidth = 1;
      
      // Top left corner
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(20, 60);
      ctx.moveTo(20, 20);
      ctx.lineTo(60, 20);
      ctx.stroke();
      
      // Top right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 20, 20);
      ctx.lineTo(canvas.width - 20, 60);
      ctx.moveTo(canvas.width - 20, 20);
      ctx.lineTo(canvas.width - 60, 20);
      ctx.stroke();
      
      // Bottom left corner
      ctx.beginPath();
      ctx.moveTo(20, canvas.height - 20);
      ctx.lineTo(20, canvas.height - 60);
      ctx.moveTo(20, canvas.height - 20);
      ctx.lineTo(60, canvas.height - 20);
      ctx.stroke();
      
      // Bottom right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 20, canvas.height - 20);
      ctx.lineTo(canvas.width - 20, canvas.height - 60);
      ctx.moveTo(canvas.width - 20, canvas.height - 20);
      ctx.lineTo(canvas.width - 60, canvas.height - 20);
      ctx.stroke();
      
      // Current temperature readout
      ctx.fillStyle = '#F97316';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`TEMP: ${environmentParams.temperature} K`, canvas.width - 20, 30);
      ctx.fillText(`PRESSURE: ${environmentParams.pressure} kPa`, canvas.width - 20, 50);
      ctx.fillText(`HUMIDITY: ${environmentParams.humidity}%`, canvas.width - 20, 70);
      
      // Scanning effect
      const scanLineY = (Math.sin(time) * 0.5 + 0.5) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(canvas.width, scanLineY);
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
  
  useEffect(() => {
    // Set up animation loop
    const animate = () => {
      renderMaterial();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [material, simulationActive, environmentParams]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderMaterial();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-3 border-b border-blue-500/30">
        <h2 className="font-semibold flex items-center">
          {isComparison ? 'Comparison Visualization' : 'Material Visualization'}
        </h2>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors duration-200">
            <ZoomIn className="h-4 w-4 text-blue-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors duration-200">
            <ZoomOut className="h-4 w-4 text-blue-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors duration-200">
            <RotateCcw className="h-4 w-4 text-blue-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors duration-200">
            <Maximize2 className="h-4 w-4 text-blue-400" />
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
        {simulationActive && (
          <div className="absolute bottom-3 left-3 text-xs bg-gray-900/80 px-2 py-1 rounded-md border border-orange-500/30 text-orange-400">
            Live Simulation Active
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialVisualizer;