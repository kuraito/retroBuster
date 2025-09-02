import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  // hook per ottenere il location (URL) corrente
  
  // Funzione per controllare se il link è attivo
  // controlla il path corrente con quello del link
  const isActive = (path) => location.pathname === path;
  
  return (
    // Navbar principale con tema retro più sobrio
    /*
      - **sticky top-0**: Navbar rimane fissa in alto durante lo scroll
      - **z-50**: Z-index alto per stare sopra altri elementi
      - **bg-gradient-to-r**: Gradiente orizzontale con 3 color stops
      - **border-purple-500/30**: Bordo con opacity del 30% 
    */
    <nav className="bg-gradient-to-r from-purple-800 via-blue-900 to-purple-800 shadow-lg sticky top-0 z-50 border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo con font retro senza effetto glitch */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-retro font-bold text-rose-400">
              RETROFLIX
            </span>
          </Link>
          
          {/* Menu di navigazione con stile più sobrio */}
          <div className="flex space-x-6">
            {/* Bottone nella navbar per tornare alla HOME */}
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-rose-600 text-white border border-rose-400' 
                  : 'text-cyan-300 hover:text-rose-400 hover:bg-purple-800/50'
              }`}
            >
              HOME
            </Link>
            
            {/* Bottone nella navbar per tornare all Catalogo */}
            <Link 
              to="/catalogo" 
              className={`px-3 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 ${
                isActive('/catalogo') 
                  ? 'bg-rose-600 text-white border border-rose-400' 
                  : 'text-cyan-300 hover:text-rose-400 hover:bg-purple-800/50'
              }`}
            >
              CATALOGO
            </Link>
            
            {/* Bottone nella navbar per tornare alla Watchlist */}
            <Link 
              to="/watchlist" 
              className={`px-3 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 ${
                isActive('/watchlist') 
                  ? 'bg-rose-600 text-white border border-rose-400' 
                  : 'text-cyan-300 hover:text-rose-400 hover:bg-purple-800/50'
              }`}
            >
              WATCHLIST
            </Link>
            
            {/* Bottone nella navbar per tornare al Login */}
            <Link 
              to="/login" 
              className={`px-3 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 ${
                isActive('/login') 
                  ? 'bg-rose-600 text-white border border-rose-400' 
                  : 'text-cyan-300 hover:text-rose-400 hover:bg-purple-800/50'
              }`}
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}