import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockMovies } from "../mockMovies";

export default function MovieDetail() {
  const { id } = useParams(); //prende l'id dalla url
  const [movie, setMovie] = useState(null); // stato per il film corrente
  const [watchlist, setWatchlist] = useState([]); // stato per la watchlist

  useEffect(() => { //quando il componente si inizializza o cambia l'id
    const foundMovie = mockMovies.find(m => m.id === parseInt(id)); //trova il film con l'id giusto
    setMovie(foundMovie); //aggiorna lo stato del film corrente
    
    const savedWatchlist = JSON.parse(localStorage.getItem('retroflix-watchlist') || '[]'); //carica la watchlist dal localStorage
    setWatchlist(savedWatchlist); //aggiorna lo stato della watchlist
  }, [id]); //si attiva quando cambia l'id

  const isInWatchlist = movie && watchlist.some(m => m.id === movie.id); //controlla se il film è già nella watchlist

  const addToWatchlist = () => { //aggiunge alla watchlist
    if (movie && !isInWatchlist) { //se il film esiste e non è già nella watchlist
      const newWatchlist = [...watchlist, movie]; //aggiunge il film alla watchlist
      setWatchlist(newWatchlist); // aggiorna lo stato della watchlist
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist)); //salva la watchlist nel localStorage
    }
  };

  const removeFromWatchlist = () => { //rimuove dalla watchlist
    if (movie && isInWatchlist) { //se il film esiste e è già nella watchlist
      const newWatchlist = watchlist.filter(m => m.id !== movie.id); //rimuove il film dalla watchlist
      // rimuove il film con id uguale a movie.id 
      //m ogni film nella watchlist m.id è l'id del film e movie.id è l'id del film corrente
      setWatchlist(newWatchlist); // aggiorna lo stato della watchlist
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist)); //salva la watchlist nel localStorage
    }
  };

  if (!movie) { //se il film non esiste
    return ( //mostra messaggio di errore
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Film non trovato</div>
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