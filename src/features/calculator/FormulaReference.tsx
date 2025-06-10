import React, { useState } from 'react';
import { HolographicPanel } from '../../components/HolographicPanel';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FormulaReference: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('materials');

  const categories = [
    {
      id: 'materials',
      name: 'Material Properties',
      formulas: [
        { name: "Young's Modulus", formula: 'E = σ/ε', description: 'Ratio of stress to strain (stiffness)' },
        { name: 'Density', formula: 'ρ = m/V', description: 'Mass per unit volume' },
        { name: 'Thermal Conductivity', formula: 'q = -k∇T', description: 'Heat transfer capability' },
      ]
    },
    {
      id: 'stress',
      name: 'Stress Analysis',
      formulas: [
        { name: 'Normal Stress', formula: 'σ = F/A', description: 'Force per unit area' },
        { name: 'Shear Stress', formula: 'τ = F/A', description: 'Tangential force per unit area' },
        { name: 'Von Mises Stress', formula: 'σv = √(σ₁² + σ₂² - σ₁σ₂)', description: 'Combined stress state' },
      ]
    },
    {
      id: 'thermo',
      name: 'Thermodynamics',
      formulas: [
        { name: 'Heat Capacity', formula: 'Cp = (∂H/∂T)p', description: 'Energy required to raise temperature' },
        { name: 'Enthalpy Change', formula: 'ΔH = Q + W', description: 'Total heat content change' },
        { name: 'Gibbs Free Energy', formula: 'ΔG = ΔH - TΔS', description: 'Spontaneity of a reaction' },
      ]
    },
    {
      id: 'modern',
      name: 'Modern Physics',
      formulas: [
        { name: 'Photoelectric Equation', formula: 'E = hf - φ', description: 'Energy of photoelectron' },
        { name: 'Mass-Energy Equivalence', formula: 'E = mc²', description: 'Energy from mass' },
        { name: 'de Broglie Wavelength', formula: 'λ = h/p', description: 'Wave-particle duality' },
      ]
    },
    {
      id: 'quantum',
      name: 'Quantum and Nuclear Physics',
      formulas: [
        { name: 'Uncertainty Principle', formula: 'ΔxΔp ≥ ħ/2', description: 'Limits of precision' },
        { name: 'Nuclear Binding Energy', formula: 'E = Δmc²', description: 'Energy from mass defect' },
        { name: 'Radioactive Decay Law', formula: 'N = N₀e^(-λt)', description: 'Decay over time' },
      ]
    },
    {
  id: 'work_energy',
  name: 'Work and Energy',
  formulas: [
    { name: 'Work (Constant Force)', formula: 'W = Fdcosθ', description: 'Work done by a constant force at angle θ' },
    { name: 'Work (Variable Force)', formula: 'W = ∫𝐅⃗ ⋅ d𝐬⃗', description: 'Work done by a variable force (dot product integral)' },
    { name: 'Kinetic Energy', formula: 'KE = ½mv²', description: 'Kinetic energy of an object' },
    { name: 'Gravitational Potential Energy', formula: 'PE₉ = mgh', description: 'Gravitational potential energy (near Earth’s surface)' },
    { name: 'Elastic Potential Energy', formula: 'PEₛ = ½kx²', description: 'Elastic (spring) potential energy' },
    { name: 'Work-Energy Theorem', formula: 'Wₙₑₜ = ΔKE', description: 'Net work equals change in kinetic energy' },
    { name: 'Mechanical Energy', formula: 'E = KE + PE', description: 'Total mechanical energy of a system' },
    { name: 'Energy Change (Non-conservative)', formula: 'ΔE = Wₙₒₙ₋cₒₙₛₑᵣᵥₐₜᵢᵥₑ', description: 'Change in energy due to non-conservative forces (e.g., friction)' },
    { name: 'Power (Average)', formula: 'P = W/t', description: 'Power: rate of doing work' },
    { name: 'Power (Instantaneous)', formula: 'P = Fvcosθ', description: 'Instantaneous power by a force at angle θ' },
    { name: 'Horsepower Conversion', formula: '1 hp = 746 W', description: 'Horsepower to watts conversion' },
    { name: 'Efficiency', formula: 'Efficiency = (Useful Output Energy / Input Energy) × 100%', description: 'Mechanical or energy efficiency' }
  ]
},
{
  id: 'momentum_impulse',
  name: 'Momentum and Impulse',
  formulas: [
    { name: 'Linear Momentum', formula: '𝐩⃗ = m𝐯⃗', description: 'Linear momentum (mass × velocity)' },
    { name: 'Impulse (Force × Time)', formula: '𝐉⃗ = 𝐅⃗_avg Δt', description: 'Impulse: force over time interval' },
    { name: 'Impulse-Momentum Theorem', formula: '𝐉⃗ = Δ𝐩⃗', description: 'Impulse equals change in momentum' },
    { name: 'Average Force', formula: '𝐅⃗_avg = Δ𝐩⃗ / Δt', description: 'Average force from momentum change' },
    { name: 'Momentum Conservation (2-object)', formula: 'm₁𝐯⃗₁ᵢ + m₂𝐯⃗₂ᵢ = m₁𝐯⃗₁𝒇 + m₂𝐯⃗₂𝒇', description: 'Conservation of momentum (2-object system)' },
    { name: 'Perfectly Inelastic Collision', formula: 'm₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v𝒇', description: 'Momentum conserved in perfectly inelastic collision' },
    { name: 'Elastic Collision', formula: 'Momentum and KE conserved', description: 'In elastic collisions, total KE and momentum are conserved' },
    { name: 'Change in Kinetic Energy', formula: 'ΔKE = KEₓ𝒇ᵢₙₐₗ − KEᵢₙᵢₜᵢₐₗ', description: 'Change in kinetic energy (check for inelastic losses)' },
    { name: 'Force from Momentum Change', formula: 'F_avg = (mv𝒇 − mvᵢ) / t', description: 'Force from momentum change over time' }
  ]
},
{
  id: 'rotational_motion',
  name: 'Rotational Motion',
  formulas: [
    { name: 'Angular Displacement', formula: 'θ = θ₀ + ω₀t + ½αt²', description: 'Angular displacement with constant angular acceleration' },
    { name: 'Angular Velocity', formula: 'ω = ω₀ + αt', description: 'Angular velocity with constant angular acceleration' },
    { name: 'Angular Velocity Squared', formula: 'ω² = ω₀² + 2αθ', description: 'Angular velocity squared with angular displacement' },
    { name: 'Tangential Acceleration', formula: 'aₜ = rα', description: 'Tangential acceleration' },
    { name: 'Linear Velocity', formula: 'v = rω', description: 'Linear velocity in terms of angular velocity' },
    { name: 'Centripetal Acceleration', formula: 'a꜀ = v²/r = rω²', description: 'Centripetal (radial) acceleration' },
    { name: 'Arc Length', formula: 's = rθ', description: 'Arc length from angular displacement' },
    { name: 'Period of Rotation', formula: 'T = 2π/ω', description: 'Period of rotation from angular velocity' },
    { name: 'Frequency of Rotation', formula: 'f = 1/T', description: 'Frequency of rotation' }
  ]
},
{
  id: 'rotational_dynamics',
  name: 'Rotational Dynamics',
  formulas: [
    { name: 'Rotational Newton’s Second Law', formula: 'τ = Iα', description: 'Torque = moment of inertia × angular acceleration' },
    { name: 'Torque from Force', formula: 'τ = rFsinθ', description: 'Torque from a force applied at angle θ' },
    { name: 'Moment of Inertia (Point Masses)', formula: 'I = ∑mr²', description: 'Moment of inertia for point masses' },
    { name: 'Angular Momentum', formula: 'L = Iω', description: 'Angular momentum' },
    { name: 'Torque as dL/dt', formula: 'τ = dL/dt', description: 'Torque as the time rate of change of angular momentum' },
    { name: 'Rotational Kinetic Energy', formula: 'KEᵣₒₜ = ½Iω²', description: 'Rotational kinetic energy' },
    { name: 'Angular Momentum Conservation', formula: 'Lᵢ = L𝒇', description: 'Conservation of angular momentum (if net external torque is zero)' },
    { name: 'Parallel-Axis Theorem', formula: 'I_parallel = I_CM + Md²', description: 'Moment of inertia about parallel axis' },
    { name: 'Standard Moments of Inertia', formula: 'I_disk = ½MR², I_sphere = (2/5)MR²', description: 'Standard moments of inertia for symmetric bodies' }
  ]
},
{
  id: 'equilibrium_elasticity',
  name: 'Equilibrium and Elasticity',
  formulas: [
    { name: 'Translational Equilibrium', formula: '∑𝐅⃗ = 0', description: 'Net force is zero in translational equilibrium' },
    { name: 'Rotational Equilibrium', formula: '∑τ = 0', description: 'Net torque is zero in rotational equilibrium' },
    { name: 'Torque', formula: 'τ = rFsinθ', description: 'Torque from a force applied at angle θ (repeated for reference)' },
    { name: 'Stress', formula: 'Stress = F / A', description: 'Force per unit area on a material' },
    { name: 'Strain', formula: 'Strain = ΔL / L', description: 'Relative deformation (change in length per original length)' },
    { name: 'Young’s Modulus', formula: 'Y = Stress / Strain', description: 'Elastic modulus for stretching/compression' },
    { name: 'Deformation (Linear)', formula: 'ΔL = FL / (AY)', description: 'Length change under tension/compression' },
    { name: 'Volume Change (Bulk)', formula: 'ΔV = (F / B) ⋅ V', description: 'Volume change under pressure using bulk modulus' },
    { name: 'Bulk Modulus', formula: 'B = −ΔP / (ΔV / V)', description: 'Resistance to volume compression (bulk modulus)' },
    { name: 'Shear Stress', formula: 'S = F / A', description: 'Force per unit area under shear' },
    { name: 'Shear Strain', formula: 'Δx = FL / (AS)', description: 'Lateral deformation under shear force with shear modulus' }
  ]
},
{
  id: 'gravitation',
  name: 'Gravitation',
  formulas: [
    { name: 'Newton’s Law of Gravitation', formula: 'F = G * (m₁m₂) / r²', description: 'Attractive force between two point masses' },
    { name: 'Gravitational Field Strength', formula: 'g = GM / r²', description: 'Acceleration due to gravity at distance r from mass M' },
    { name: 'Gravitational Potential Energy', formula: 'U = −G * (m₁m₂) / r', description: 'Potential energy between two masses' },
    { name: 'Orbital Speed', formula: 'v_orbit = √(GM / r)', description: 'Speed for a stable circular orbit' },
    { name: 'Orbital Period (Circular)', formula: 'T = 2π√(r³ / GM)', description: 'Time for one orbit (Kepler’s 3rd law)' },
    { name: 'Total Orbital Energy', formula: 'E_total = KE + U = −GMm / (2r)', description: 'Total mechanical energy in circular orbit' },
    { name: 'Kepler’s Third Law (General)', formula: 'a³ ∝ T²', description: 'Relationship between orbit size and period' }
  ]
},
{
  id: 'oscillations_shm',
  name: 'Oscillations and Simple Harmonic Motion (SHM)',
  formulas: [
    { name: 'Displacement in SHM', formula: 'x(t) = A cos(ωt + ϕ)', description: 'General SHM equation for displacement' },
    { name: 'Velocity in SHM', formula: 'v(t) = −Aω sin(ωt + ϕ)', description: 'Time-dependent velocity in SHM' },
    { name: 'Acceleration in SHM', formula: 'a(t) = −Aω² cos(ωt + ϕ)', description: 'Time-dependent acceleration in SHM' },
    { name: 'SHM Definition', formula: 'a = −ω²x', description: 'Acceleration is proportional and opposite to displacement' },
    { name: 'Angular Frequency (Spring)', formula: 'ω = √(k / m)', description: 'Angular frequency for a mass-spring system' },
    { name: 'Period of Mass-Spring System', formula: 'T = 2π√(m / k)', description: 'Oscillation period for spring system' },
    { name: 'Period of Simple Pendulum', formula: 'T = 2π√(l / g)', description: 'Oscillation period of a simple pendulum' },
    { name: 'Total Mechanical Energy in SHM', formula: 'E = ½kA²', description: 'Constant total energy of SHM system' },
    { name: 'Kinetic Energy in SHM', formula: 'KE = ½mv²', description: 'Kinetic energy at any point during SHM' },
    { name: 'Potential Energy in SHM', formula: 'PE = ½kx²', description: 'Potential energy stored in spring at displacement x' }
  ]
},
{
  id: 'mechanical_waves',
  name: 'Mechanical Waves',
  formulas: [
    { name: 'Wave Speed', formula: 'v = fλ', description: 'Wave speed equals frequency times wavelength' },
    { name: 'Wave Function', formula: 'y(x, t) = A sin(kx − ωt + ϕ)', description: 'General sinusoidal wave function' },
    { name: 'Wave Number', formula: 'k = 2π / λ', description: 'Wave number (spatial frequency)' },
    { name: 'Angular Frequency', formula: 'ω = 2πf', description: 'Angular frequency from linear frequency' },
    { name: 'Wave Period', formula: 'T = 1 / f', description: 'Time for one full wave cycle' },
    { name: 'Speed on a String', formula: 'v = √(F_T / μ)', description: 'Speed of wave on stretched string (tension/mass per length)' },
    { name: 'Wave Intensity', formula: 'I = P / A', description: 'Intensity is power per unit area' },
    { name: 'Amplitude-Intensity Relation', formula: 'I ∝ A²', description: 'Intensity is proportional to the square of amplitude' }
  ]
},
{
  id: 'kinetic_theory',
  name: 'Kinetic Theory',
  formulas: [
    { name: 'Pressure from Molecular Motion', formula: 'PV = (1/3)Nm⟨v²⟩', description: 'Pressure from microscopic motion of particles' },
    { name: 'Average Kinetic Energy', formula: 'K_avg = (1/2)m⟨v²⟩ = (3/2)k_B T', description: 'Average kinetic energy of a gas molecule' },
    { name: 'Mean Square Speed', formula: '⟨v²⟩ = (3k_B T)/m', description: 'Mean square speed' },
    { name: 'Root Mean Square Speed', formula: 'v_rms = √⟨v²⟩ = √(3k_B T/m)', description: 'Root mean square speed' },
    { name: 'Ideal Gas Law (Microscopic)', formula: 'PV = Nk_B T', description: 'Ideal gas law (microscopic version)' },
    { name: 'Number of Moles', formula: 'n = N / N_A', description: 'Moles from number of particles' },
    { name: 'Gas Constant Relation', formula: 'R = N_A k_B', description: 'Gas constant relation' }
  ]
},
{
  id: 'fluid_mechanics',
  name: 'Fluid Mechanics',
  formulas: [
    { name: 'Density', formula: 'ρ = m / V', description: 'Density' },
    { name: 'Pressure', formula: 'P = F / A', description: 'Pressure as force per area' },
    { name: 'Pressure at Depth', formula: 'P = P₀ + ρgh', description: 'Pressure at depth in fluid' },
    { name: 'Buoyant Force', formula: 'F_b = ρ_f V_sub g', description: "Buoyant force (Archimedes' principle)" },
    { name: 'Flow Rate', formula: 'Q = Av', description: 'Flow rate (volume per time)' },
    { name: 'Continuity Equation', formula: 'A₁v₁ = A₂v₂', description: 'Equation of continuity (incompressible flow)' },
    { name: 'Bernoulli’s Equation', formula: 'P + (1/2)ρv² + ρgh = constant', description: 'Bernoulli’s equation (conservation of energy in fluids)' },
    { name: 'Torricelli’s Law', formula: 'v = √(2gΔh)', description: 'Speed of fluid from height' },
    { name: 'Viscosity', formula: 'η = (F/A) / (v/L)', description: 'Viscosity (fluid resistance to flow)' },
    { name: 'Reynolds Number', formula: 'Re = ρvL / η', description: 'Predicts flow type (laminar or turbulent)' }
  ]
},
{
  id: 'oscillations',
  name: 'Oscillations',
  formulas: [
    { name: 'Displacement in SHM', formula: 'x(t) = A cos(ωt + ϕ)', description: 'Displacement in simple harmonic motion (SHM)' },
    { name: 'Velocity in SHM', formula: 'v(t) = -Aω sin(ωt + ϕ)', description: 'Velocity in SHM' },
    { name: 'Acceleration in SHM', formula: 'a(t) = -Aω² cos(ωt + ϕ)', description: 'Acceleration in SHM' },
    { name: 'Defining SHM', formula: 'a = -ω²x', description: 'Acceleration proportional to displacement (SHM defining property)' },
    { name: 'Angular Frequency (spring-mass)', formula: 'ω = √(k / m)', description: 'Angular frequency for spring-mass system' },
    { name: 'Period of Mass-Spring SHM', formula: 'T = 2π √(m / k)', description: 'Period of mass-spring SHM' },
    { name: 'Angular Frequency (pendulum)', formula: 'ω = √(g / L)', description: 'Angular frequency of simple pendulum' },
    { name: 'Period of Simple Pendulum', formula: 'T = 2π √(L / g)', description: 'Period of a simple pendulum' },
    { name: 'Total Mechanical Energy in SHM', formula: 'E = (1/2)kA²', description: 'Total mechanical energy in SHM' },
    { name: 'Energy at Any Point in SHM', formula: 'E = (1/2)mv² + (1/2)kx²', description: 'Energy at any point in SHM' }
  ]
},
{
  id: 'waves',
  name: 'Waves',
  formulas: [
    { name: 'Wave Speed', formula: 'v = fλ', description: 'Wave speed = frequency × wavelength' },
    { name: 'Wave Function (Traveling Wave)', formula: 'y(x, t) = A sin(kx − ωt + ϕ)', description: 'Wave function (traveling wave)' },
    { name: 'Wave Number', formula: 'k = 2π / λ', description: 'Wave number' },
    { name: 'Angular Frequency', formula: 'ω = 2πf', description: 'Angular frequency' },
    { name: 'Intensity of Wave', formula: 'I = P / A', description: 'Intensity of wave' },
    { name: 'Intensity-Amplitude Relation', formula: 'I ∝ A²', description: 'Intensity proportional to amplitude squared' },
    { name: 'Sound Level (Decibels)', formula: 'β = 10 log₁₀(I / I₀)', description: 'Sound level in decibels' },
    { name: 'Doppler Effect', formula: 'f′ = f((v ± v₀) / (v ∓ vₛ))', description: 'Doppler effect formula (source and observer motion)' },
    { name: 'Wave Speed on a String', formula: 'v = √(F_T / μ)', description: 'Speed of wave on string (tension and mass per length)' },
    { name: 'Standing Wave (Strings/Open Pipes)', formula: 'L = nλ / 2', description: 'For strings and open pipes' },
    { name: 'Standing Wave (Closed Pipe)', formula: 'L = (2n − 1)λ / 4', description: 'Harmonics in closed pipes' }
  ]
},
{
  id: 'electrostatics',
  name: 'Electrostatics',
  formulas: [
    { name: "Coulomb's Law", formula: 'F = k_e * q1 * q2 / r²', description: "Coulomb’s law for electric force" },
    { name: "Electric Field (Force per Charge)", formula: 'E = F / q', description: "Electric field as force per unit charge" },
    { name: "Electric Field (Point Charge)", formula: 'E = k_e * q / r²', description: "Electric field due to a point charge" },
    { name: "Gauss’s Law", formula: 'Φ_E = q_in / ε₀', description: "Gauss's law for electric flux" },
    { name: "Electric Potential (Point Charge)", formula: 'V = k_e * q / r', description: "Electric potential due to point charge" },
    { name: "Potential Difference", formula: 'ΔV = −∫ E · ds', description: "Electric potential difference" },
    { name: "Electric Potential Energy", formula: 'U = qV', description: "Electric potential energy" },
    { name: "Capacitance Definition", formula: 'C = Q / V', description: "Capacitance definition" },
    { name: "Parallel Plate Capacitance", formula: 'C = ε₀ * A / d', description: "Capacitance of parallel-plate capacitor" },
    { name: "Capacitor Energy", formula: 'U = (1/2) C V²', description: "Energy stored in a capacitor" },
    { name: "Field Between Plates", formula: 'E = V / d', description: "Electric field between parallel plates" },
    { name: "Capacitors in Series", formula: '1 / C_eq = ∑ (1 / C_i)', description: "Capacitors in series" },
    { name: "Capacitors in Parallel", formula: 'C_eq = ∑ C_i', description: "Capacitors in parallel" }
  ]
},
{
  id: 'electricCircuits',
  name: 'Electric Circuits',
  formulas: [
    { name: "Electric Current", formula: 'I = Q / t', description: "Electric current (charge per unit time)" },
    { name: "Ohm's Law", formula: 'V = IR', description: "Ohm’s Law (voltage = current × resistance)" },
    { name: "Resistance (Material)", formula: 'R = ρ * L / A', description: "Resistance in terms of material properties" },
    { name: "Electric Power", formula: 'P = IV', description: "Electric power (current × voltage)" },
    { name: "Power (Alternate Forms)", formula: 'P = I²R = V² / R', description: "Alternate forms of electrical power" },
    { name: "Resistors in Series", formula: 'R_eq = ∑ R_i', description: "Total resistance in series" },
    { name: "Resistors in Parallel", formula: '1 / R_eq = ∑ (1 / R_i)', description: "Total resistance in parallel" },
    { name: "Terminal Voltage", formula: 'V = E − Ir', description: "Terminal voltage of a battery (internal resistance)" },
    { name: "Kirchhoff’s Junction Rule", formula: '∑ I_in = ∑ I_out', description: "Conservation of charge" },
    { name: "Kirchhoff’s Loop Rule", formula: '∑ V = 0', description: "Conservation of energy in a loop" },
    { name: "Charge Transferred", formula: 'Q = It', description: "Charge transferred in a time t" },
    { name: "Time Constant", formula: 'τ = RC', description: "Time constant in RC circuits" },
    { name: "Charging Capacitor", formula: 'V(t) = V₀(1 − e^(−t/RC))', description: "Charging a capacitor" },
    { name: "Discharging Capacitor", formula: 'V(t) = V₀ e^(−t/RC)', description: "Discharging a capacitor" }
  ]
},
{
  id: 'magnetism',
  name: 'Magnetism',
  formulas: [
    { name: "Magnetic Force (Charge)", formula: 'F = qvB sinθ', description: "Magnetic force on a moving charge" },
    { name: "Magnetic Force (Wire)", formula: 'F = ILB sinθ', description: "Magnetic force on a current-carrying wire" },
    { name: "Magnetic Field (Straight Wire)", formula: 'B = (μ₀I) / (2πr)', description: "Magnetic field around a long straight wire" },
    { name: "Magnetic Field (Loop Center)", formula: 'B = (μ₀NI) / (2R)', description: "Magnetic field at the center of a circular loop" },
    { name: "Magnetic Flux", formula: 'Φ_B = B ⋅ A cosθ', description: "Magnetic flux" },
    { name: "Faraday’s Law", formula: 'E = −dΦ_B/dt', description: "Faraday’s law of induction" },
    { name: "Inductor EMF", formula: 'E = −L (dI/dt)', description: "EMF induced in an inductor" },
    { name: "Inductor Energy", formula: 'U = (1/2)LI²', description: "Energy stored in an inductor" },
    { name: "Lorentz Force", formula: 'F = q(E + v × B)', description: "Lorentz force (electric + magnetic)" },
    { name: "Torque on Loop", formula: 'τ = NIBA sinθ', description: "Torque on a current loop in a magnetic field" },
    { name: "Solenoid Field", formula: 'B = μ₀nI', description: "Magnetic field in a solenoid" },
    { name: "Magnetic Dipole Moment", formula: 'μ = NIA', description: "Magnetic dipole moment" }
  ]
},
{
  id: 'electromagnetic-induction',
  name: 'Electromagnetic Induction',
  formulas: [
    { name: "Magnetic Flux", formula: 'Φ_B = B ⋅ A cosθ', description: "Magnetic flux through a surface" },
    { name: "Faraday’s Law", formula: 'E = −dΦ_B/dt', description: "Induced EMF is rate of change of magnetic flux" },
    { name: "Inductor EMF", formula: 'E = −L (dI/dt)', description: "EMF across an inductor" },
    { name: "Inductance", formula: 'L = NΦ_B / I', description: "Inductance of a coil" },
    { name: "Inductor Energy", formula: 'U = (1/2)LI²', description: "Energy stored in an inductor" },
    { name: "Motional EMF", formula: 'E_motional = Blv', description: "Motional EMF (conductor of length *l* moving at speed *v*)" },
    { name: "Induced Current", formula: 'I = E / R', description: "Induced current (Ohm’s law)" },
    { name: "Time Constant (RL)", formula: 'τ = L / R', description: "Time constant of an RL circuit" },
    { name: "Current in RL Circuit (Growth)", formula: 'I(t) = (E/R)(1 − e^(−t/τ))', description: "Current in an RL circuit (growth)" },
    { name: "Current in RL Circuit (Decay)", formula: 'I(t) = I₀ e^(−t/τ)', description: "Current in an RL circuit (decay)" }
  ]
},
{
  id: 'electromagnetic-waves',
  name: 'Electromagnetic Waves',
  formulas: [
    { name: "Speed of Light", formula: 'c = 1 / √(μ₀ε₀)', description: "Speed of light in vacuum" },
    { name: "Wave Speed Relation", formula: 'c = fλ', description: "Relationship between wave speed, frequency, and wavelength" },
    { name: "Field Relationship", formula: 'E = cB', description: "Relationship between electric and magnetic fields in an EM wave" },
    { name: "Intensity of EM Wave", formula: 'I = (1/2)ε₀cE²', description: "Intensity of an electromagnetic wave" },
    { name: "Poynting Vector", formula: 'S = (1/μ₀)(E × B)', description: "Poynting vector (power per unit area)" },
    { name: "Average Poynting Vector", formula: '⟨S⟩ = (1/2)ε₀cE₀²', description: "Average power in an EM wave" },
    { name: "Power Delivered", formula: 'P = IA', description: "Power delivered by a wave over area A" },
    { name: "Wavelength in Vacuum", formula: 'λ = c / f', description: "Wavelength of an EM wave in vacuum" }
  ]
},
{
  id: 'geometrical-optics',
  name: 'Geometrical Optics',
  formulas: [
    { name: "Index of Refraction", formula: 'n = c / v', description: "Ratio of light speed in vacuum to medium" },
    { name: "Snell’s Law", formula: 'n₁sinθ₁ = n₂sinθ₂', description: "Refraction of light between two media" },
    { name: "Critical Angle", formula: 'θc = sin⁻¹(n₂ / n₁)', description: "Critical angle for total internal reflection" },
    { name: "Magnification", formula: 'm = hi / ho = -q / p', description: "Magnification of an image" },
    { name: "Thin Lens/Mirror Equation", formula: '1/f = 1/p + 1/q', description: "Mirror/lens equation (thin lens formula)" },
    { name: "Focal Length", formula: 'f = R / 2', description: "Focal length of a spherical mirror" },
    { name: "Lens Power", formula: 'P = 1 / f', description: "Optical power of a lens (diopters if f in meters)" },
    { name: "Total Magnification", formula: 'M = M₁ × M₂ × …', description: "Total magnification for multiple lenses" }
  ]
},
{
  id: 'physical-optics',
  name: 'Physical Optics',
  formulas: [
    { name: "Path Difference", formula: 'ΔL = d sinθ', description: "Path difference in interference" },
    { name: "Constructive Interference", formula: 'd sinθ = mλ', description: "Bright fringes (constructive interference)" },
    { name: "Destructive Interference", formula: 'd sinθ = (m + 1/2)λ', description: "Dark fringes (destructive interference)" },
    { name: "Fringe Position", formula: 'yₘ = mλL / d', description: "Position of m-th fringe in Young’s double slit experiment" },
    { name: "Fringe Spacing", formula: 'Δx = λL / d', description: "Fringe spacing in double slit interference" },
    { name: "Diffraction Limit", formula: 'θ = 1.22 λ / D', description: "Diffraction limit for a circular aperture" },
    { name: "Polarization Intensity", formula: 'I = I₀ cos²θ', description: "Intensity of polarized light through analyzer" },
    { name: "de Broglie Wavelength", formula: 'λ = h / p', description: "Wavelength of a particle (wave-particle duality)" }
  ]
},
{
  id: 'modern-physics',
  name: 'Modern Physics',
  formulas: [
    { name: "Photon Energy (Frequency)", formula: 'E = hf', description: "Energy of a photon (Planck’s relation)" },
    { name: "Photon Energy (Wavelength)", formula: 'E = hc / λ', description: "Photon energy in terms of wavelength" },
    { name: "Photoelectric Effect", formula: 'K_max = hf − ϕ', description: "Maximum kinetic energy of photoelectrons" },
    { name: "Photon Momentum", formula: 'p = h / λ', description: "Momentum of a photon (de Broglie relation)" },
    { name: "Mass-Energy Equivalence", formula: 'E = mc²', description: "Energy associated with mass" },
    { name: "Mass Change Energy", formula: 'ΔE = Δm ⋅ c²', description: "Energy released from mass defect" },
    { name: "de Broglie Wavelength (Particles)", formula: 'λ = h / (mv)', description: "Wavelength of matter waves for particles" },
    { name: "Lorentz Factor", formula: 'γ = 1 / √(1 − v²/c²)', description: "Relativistic factor in special relativity" },
    { name: "Time Dilation", formula: 't = γ ⋅ t₀', description: "Moving clocks tick slower" },
    { name: "Length Contraction", formula: 'L = L₀ / γ', description: "Moving objects appear shorter" },
    { name: "Relativistic Energy", formula: 'E² = (pc)² + (m₀c²)²', description: "Total energy of a relativistic particle" }
  ]
},
{
  id: 'nuclear-physics',
  name: 'Nuclear Physics',
  formulas: [
    { name: "Binding Energy", formula: 'E = Δm ⋅ c²', description: "Nuclear binding energy from mass defect" },
    { name: "Radioactive Decay Law (Activity)", formula: 'A = A₀ ⋅ e^(−λt)', description: "Activity decreases exponentially over time" },
    { name: "Radioactive Decay Law (Nuclei)", formula: 'N = N₀ ⋅ e^(−λt)', description: "Number of undecayed nuclei over time" },
    { name: "Decay Constant", formula: 'λ = ln(2) / T₁/₂', description: "Relates decay constant to half-life" },
    { name: "Number Density", formula: 'R = ρ ⋅ N_A / M', description: "Number of nuclei per unit volume" },
    { name: "Energy Released in Reactions", formula: 'Q = (m_initial − m_final) ⋅ c²', description: "Energy released in nuclear reactions from mass difference" },
    { name: "Activity", formula: 'A = λ ⋅ N', description: "Radioactive decay rate" }
  ]
},
{
  id: 'quantum-physics',
  name: 'Quantum Physics',
  formulas: [
    { name: "Wave Function", formula: 'Ψ(x, t)', description: "Describes the quantum state of a system" },
    { name: "Momentum Operator", formula: 'p̂ = −iℏ d/dx', description: "Operator for momentum in position space" },
    { name: "Hamiltonian Operator", formula: 'Ĥ = −(ℏ² / 2m) ⋅ d²/dx² + V(x)', description: "Total energy operator in quantum mechanics" },
    { name: "Time-Independent Schrödinger Equation", formula: 'ĤΨ = EΨ', description: "Determines allowed energy levels of a system" },
    { name: "Uncertainty Principle", formula: 'Δx ⋅ Δp ≥ ℏ / 2', description: "Limits precision of simultaneous position and momentum measurements" },
    { name: "Energy-Time Uncertainty", formula: 'ΔE ⋅ Δt ≥ ℏ / 2', description: "Limits precision of energy and time measurements" },
    { name: "1D Infinite Well Energy Levels", formula: 'Eₙ = (n²h²) / (8mL²)', description: "Quantized energy levels in a one-dimensional box" },
    { name: "de Broglie Wavelength", formula: 'λ = h / p', description: "Wavelength associated with a particle" },
    { name: "Photon Energy", formula: 'E = hf', description: "Energy of a photon related to its frequency" }
  ]
},
{
  id: 'particle-physics',
  name: 'Particle Physics',
  formulas: [
    { name: "Elementary Charge", formula: 'q = ±e', description: "Charge of elementary particles (e.g., electron, proton)" },
    { name: "Rest Energy", formula: 'E = mc²', description: "Energy due to mass of a particle at rest" },
    { name: "Quantum Number Conservation", formula: 'Q = B + S + C + B′ + T', description: "Conservation of baryon number, strangeness, charm, bottomness, and topness" },
    { name: "Feynman Diagrams", formula: 'Visual', description: "Graphical representation of particle interactions (not a formula)" },
    { name: "Gell-Mann–Nishijima Formula", formula: 'Q = I₃ + Y/2', description: "Relates charge to isospin and hypercharge" },
    { name: "Mass Defect", formula: 'Δm = m_initial − m_final', description: "Difference in mass before and after a particle decay or reaction" },
    { name: "Energy-Momentum Relation", formula: 'E² = (pc)² + (m₀c²)²', description: "Relativistic energy equation (repetition for context)" }
  ]
},

    {
      id: 'relativity',
      name: 'Relativity',
      formulas: [
        { name: 'Time Dilation', formula: 'Δt = Δt₀ / √(1 - v²/c²)', description: 'Moving clocks run slow' },
        { name: 'Length Contraction', formula: 'L = L₀√(1 - v²/c²)', description: 'Moving objects shorten' },
        { name: 'Relativistic Momentum', formula: 'p = γmv', description: 'Momentum with relativity' },
      ]
    },
    {
      id: 'cosmology',
      name: 'Cosmology and Astrophysics',
      formulas: [
        { name: 'Hubble’s Law', formula: 'v = H₀d', description: 'Recession velocity of galaxies' },
        { name: 'Luminosity-Distance', formula: 'L = 4πd²F', description: 'Brightness of celestial objects' },
        { name: 'Schwarzschild Radius', formula: 'rₛ = 2GM/c²', description: 'Radius of a black hole' },
      ]
    }
  ];

  return (
    <HolographicPanel title="Engineering Formulas">
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {categories.map((category) => (
          <div key={category.id} className="border border-cyan-900/30 rounded-md overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-3 bg-cyan-900/20 hover:bg-cyan-900/30 text-left"
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            >
              <span className="font-semibold text-cyan-300">{category.name}</span>
              {expandedCategory === category.id ? (
                <ChevronUp className="w-4 h-4 text-cyan-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-cyan-500" />
              )}
            </button>

            {expandedCategory === category.id && (
              <div className="p-3 bg-black/20">
                <div className="space-y-3">
                  {category.formulas.map((formula, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-semibold text-cyan-400">{formula.name}</div>
                      <div className="font-mono text-cyan-300 bg-black/30 px-2 py-1 rounded mt-1 mb-1">
                        {formula.formula}
                      </div>
                      <div className="text-xs text-cyan-500/80">{formula.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </HolographicPanel>
  );
};
