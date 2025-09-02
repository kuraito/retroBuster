
// Importa la libreria mongoose per gestire la connessione a MongoDB
const mongoose = require("mongoose");


// Funzione che si occupa di connettere l'applicazione al database MongoDB

//SERVER.JS CHIAMA CONNECTDB OSSIA QUESTA PASSANDO L URI 
//DB.JS SI OCCUPA DI EFFETTUARE LA CONNESSIONE
//URI LO PRENDE DAL FILE .ENV
//E RITORNA UNA PROMESSA

async function connectDB(uri) {
  if (!uri) throw new Error("Mongo URI non definito!"); // Controlla che l'URI sia presente
  mongoose.set("strictQuery", true); // Imposta la modalità strict per le query
  await mongoose.connect(uri); // Effettua la connessione al database
}


// Esporta la funzione di connessione per poterla usare in altri file
module.exports = { connectDB };

/**
 * 
 * ## **In Breve:**

**db.js è il "ponte" tra Node.js e MongoDB Atlas:**
- **Valida** le credenziali di connessione
- **Configura** Mongoose per sicurezza e performance
- **Stabilisce** la connessione al database cloud
- **Esporta** la funzione per l'uso in server.js

**Senza questo file, il backend non può salvare/leggere i film!** 

### **Flusso Completo:**
```
1. Server.js legge MONGO_URI dal .env
   ↓
2. Chiama connectDB(MONGO_URI)
   ↓
3. db.js valida l'URI
   ↓
4. db.js configura Mongoose (strictQuery)
   ↓
5. db.js si connette a MongoDB Atlas
   ↓
6. Promise risolve → "MongoDB connesso"
   ↓
7. Server pronto per gestire richieste API
```
 */