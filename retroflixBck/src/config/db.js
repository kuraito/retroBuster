
// Importa la libreria mongoose per gestire la connessione a MongoDB
const mongoose = require("mongoose");


// Funzione che si occupa di connettere l'applicazione al database MongoDB
async function connectDB(uri) {
  if (!uri) throw new Error("Mongo URI non definito!"); // Controlla che l'URI sia presente
  mongoose.set("strictQuery", true); // Imposta la modalità strict per le query
  await mongoose.connect(uri); // Effettua la connessione al database
}


// Esporta la funzione di connessione per poterla usare in altri file
module.exports = { connectDB };
