
// Importa Express per gestire le rotte
const express = require("express");
// Crea un router per le rotte dei film
const router = express.Router();
// Importa il modello Movie per interagire con i dati dei film
const Movie = require("../models/Movie");


// Rotta per ottenere la lista di tutti i film
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); // Recupera tutti i film dal database
    res.json(movies); // Restituisce la lista dei film in formato JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gestione errori
  }
});


// Rotta per noleggiare un film
router.post("/rent/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Cerca il film tramite ID
    if (!movie) return res.status(404).json({ message: "Film non trovato" }); // Se non trovato
    if (!movie.available) return res.status(400).json({ message: "Film già noleggiato" }); // Se non disponibile

    movie.available = false; // Imposta il film come non disponibile
    movie.rentedCount += 1; // Incrementa il contatore dei noleggi
    await movie.save(); // Salva le modifiche

    res.json(movie); // Restituisce il film aggiornato
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gestione errori
  }
});


// Rotta per restituire un film noleggiato
router.post("/return/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Cerca il film tramite ID
    if (!movie) return res.status(404).json({ message: "Film non trovato" }); // Se non trovato

    movie.available = true; // Imposta il film come disponibile
    await movie.save(); // Salva le modifiche

    res.json(movie); // Restituisce il film aggiornato
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gestione errori
  }
});


// Esporta il router per poterlo usare nel server principale
module.exports = router;
