import React, { useState, useEffect } from "react";
import { mockMovies } from "../mockMovies";
import MovieCard from "../components/MovieCard";

export default function Catalogo() {
  // Stati per la gestione dei film e dei filtri
  const [movies, setMovies] = useState(mockMovies); // Film filtrati da mostrare
  //movies array di film a inizio pagina catalogo, setMovies funzione per aggiornarlo
  
  const [searchTerm, setSearchTerm] = useState(""); // Termine di ricerca
  //searchTerm stringa per il filtro di ricerca, setSearchTerm funzione che aggiorna searchTerm

  /*// ESEMPIO PRATICO DELL'HOOK:

      All'inizio
      searchTerm = ""; // Niente scritto

      // Utente scrive "ma"
      setSearchTerm("ma"); // searchTerm = "ma"

      // Utente scrive "matrix"
      setSearchTerm("matrix"); // searchTerm = "matrix" */

  const [selectedYear, setSelectedYear] = useState(""); // Anno selezionato per il filtro
  //selectedYear stringa per il filtro anno, setSelectedYear funzione che aggiorna selectedYear

  const [watchlist, setWatchlist] = useState([]); // Watchlist dell'utente
  //watchlist array di film nella watchlist, setWatchlist funzione che aggiorna watchlist

  // Si usa quando la pagina si carica legge nel localStorage se ci sono film salvati nel browser se li trova li carica
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('retroflix-watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  // FILTRA i film quando cambiano i parametri di ricerca
  // AGGIORNA LA LISTA DEI FILM OGNI VOLTA CHE CAMBIA LA RICERCA O L ANNO DALLA BARRA DI RICERCA
  useEffect(() => {
    let filtered = mockMovies;

    // SI ATTIVA QUANDO SEATCHTERM SI MODIFICA
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) //FILTRA
      );
    }

    // SI ATTIVA QUANDO SELECTEDYEAR SI MODIFICA
    if (selectedYear) {
      filtered = filtered.filter(movie => movie.year.toString() === selectedYear); //FILTRA
    }

    setMovies(filtered); //AGGIORNA LO STATO DEI FILM
  }, [searchTerm, selectedYear]); //ogni volta che cambia searchTerm o selectedYear si attiva questa funzione (dipendenze dell'USEEFFECT)

  // Funzione per aggiungere un film alla watchlist
  //QUANDO SI CLICKA IL BOTTONE
  const addToWatchlist = (movie) => {
    console.log(movie)
    if (!watchlist.some(m => m.id === movie.id)) {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
      localStorage.setItem('retroflix-watchlist', JSON.stringify(newWatchlist));
    }
  };

  // Funzione per controllare se un film è già nella watchlist
  //SEMPRE QUANDO DI CLICKA IL BOTTONE
  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  // Ottieni tutti gli anni unici dai film per il select del filtro
  const years = [...new Set(mockMovies.map(movie => movie.year))].sort((a, b) => b - a);

  return (
    // Container principale con sfondo retro
    <div className="min-h-screen bg-retro-gradient py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titolo della pagina con effetto neon */}
        <h1 className="text-4xl font-retro font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 neon-text">
          CATALOGO FILM
        </h1>
        
        {/* Sezione ricerca e filtri */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Campo di RICERCA */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="CERCA FILM PER TITOLO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //CAMBIA QUINDI IL SEARCHTERM HOOK QAUNDO RICERCA
              className="w-full px-4 py-3 bg-purple-900/50 text-cyan-300 rounded-md border-2 border-pink-500/50 focus:border-cyan-400 focus:outline-none font-mono-retro placeholder-purple-300 neon-box"
            />
          </div>
          
          {/* RICERCA - Filtro per anno */}
          <div className="md:w-48">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)} //CAMBIA QUINDI IL SELECTEDYEAR HOOK QUANDO RICERCA
              className="w-full px-4 py-3 bg-purple-900/50 text-cyan-300 rounded-md border-2 border-pink-500/50 focus:border-cyan-400 focus:outline-none font-mono-retro neon-box"
            >
              {/* ESCONO TUTTI GLI ANNI IN LISTA */}
              <option value="">TUTTI GLI ANNI</option>
              {years.map(year => (
                <option key={year} value={year} className="bg-purple-900 text-cyan-300">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contatore risultati */}
        <div className="mb-6">
          <p className="text-pink-400 font-mono-retro text-lg">
            {movies.length} FILM TROVATI
          </p>
        </div>

        {/* Griglia dei film o messaggio di nessun risultato */}
        {movies.length === 0 ? (
          // Messaggio QUANDO NON CI SONO RISULTATI
          <div className="text-center py-16">
            <div className="text-cyan-400 text-2xl font-retro neon-text">NESSUN FILM TROVATO</div>
            <div className="text-purple-300 font-mono-retro mt-4">PROVA A MODIFICARE I FILTRI DI RICERCA</div>
          </div>
        ) : (
          // Griglia dei FILM TROVATI DALLA RICERCA
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <MovieCard 
                key={movie._id || movie.id} // ✅ Usa _id dal database o id come fallback
                movie={movie} 
                onAddToWatchlist={addToWatchlist} //PASSA LA FUNZIONE DEL BOTTONE AL COMPONENTE MOVIECARD 
                isInWatchlist={isInWatchlist(movie._id || movie.id)} // ✅ Aggiornato anche qui
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}