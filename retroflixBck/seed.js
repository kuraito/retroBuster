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
