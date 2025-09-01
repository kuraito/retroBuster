import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, onAddToWatchlist, isInWatchlist }) {
  // Funzione per gestire l'aggiunta alla watchlist
  const handleAddToWatchlist = (e) => {
    e.preventDefault(); // Previene la navigazione del link
    if (onAddToWatchlist && !isInWatchlist) {
      onAddToWatchlist(movie);
    }
  };

  return (
    // Card principale con design retro e effetti neon
    <div className="bg-retro-card rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 border-2 border-purple-500/30 hover:border-pink-500">
      {/* Immagine del film */}
      <div className="relative overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Overlay con gradiente retro */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Contenuto della card */}
      <div className="p-4 bg-gradient-to-b from-purple-900/30 to-purple-900/60">
        {/* Titolo del film */}
        <h3 className="text-lg font-retro font-bold text-cyan-300 mb-2">{movie.title}</h3>
        
        {/* Anno del film */}
        <p className="text-rose-400 text-sm font-mono-retro mb-3">Anno: {movie.year}</p>
        
        {/* Descrizione del film */}
        <p className="text-purple-200 text-sm mb-4 line-clamp-3 font-mono-retro leading-relaxed">
          {movie.description}
        </p>
        
        {/* Pulsanti di azione */}
        <div className="flex space-x-2">
          {/* Pulsante Dettagli */}
          <Link 
            to={`/film/${movie.id}`}
            className="flex-1 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 text-center border border-rose-400/50"
          >
            Dettagli
          </Link>
          
          {/* Pulsante Watchlist (se disponibile) */}
          {onAddToWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              disabled={isInWatchlist} // Disabilita se già nella watchlist
              className={`px-4 py-2 rounded-md text-sm font-mono-retro font-medium transition-all duration-300 border ${
                isInWatchlist 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-cyan-400/50'
              }`}
            >
              {isInWatchlist ? '✓ Aggiunto' : '+ Lista'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
