
// Importa la libreria mongoose per gestire il database MongoDB
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Titolo
  year: { type: Number },                   // Anno
  poster: { type: String },                 // URL del poster
  description: { type: String },            // Descrizione
  rentedCount: { type: Number, default: 0 },// Noleggi
  available: { type: Boolean, default: true }// Disponibilità
});

module.exports = mongoose.model("Movie", movieSchema);

/**
 * 
 * **Movie.js** è il **"modello dati"** per i film nel database MongoDB.

### **Cosa fa:**
- **Definisce** come sono strutturati i film nel database
- **Valida** i dati prima di salvarli
- **Collega** il codice JavaScript a MongoDB

### **In pratica:**
- **API** usano questo modello per salvare/leggere film
- **Frontend** riceve dati in questo formato
- **MongoDB** salva documenti con questa struttura

**È il "contratto" che dice a tutti come devono essere fatti i dati dei film!
 */