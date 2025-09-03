require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./src/models/Movie");

async function seed() {
  try {
    console.log("🔹 Connessione a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connesso a MongoDB");

    const movies = [
      { title: "The Matrix", year: 1999 },
      { title: "Gladiator", year: 2000 },
      { title: "Pirates of the Caribbean", year: 2003 },
      { title: "The Dark Knight", year: 2008 },
      { title: "Avatar", year: 2009 }
    ];

    console.log("🔹 Pulisco collection esistente...");
    await Movie.deleteMany();

    console.log("🔹 Inserisco film...");
    const result = await Movie.insertMany(movies);
    console.log(`✅ Inseriti ${result.length} film:`);

    result.forEach(movie => console.log(`- ${movie.title} (${movie.year})`));

    process.exit();
  } catch (err) {
    console.error("❌ Errore:", err);
    process.exit(1);
  }
}

seed();

/**
 * serve per popolare il database.
 * Dotenv prende le variabili d'ambiente
 * mongoose, connessione diretta a mongodb
 * Movie, modello dei film
 * 
 * Poi c'è la funzione di Seeding
 * Si collega direttamente a MongoDB usando l'URI
 * con    await mongoose.connect(process.env.MONGO_URI);
 * 
 * movies sono i film di esempio
 * 
 * Pulisce la collezione esistente con Movie.deleteMany();
 * 
 * Inserisce i film con Movie.insertMany(movies);
 *
 * poi con result.forEach(movie => console.log(`- ${movie.title} (${movie.year})`));
 * stampa i film inseriti
 * 
 * process.exit() termina il processo
 * 
 * seed() avvia la funzione di seeding
 *  
 * */