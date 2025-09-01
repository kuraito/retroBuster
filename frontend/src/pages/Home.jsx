import React from "react";
import { Link } from "react-router-dom";
import { mockMovies } from "../mockMovies";
import MovieCard from "../components/MovieCard";

export default function Home() {
  // Seleziona i primi 3 film per la sezione in evidenza
  const featuredMovies = mockMovies.slice(0, 3);

  return (
    // Container principale con sfondo retro più sobrio
    <div className="min-h-screen bg-retro-gradient">
      {/* Sezione Hero con design più pulito */}
      <section className="relative bg-gradient-to-br from-purple-800 via-blue-900 to-purple-800 py-20 overflow-hidden">
        {/* Elementi decorativi di sfondo più soft */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 border-2 border-cyan-400 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-rose-400 rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-30"></div>
        </div>
        
        {/* Contenuto principale della hero */}
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Titolo principale senza effetto glitch */}
          <h1 className="text-5xl md:text-7xl font-retro font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-cyan-400 to-purple-400 mb-6">
            Retroflix
          </h1>
          
          {/* Sottotitolo con font mono retro */}
          <p className="text-xl md:text-2xl text-cyan-200 mb-4 max-w-3xl mx-auto font-mono-retro leading-relaxed">
            Il portale definitivo per i veri amanti del cinema retrò
          </p>
          
          {/* Descrizione aggiuntiva */}
          <p className="text-lg text-purple-200 mb-12 max-w-xl mx-auto font-mono-retro">
            Scopri, colleziona e rivivi i capolavori cinematografici fino al 2010
          </p>
          
          {/* Pulsanti di azione con stile più sobrio */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Pulsante Esplora Catalogo */}
            <Link 
              to="/catalogo"
              className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white px-8 py-3 rounded-md text-lg font-retro font-medium transition-all duration-300 transform hover:scale-105 border border-rose-400/50"
            >
              Esplora Catalogo
            </Link>
            
            {/* Pulsante Watchlist */}
            <Link 
              to="/watchlist"
              className="bg-transparent border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-purple-900 px-8 py-3 rounded-md text-lg font-retro font-medium transition-all duration-300 transform hover:scale-105"
            >
              La Mia Watchlist
            </Link>
          </div>
        </div>
      </section>

      {/* Sezione Film in Evidenza */}
      <section className="py-16 bg-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Titolo della sezione più soft */}
          <h2 className="text-3xl font-retro font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
            Film in Evidenza
          </h2>
          
          {/* Griglia dei film in evidenza */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {/* Pulsante per vedere tutti i film */}
          <div className="text-center mt-12">
            <Link 
              to="/catalogo"
              className="inline-block bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-3 rounded-md font-retro font-medium transition-all duration-300 border border-purple-400/50 transform hover:scale-105"
            >
              Vedi Tutti i Film
            </Link>
          </div>
        </div>
      </section>

      {/* Sezione Caratteristiche con design più pulito */}
      <section className="bg-gradient-to-r from-purple-800 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Caratteristica 1: Film Classici */}
            <div className="p-6 bg-retro-card rounded-lg border border-cyan-400/30 hover:border-rose-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4 text-cyan-400">🎬</div>
              <h3 className="text-xl font-retro font-bold text-rose-400 mb-2">Film Classici</h3>
              <p className="text-purple-200 font-mono-retro">Una selezione curata dei migliori film fino al 2010</p>
            </div>
            
            {/* Caratteristica 2: Watchlist Personale */}
            <div className="p-6 bg-retro-card rounded-lg border border-rose-400/30 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4 text-rose-400">📋</div>
              <h3 className="text-xl font-retro font-bold text-cyan-400 mb-2">Watchlist Personale</h3>
              <p className="text-purple-200 font-mono-retro">Salva i tuoi film preferiti per guardarli dopo</p>
            </div>
            
            {/* Caratteristica 3: Ricerca Avanzata */}
            <div className="p-6 bg-retro-card rounded-lg border border-purple-400/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4 text-yellow-400">🔍</div>
              <h3 className="text-xl font-retro font-bold text-yellow-400 mb-2">Ricerca Avanzata</h3>
              <p className="text-purple-200 font-mono-retro">Trova facilmente i film per titolo o anno</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}