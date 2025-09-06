
// ===========================================
// 🎬 API ROTTE PER I FILM - RETROFLIX
// ===========================================

/*
🎯 SCOPO: Questo file gestisce tutte le chiamate API per i film
📍 PERCORSO: Quando il frontend chiama /api/movies, arriva qui
🔄 FLUSSO: Frontend → Server.js → Questo file → Database (in futuro)
*/

// 📦 Importa Express per creare le rotte API
const express = require("express");

// 🛣️ Crea un router (gestisce le sotto-rotte di /api/movies)
const router = express.Router();

// 🗄️ Importa il modello per il database
const Movie = require("../models/Movie");

// ===========================================
// 📋 API: OTTIENI TUTTI I FILM
// ===========================================
// URL completo: GET http://localhost:3001/api/movies/
router.get("/", async (req, res) => {
  try {
    console.log('📡 RICHIESTA RICEVUTA: Tutti i film');
    
    // ✅ CARICA I FILM DAL DATABASE MONGODB ATLAS
    console.log('🗄️ Caricamento film dal database...');
    const filmsFromDatabase = await Movie.find({});
    
    console.log(`✅ FILM CARICATI DAL DB: ${filmsFromDatabase.length} film trovati`);
    
    // 📤 Invia i film veri dal database al frontend
    res.json(filmsFromDatabase);
    
  } catch (error) {
    console.error('❌ ERRORE nella rotta /movies:', error);
    // 🚨 In caso di errore, invia messaggio di errore al frontend
    res.status(500).json({ 
      error: 'Errore nel caricamento dei film',
      details: error.message 
    });
  }
});

// ===========================================
// ⭐ API: OTTIENI FILM IN EVIDENZA (primi 3)
// ===========================================
// URL completo: GET http://localhost:3001/api/movies/featured
router.get("/featured", async (req, res) => {
  try {
    console.log('🌟 RICHIESTA RICEVUTA: Film in evidenza');
    
    // ✅ CARICA I PRIMI 3 FILM DAL DATABASE MONGODB ATLAS
    console.log('�️ Caricamento primi 3 film dal database...');
    const filmsInEvidenzaFromDB = await Movie.find({}).limit(3);
    
    console.log(`🌟 FILM IN EVIDENZA DAL DB: ${filmsInEvidenzaFromDB.length} film caricati`);
    
    // 📤 Invia i primi 3 film dal database
    res.json(filmsInEvidenzaFromDB);
    
  } catch (error) {
    console.error('❌ ERRORE nella rotta /featured:', error);
    res.status(500).json({ 
      error: 'Errore nel caricamento dei film in evidenza',
      details: error.message 
    });
  }
});

// ===========================================
// 🎯 API: OTTIENI UN SINGOLO FILM PER ID
// ===========================================
// URL completo: GET http://localhost:3001/api/movies/12345
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id; // Prende l'ID dall'URL
    console.log(`🔍 RICHIESTA RICEVUTA: Film con ID ${movieId}`);
    
    // ✅ CERCA IL FILM SPECIFICO NEL DATABASE
    console.log('🗄️ Ricerca film nel database...');
    const movieFromDB = await Movie.findById(movieId);
    
    // ❌ Se il film non esiste, restituisci errore 404
    if (!movieFromDB) {
      console.log(`❌ Film con ID ${movieId} non trovato`);
      return res.status(404).json({ 
        error: 'Film non trovato',
        id: movieId 
      });
    }
    
    console.log(`✅ FILM TROVATO: ${movieFromDB.title} (${movieFromDB.year})`);
    
    // 📤 Invia il film specifico al frontend
    res.json(movieFromDB);
    
  } catch (error) {
    console.error(`❌ ERRORE nella ricerca film ${req.params.id}:`, error);
    
    // Gestione errori specifici di MongoDB
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: 'ID film non valido',
        details: 'L\'ID fornito non è nel formato corretto' 
      });
    }
    
    res.status(500).json({ 
      error: 'Errore nel caricamento del film',
      details: error.message 
    });
  }
});

// ===========================================
// 🎬 API: NOLEGGIA UN FILM
// ===========================================
// URL: POST http://localhost:3001/api/movies/rent/123
router.post("/rent/:id", async (req, res) => {
  try {
    const filmId = req.params.id; // Prende l'ID del film dall'URL
    console.log(`🎬 RICHIESTA NOLEGGIO: Film ID ${filmId}`);
    
    // 🔍 Cerca il film nel database (per ora simulato)
    // TODO: Sostituire con → const movie = await Movie.findById(filmId);
    
    // 🚧 SIMULAZIONE: Controlla se il film esiste e è disponibile
    if (filmId === "999") {
      return res.status(404).json({ 
        message: "❌ Film non trovato",
        id: filmId 
      });
    }
    
    // ✅ Simula il noleggio riuscito
    const movieRented = {
      id: filmId,
      title: "Film Noleggiato",
      available: false,        // Ora non più disponibile
      rentedAt: new Date(),    // Data/ora del noleggio
      rentedBy: "utente_123"   // Chi l'ha noleggiato (in futuro dall'autenticazione)
    };
    
    console.log(`✅ NOLEGGIO COMPLETATO: Film ${filmId}`);
    res.json({
      message: "🎉 Film noleggiato con successo!",
      movie: movieRented
    });
    
  } catch (error) {
    console.error('❌ ERRORE nel noleggio:', error);
    res.status(500).json({ 
      error: 'Errore durante il noleggio del film',
      details: error.message 
    });
  }
});

// ===========================================
// 🔄 API: RESTITUISCI UN FILM
// ===========================================
// URL: POST http://localhost:3001/api/movies/return/123
router.post("/return/:id", async (req, res) => {
  try {
    const filmId = req.params.id;
    console.log(`🔄 RICHIESTA RESTITUZIONE: Film ID ${filmId}`);
    
    // 🔍 Cerca il film (per ora simulato)
    // TODO: Sostituire con → const movie = await Movie.findById(filmId);
    
    // ✅ Simula la restituzione riuscita
    const movieReturned = {
      id: filmId,
      title: "Film Restituito",
      available: true,         // Ora di nuovo disponibile
      returnedAt: new Date()   // Data/ora della restituzione
    };
    
    console.log(`✅ RESTITUZIONE COMPLETATA: Film ${filmId}`);
    res.json({
      message: "👍 Film restituito con successo!",
      movie: movieReturned
    });
    
  } catch (error) {
    console.error('❌ ERRORE nella restituzione:', error);
    res.status(500).json({ 
      error: 'Errore durante la restituzione del film',
      details: error.message 
    });
  }
});

// 📤 ESPORTA le rotte per usarle nel server principale
module.exports = router;
