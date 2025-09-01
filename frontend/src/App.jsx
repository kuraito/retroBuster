
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import FilmDetail from "./pages/FilmDetail";
import WatchlistPage from "./pages/WatchlistPage";
import Login from "./pages/Login";

export default function App() {
  return (
    // Container principale dell'app con sfondo retro
    <div className="min-h-screen bg-retro-gradient">
      {/* Barra di navigazione sticky */}
      <Navbar />
      
      {/* Contenuto principale delle pagine */}
      <main>
        <Routes>
          {/* Rotta per la homepage */}
          <Route path="/" element={<Home />} />
          {/* Rotta per il catalogo completo */}
          <Route path="/catalogo" element={<Catalogo />} />
          {/* Rotta per il dettaglio di un singolo film (con parametro id) */}
          <Route path="/film/:id" element={<FilmDetail />} />
          {/* Rotta per la watchlist dell'utente */}
          <Route path="/watchlist" element={<WatchlistPage />} />
          {/* Rotta per la pagina di login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

