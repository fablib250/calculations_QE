import { Material } from '../types/materials';

export const materials: Material[] = [
  {
    id: '1',
    name: 'Silicon',
    category: 'Semiconductor',
    description: 'Pure silicon crystal used in semiconductor applications',
    color: '#4A5568',
    properties: {
      density: 2.33,
      meltingPoint: 1687,
      boilingPoint: 3538,
      thermalConductivity: 149,
      thermalExpansion: 2.6,
      tensileStrength: 7000,
      youngsModulus: 130
    },
    composition: {
      'Si': 100
    },
    applications: [
      'Computer processors',
      'Solar cells',
      'Electronic devices',
      'Integrated circuits'
    ]
  },
  {
    id: '2',
    name: 'Titanium Alloy (Ti-6Al-4V)',
    category: 'Metal',
    description: 'Titanium alloy with aluminum and vanadium, known for high strength-to-weight ratio',
    color: '#718096',
    properties: {
      density: 4.43,
      meltingPoint: 1933,
      boilingPoint: 3560,
      thermalConductivity: 6.7,
      thermalExpansion: 8.6,
      tensileStrength: 1000,
      youngsModulus: 114
    },
    composition: {
      'Ti': 90,
      'Al': 6,
      'V': 4
    },
    applications: [
      'Aerospace components',
      'Medical implants',
      'Marine equipment',
      'High-performance automotive parts'
    ]
  },
  {
    id: '3',
    name: 'Carbon Fiber',
    category: 'Composite',
    description: 'High-strength carbon fiber composite material',
    color: '#2D3748',
    properties: {
      density: 1.6,
      meltingPoint: 3800,
      thermalConductivity: 7,
      tensileStrength: 3500,
      youngsModulus: 230
    },
    composition: {
      'C': 95,
      'Other': 5
    },
    applications: [
      'Aircraft structures',
      'Automotive body panels',
      'Sports equipment',
      'Wind turbine blades'
    ]
  },
  {
    id: '4',
    name: 'Aluminum 6061',
    category: 'Metal',
    description: 'Aluminum alloy with magnesium and silicon, widely used structural material',
    color: '#A0AEC0',
    properties: {
      density: 2.7,
      meltingPoint: 925,
      boilingPoint: 2792,
      thermalConductivity: 167,
      thermalExpansion: 23.1,
      tensileStrength: 310,
      youngsModulus: 69
    },
    composition: {
      'Al': 97.9,
      'Mg': 1.0,
      'Si': 0.6,
      'Other': 0.5
    },
    applications: [
      'Structural components',
      'Automotive parts',
      'Marine fittings',
      'Bicycle frames'
    ]
  },
  {
    id: '5',
    name: 'Stainless Steel 316L',
    category: 'Metal',
    description: 'Low-carbon austenitic stainless steel with excellent corrosion resistance',
    color: '#E2E8F0',
    properties: {
      density: 8.0,
      meltingPoint: 1700,
      boilingPoint: 3000,
      thermalConductivity: 16.3,
      thermalExpansion: 16.0,
      tensileStrength: 580,
      youngsModulus: 200
    },
    composition: {
      'Fe': 65,
      'Cr': 18,
      'Ni': 12,
      'Mo': 3,
      'Other': 2
    },
    applications: [
      'Medical devices',
      'Chemical processing equipment',
      'Marine applications',
      'Food processing equipment'
    ]
  }
];