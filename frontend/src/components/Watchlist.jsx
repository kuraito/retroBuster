import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Watchlist() {
  // Stato per memorizzare i film nella watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Carica la watchlist dal localStorage al primo render del componente
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('retroflix-watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  // Funzione per rimuovere un film dalla watchlist
  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(newWatchlist); // Aggiorna lo stato locale
    localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist)); // Salva nel localStorage
  };

  // Se la watchlist è vuota, mostra un messaggio con invito all'azione
  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-retro-gradient py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Titolo della pagina */}
          <h1 className="text-4xl font-retro font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 neon-text">
            LA MIA WATCHLIST
          </h1>
          
          {/* Messaggio di watchlist vuota */}
          <div className="text-center py-16">
            <div className="mb-8">
              {/* Icona decorativa */}
              <div className="text-8xl text-purple-400 mb-4 neon-text">📺</div>
              <div className="text-cyan-400 text-2xl font-retro mb-4 neon-text">WATCHLIST VUOTA</div>
              <div className="text-purple-300 font-mono-retro text-lg">NON HAI ANCORA AGGIUNTO NESSUN FILM ALLA TUA LISTA</div>
            </div>
            
            {/* Pulsante per andare al catalogo */}
            <Link 
              to="/catalogo" 
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-md font-retro font-bold transition-all duration-300 border-2 border-pink-400 neon-box transform hover:scale-105"
            >
              ESPLORA IL CATALOGO
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Se ci sono film nella watchlist, mostra la griglia
  return (
    <div className="min-h-screen bg-retro-gradient py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titolo della pagina */}
        <h1 className="text-4xl font-retro font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 neon-text">
          LA MIA WATCHLIST
        </h1>
        
        {/* Contatore dei film nella watchlist */}
        <div className="mb-8 text-center">
          <p className="text-purple-300 font-mono-retro text-lg">
            {watchlist.length} FILM NELLA TUA LISTA
          </p>
        </div>
        
        {/* Griglia dei film nella watchlist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map(movie => (
            // Card per ogni film nella watchlist
            <div key={movie.id} className="bg-retro-card rounded-lg shadow-lg overflow-hidden border-2 border-purple-500/30 hover:border-pink-500 transition-all duration-300 transform hover:scale-105">
              {/* Immagine del film */}
              <div className="relative overflow-hidden">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Contenuto della card */}
              <div className="p-4 bg-gradient-to-b from-purple-900/50 to-purple-900/80">
                {/* Titolo del film */}
                <h3 className="text-lg font-retro font-bold text-cyan-300 mb-2 neon-text">{movie.title}</h3>
                
                {/* Anno del film */}
                <p className="text-pink-400 text-sm font-mono-retro mb-3">ANNO: {movie.year}</p>
                
                {/* Descrizione del film (limitata a 3 righe) */}
                <p className="text-purple-200 text-sm mb-4 line-clamp-3 font-mono-retro leading-relaxed">
                  {movie.description}
                </p>
                
                {/* Pulsanti di azione */}
                <div className="flex space-x-2">
                  {/* Pulsante per vedere i dettagli */}
                  <Link 
                    to={`/film/${movie.id}`}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-mono-retro font-bold transition-all duration-300 text-center border border-pink-400 hover:border-cyan-400 neon-box"
                  >
                    DETTAGLI
                  </Link>
                  
                  {/* Pulsante per rimuovere dalla watchlist */}
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-md text-sm font-mono-retro font-bold transition-all duration-300 border border-red-400 hover:border-yellow-400 neon-box"
                  >
                    RIMUOVI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}