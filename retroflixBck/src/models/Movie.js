
// Importa la libreria mongoose per gestire il database MongoDB
const mongoose = require("mongoose");


// Definisce lo schema del film, cioè la struttura dei dati salvati nel database
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titolo del film (obbligatorio)
  year: { type: Number }, // Anno di uscita del film
  rentedCount: { type: Number, default: 0 }, // Quante volte il film è stato noleggiato
  available: { type: Boolean, default: true } // Se il film è disponibile per il noleggio
});


// Esporta il modello Movie per poterlo usare in altre parti del progetto
module.exports = mongoose.model("Movie", MovieSchema);
