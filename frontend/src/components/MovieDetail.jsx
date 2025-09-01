import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockMovies } from "../mockMovies";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const foundMovie = mockMovies.find(m => m.id === parseInt(id));
    setMovie(foundMovie);
    
    const savedWatchlist = JSON.parse(localStorage.getItem('retroflix-watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, [id]);

  const isInWatchlist = movie && watchlist.some(m => m.id === movie.id);

  const addToWatchlist = () => {
    if (movie && !isInWatchlist) {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = () => {
    if (movie && isInWatchlist) {
      const newWatchlist = watchlist.filter(m => m.id !== movie.id);
      setWatchlist(newWatchlist);
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist));
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Film non trovato</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          to="/catalogo" 
          className="inline-flex items-center text-red-500 hover:text-red-400 mb-6"
        >
          ← Torna al catalogo
        </Link>
        
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
              <p className="text-gray-400 text-lg mb-6">Anno: {movie.year}</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.description}</p>
              
              <div className="flex space-x-4">
                {isInWatchlist ? (
                  <button
                    onClick={removeFromWatchlist}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Rimuovi dalla Watchlist
                  </button>
                ) : (
                  <button
                    onClick={addToWatchlist}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Aggiungi alla Watchlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}