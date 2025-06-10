export interface CalculationResult {
  step: number;
  totalEnergy: number;
  kineticEnergy: number;
  convergence: number;
  forces: number[];
}

export interface RelaxationStep {
  step: number;
  energy: number;
  maxForce: number;
  avgForce: number;
}

export interface SimulationParams {
  temperature: number;
  pressure: number;
  timeSteps: number;
  cutoffEnergy: number;
  kPoints: number[];
  convergenceTolerance: number;
  maxIterations: number;
  exchangeCorrelation: string;
  pseudopotentials: string[];
}

export interface Material {
  id: string;
  name: string;
  category: string;
  description?: string;
  color?: string;
  properties?: {
    density?: number;
    meltingPoint?: number;
    boilingPoint?: number;
    thermalConductivity?: number;
    thermalExpansion?: number;
    tensileStrength?: number;
    youngsModulus?: number;
  };
  composition?: Record<string, number>;
  applications?: string[];
}