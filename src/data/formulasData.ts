export const formulasData = [
  // Physics - Mechanics
  {
    id: "physics-mechanics-newton-second-law",
    name: "Newton's Second Law",
    latex: "F = m \\cdot a",
    description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
    variables: [
      { symbol: "F", name: "Force", unit: "N (Newton)" },
      { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
      { symbol: "a", name: "Acceleration", unit: "m/s² (meter per second squared)" }
    ],
    category: "Physics",
    subcategory: "Mechanics"
  },
  {
    id: "physics-mechanics-kinetic-energy",
    name: "Kinetic Energy",
    latex: "E_k = \\frac{1}{2} \\cdot m \\cdot v^2",
    description: "The energy possessed by an object due to its motion.",
    variables: [
      { symbol: "E_k", name: "Kinetic Energy", unit: "J (Joule)" },
      { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
      { symbol: "v", name: "Velocity", unit: "m/s (meter per second)" }
    ],
    category: "Physics",
    subcategory: "Mechanics"
  },
  {
    id: "physics-mechanics-potential-energy",
    name: "Gravitational Potential Energy",
    latex: "E_p = m \\cdot g \\cdot h",
    description: "The energy possessed by an object due to its position in a gravitational field.",
    variables: [
      { symbol: "E_p", name: "Potential Energy", unit: "J (Joule)" },
      { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
      { symbol: "g", name: "Gravitational Acceleration", unit: "m/s² (meter per second squared)" },
      { symbol: "h", name: "Height", unit: "m (meter)" }
    ],
    category: "Physics",
    subcategory: "Mechanics"
  },
  // Physics - Electromagnetism
  {
    id: "physics-em-ohms-law",
    name: "Ohm's Law",
    latex: "V = I \\cdot R",
    description: "The current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.",
    variables: [
      { symbol: "V", name: "Voltage", unit: "V (Volt)" },
      { symbol: "I", name: "Current", unit: "A (Ampere)" },
      { symbol: "R", name: "Resistance", unit: "Ω (Ohm)" }
    ],
    category: "Physics",
    subcategory: "Electromagnetism"
  },
  {
    id: "physics-em-power",
    name: "Electrical Power",
    latex: "P = V \\cdot I",
    description: "The rate at which electrical energy is transferred by an electric circuit.",
    variables: [
      { symbol: "P", name: "Power", unit: "W (Watt)" },
      { symbol: "V", name: "Voltage", unit: "V (Volt)" },
      { symbol: "I", name: "Current", unit: "A (Ampere)" }
    ],
    category: "Physics",
    subcategory: "Electromagnetism"
  },
  // Mathematics - Calculus
  {
    id: "math-calculus-derivative",
    name: "Derivative Definition",
    latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
    description: "The rate of change of a function with respect to a variable.",
    variables: [
      { symbol: "f'(x)", name: "Derivative of f with respect to x" },
      { symbol: "f(x)", name: "Function of x" },
      { symbol: "h", name: "Change in x approaching zero" }
    ],
    category: "Mathematics",
    subcategory: "Calculus"
  },
  {
    id: "math-calculus-integral",
    name: "Definite Integral",
    latex: "\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)",
    description: "The area under the curve of f(x) from a to b, where F is the antiderivative of f.",
    variables: [
      { symbol: "∫", name: "Integral" },
      { symbol: "f(x)", name: "Function of x" },
      { symbol: "a", name: "Lower bound" },
      { symbol: "b", name: "Upper bound" },
      { symbol: "F", name: "Antiderivative of f" }
    ],
    category: "Mathematics",
    subcategory: "Calculus"
  },
  // Engineering - Structural
  {
    id: "engineering-structural-stress",
    name: "Mechanical Stress",
    latex: "\\sigma = \\frac{F}{A}",
    description: "The force per unit area experienced by a material.",
    variables: [
      { symbol: "σ", name: "Stress", unit: "Pa (Pascal)" },
      { symbol: "F", name: "Force", unit: "N (Newton)" },
      { symbol: "A", name: "Area", unit: "m² (square meter)" }
    ],
    category: "Engineering",
    subcategory: "Structural"
  },
  {
    id: "engineering-structural-strain",
    name: "Mechanical Strain",
    latex: "\\epsilon = \\frac{\\Delta L}{L}",
    description: "The ratio of deformation to original length.",
    variables: [
      { symbol: "ε", name: "Strain", unit: "dimensionless" },
      { symbol: "ΔL", name: "Change in length", unit: "m (meter)" },
      { symbol: "L", name: "Original length", unit: "m (meter)" }
    ],
    category: "Engineering",
    subcategory: "Structural"
  },
  // Chemistry
  {
    id: "chemistry-ideal-gas-law",
    name: "Ideal Gas Law",
    latex: "PV = nRT",
    description: "Relates the pressure, volume, amount, and temperature of an ideal gas.",
    variables: [
      { symbol: "P", name: "Pressure", unit: "Pa (Pascal)" },
      { symbol: "V", name: "Volume", unit: "m³ (cubic meter)" },
      { symbol: "n", name: "Amount of substance", unit: "mol (mole)" },
      { symbol: "R", name: "Gas constant", unit: "J/(mol·K)" },
      { symbol: "T", name: "Temperature", unit: "K (Kelvin)" }
    ],
    category: "Chemistry",
    subcategory: "Thermodynamics"
  },
  {
    id: "chemistry-ph",
    name: "pH Formula",
    latex: "pH = -\\log_{10}[H^+]",
    description: "Measure of the acidity or basicity of an aqueous solution.",
    variables: [
      { symbol: "pH", name: "pH value", unit: "dimensionless" },
      { symbol: "[H⁺]", name: "Hydrogen ion concentration", unit: "mol/L" }
    ],
    category: "Chemistry",
    subcategory: "Acid-Base Chemistry"
  }
];