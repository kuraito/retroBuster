
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


/**
 * 
 * **Movie.js** è il **"modello dati"** per i film nel database MongoDB.

### **Cosa fa:**
- **Definisce** come sono strutturati i film nel database
- **Valida** i dati prima di salvarli
- **Collega** il codice JavaScript a MongoDB

### **Schema Film:**
```javascript
{
  title: "Matrix",           // Obbligatorio
  year: 1999,               // Opzionale  
  rentedCount: 0,           // Default: 0
  available: true           // Default: true
}
```

### **In pratica:**
- **API** usano questo modello per salvare/leggere film
- **Frontend** riceve dati in questo formato
- **MongoDB** salva documenti con questa struttura

**È il "contratto" che dice a tutti come devono essere fatti i dati dei film!
 */