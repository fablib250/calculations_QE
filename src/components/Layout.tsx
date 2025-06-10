import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Atom, Calculator, Database, Home, MessageSquare, Menu, X } from 'lucide-react';
import { SystemStatus } from './SystemStatus';
import { ParticleBackground } from './ParticleBackground';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { to: '/computation', label: 'Materials Computation', icon: <Atom className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono relative overflow-hidden">
      <ParticleBackground />

      <header className="border-b border-cyan-800/50 bg-black/50 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/70 flex items-center justify-center relative overflow-hidden">
              <span className="text-cyan-300 font-bold text-lg">MSA</span>
              <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MATERIAL SCIENCE AGENT <span className="text-xs align-top text-cyan-500">v1.0</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SystemStatus />
            <div className="text-sm text-cyan-300">
              {systemTime.toLocaleTimeString()} | {systemTime.toLocaleDateString()}
            </div>
          </div>

          <button
            className="md:hidden bg-cyan-900/30 p-2 rounded-md border border-cyan-700/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-60px)]">
        <nav
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block bg-black/60 backdrop-blur-sm border-r border-cyan-800/50 w-full md:w-64 absolute md:relative z-10`}
        >
          <ul className="py-4">
            {navItems.map(({ to, label, icon }) => (
              <li key={to} className="px-4 py-2">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 w-full px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-900/60 text-cyan-300 border-l-2 border-cyan-400'
                        : 'hover:bg-cyan-900/30 text-cyan-500/80'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div>{icon}</div>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-grow p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};