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