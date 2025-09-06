import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { movieService } from "../services/api"; // ✅ Importa il servizio API
import { mockMovies } from "../mockMovies"; // 🔧 Mantieni come fallback

export default function MovieDetail() {
  const { id } = useParams(); // Prende l'ID dalla URL
  const [movie, setMovie] = useState(null); // Stato per il film corrente
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Stato per errori
  const [watchlist, setWatchlist] = useState([]); // Stato per la watchlist

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Caricamento film con ID: ${id}`);
        
        // 🎯 STRATEGIA 1: Prova a caricare dal backend
        try {
          const movieFromAPI = await movieService.getMovieById(id);
          setMovie(movieFromAPI);
          console.log('✅ Film caricato dal backend:', movieFromAPI.title);
          
        } catch (apiError) {
          console.log('⚠️ Backend fallito, uso dati locali...');
          // 🔧 STRATEGIA 2: Fallback ai dati locali
          const foundMovie = mockMovies.find(m => m.id === parseInt(id));
          if (foundMovie) {
            setMovie(foundMovie);
            console.log('🔧 Film trovato nei dati locali:', foundMovie.title);
          } else {
            throw new Error('Film non trovato');
          }
        }
        
      } catch (completeError) {
        console.error('❌ Errore nel caricamento del film:', completeError);
        setError('Film non trovato o errore nel caricamento');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovie();
    }
    
    // Carica watchlist dal localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('retroflix-watchlist') || '[]');
    setWatchlist(savedWatchlist);
    
  }, [id]); // Si attiva quando cambia l'ID

  // 🔍 FUNZIONI PER GESTIRE LA WATCHLIST
  const movieId = movie?._id || movie?.id; // Usa _id dal database o id come fallback
  const isInWatchlist = movie && watchlist.some(m => (m._id || m.id) === movieId);

  const addToWatchlist = () => {
    if (movie && !isInWatchlist) {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist));
      console.log('➕ Film aggiunto alla watchlist:', movie.title);
    }
  };

  const removeFromWatchlist = () => {
    if (movie && isInWatchlist) {
      const newWatchlist = watchlist.filter(m => (m._id || m.id) !== movieId);
      setWatchlist(newWatchlist);
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist));
      console.log('➖ Film rimosso dalla watchlist:', movie.title);
    }
  };

  // 🔄 GESTIONE STATI DI CARICAMENTO
  if (loading) {
    return (
      <div className="min-h-screen bg-retro-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyan-400 text-2xl font-retro neon-text mb-4">
            CARICAMENTO FILM...
          </div>
          <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-retro-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-2xl font-retro neon-text mb-4">
            ❌ ERRORE
          </div>
          <div className="text-purple-300 font-mono-retro mb-6">
            {error}
          </div>
          <Link 
            to="/catalogo"
            className="inline-block bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-3 rounded-md font-retro font-medium transition-all duration-300"
          >
            ← TORNA AL CATALOGO
          </Link>
        </div>
      </div>
    );
  }

  // ❌ Se il film non esiste dopo il caricamento
  if (!movie) {
    return (
      <div className="min-h-screen bg-retro-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-purple-300 text-2xl font-retro neon-text mb-4">
            FILM NON TROVATO
          </div>
          <Link 
            to="/catalogo"
            className="inline-block bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-3 rounded-md font-retro font-medium transition-all duration-300"
          >
            ← TORNA AL CATALOGO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      {/* Container centrato con larghezza massima e padding orizzontale */}
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Link di ritorno al catalogo con icona freccia */}
        <Link 
          to="/catalogo" 
          className="inline-flex items-center text-red-500 hover:text-red-400 mb-6"
        >
          ← Torna al catalogo
        </Link>
        
        {/* Card principale del film con sfondo scuro, bordi arrotondati e ombra */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Layout flex per desktop (affiancati), stack verticale su mobile */}
          <div className="md:flex">
            
            {/* Sezione poster del film (1/3 della larghezza su desktop) */}
            <div className="md:w-1/3">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover" // Immagine che riempie tutto lo spazio disponibile
              />
            </div>
            
            {/* Sezione informazioni del film (2/3 della larghezza su desktop) */}
            <div className="md:w-2/3 p-8">
              {/* Titolo del film in grande e grassetto */}
              <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
              
              {/* Anno di uscita del film in grigio */}
              <p className="text-gray-400 text-lg mb-6">Anno: {movie.year}</p>
              
              {/* Descrizione completa del film con interlinea rilassata */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.description}</p>
              
              {/* Container per i pulsanti con spazio tra di essi */}
              <div className="flex space-x-4">
                {/* Rendering condizionale: mostra pulsante diverso in base se il film è nella watchlist */}
                {isInWatchlist ? (
                  // Pulsante ROSSO per rimuovere dalla watchlist (quando il film è già salvato)
                  <button
                    onClick={removeFromWatchlist}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Rimuovi dalla Watchlist
                  </button>
                ) : (
                  // Pulsante BLU per aggiungere alla watchlist (quando il film non è salvato)
                  <button
                    onClick={addToWatchlist}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Aggiungi alla Watchlist
                  </button>
                )}
              </div> {/* Fine container pulsanti */}
            </div> {/* Fine sezione informazioni */}
          </div> {/* Fine layout flex */}
        </div> {/* Fine card principale */}
      </div> {/* Fine container centrato */}
    </div>
  );
}