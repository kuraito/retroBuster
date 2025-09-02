
// Carica le variabili dal file .env
require("dotenv").config();

// Importa il framework Express per creare il server
const express = require("express");

// Permette al frontend (porta 3000 per esempio) di comunicare con il backend (porta 5000)
const cors = require("cors");

// Importa la funzione per connettersi al database MongoDB
const { connectDB } = require("./config/db");

// Importa le rotte dedicate ai film
// (gestite nel file routes/movies.js)
const moviesRoutes = require("./routes/movies");


// Crea un'applicazione Express
const app = express();

// Abilita CORS su tutte le rotte
app.use(cors());

// Permette di ricevere dati in formato JSON nelle richieste
app.use(express.json());


// Porta su cui il server ascolta (presa da variabili d'ambiente OR default 5000)
const PORT = process.env.PORT || 5000;

// URI di connessione a MongoDB (presa da variabili d'ambiente)
const MONGO_URI = process.env.MONGO_URI;


// Connessione al database MongoDB
connectDB(MONGO_URI)
  .then(() => console.log("✅ MongoDB connesso")) // Messaggio di successo
  .catch(err => console.error("❌ Errore DB:", err)); // Messaggio di errore

  
// Rotta di TEST per verificare che il server funzioni
app.get("/health", (req, res) => { // Endpoint di test /health res ossia la risposta con stato ok
  res.json({ status: "ok", message: "Server funzionante!" });
});


//implmenta routing modulare ossia delega
//quando arriva una richiesta per /movies mandala al modulo che ti scrivo
// Rotte dedicate ai film (gestite nel file movies.js)
app.use("/movies", moviesRoutes);

// Avvia il server sulla porta specificata
app.listen(PORT, () => console.log(`Server su http://localhost:${PORT}`));
