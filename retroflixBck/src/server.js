
// ===========================================
// 🚀 SERVER BACKEND - RETROFLIX
// ===========================================

// 📁 Carica le configurazioni dal file .env (password database, porte, ecc.)
require("dotenv").config();

// 📦 Importa le librerie necessarie
const express = require("express");        // Framework per creare il server web
const cors = require("cors");             // Permette al frontend di chiamare il backend
const { connectDB } = require("./config/db"); // Funzione per connettersi al database
const moviesRoutes = require("./routes/movies"); // Le rotte per gestire i film

// 🏗️ Crea l'applicazione Express (il nostro server)
const app = express();

// ⚙️ CONFIGURAZIONE MIDDLEWARE
// Permette al frontend (React su porta 5174) di comunicare con questo backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174', // Indirizzo del frontend
  credentials: true // Permette di inviare cookies e credenziali
}));

// Permette di ricevere dati in formato JSON dalle richieste
app.use(express.json());

// 🔧 CONFIGURAZIONE VARIABILI
const PORT = process.env.PORT || 3001;           // Porta del server (default 3001)
const MONGO_URI = process.env.MONGO_URI;         // Stringa di connessione a MongoDB Atlas

// 🗄️ CONNESSIONE AL DATABASE
console.log('🔄 Connessione al database MongoDB Atlas...');
connectDB(MONGO_URI)
  .then(() => {
    console.log('✅ DATABASE CONNESSO: MongoDB Atlas è collegato!');
  })
  .catch((error) => {
    console.error('❌ ERRORE DATABASE:', error.message);
    process.exit(1); // Ferma il server se il database non si connette
  });

// 🏥 ROTTA DI CONTROLLO SALUTE SERVER
// Test per verificare se il server funziona: http://localhost:3001/health
app.get("/health", (req, res) => {
  res.json({ 
    status: "✅ OK", 
    message: "Server Retroflix funzionante!",
    timestamp: new Date().toISOString()
  });
});

// 🎬 ROTTE PER I FILM
// Tutte le richieste che iniziano con "/api/movies" vengono gestite dal file movies.js
// Esempi:
// - GET /api/movies → Tutti i film
// - GET /api/movies/featured → Film in evidenza
app.use("/api/movies", moviesRoutes);

// 🚀 AVVIO DEL SERVER
app.listen(PORT, () => {
  console.log(`🎬 SERVER RETROFLIX AVVIATO!`);
  console.log(`📍 Indirizzo: http://localhost:${PORT}`);
  console.log(`🎯 API Film: http://localhost:${PORT}/api/movies`);
  console.log(`🏥 Test server: http://localhost:${PORT}/health`);
});
