# 🎬 Retroflix - Full-Stack Movie Streaming Platform

**Una web app stile BlockBuster quindi focalizzata su film retrò (fino al 2010) con architettura moderna full-stack.**

![Retroflix](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen)

---

## 📋 Indice

- [🎯 Overview](#-overview)
- [🏗️ Architettura](#️-architettura)
- [⚡ Quick Start](#-quick-start)
- [🛠️ Stack Tecnologico](#️-stack-tecnologico)
- [📂 Struttura del Progetto](#-struttura-del-progetto)
- [🔄 Flusso di Dati](#-flusso-di-dati)
- [🌐 API Endpoints](#-api-endpoints)
- [🗄️ Database Schema](#️-database-schema)
- [⚙️ Configurazione](#️-configurazione)
- [🚀 Deploy](#-deploy)

---

## 🎯 Overview

Retroflix è una piattaforma di streaming per film retrò che replica l'esperienza Netflix con tecnologie moderne. Gli utenti possono:

- 🎬 **Sfogliare** un catalogo di film retrò
- ⭐ **Vedere** film in evidenza
- 🔍 **Cercare** film per titolo/anno
- 📋 **Gestire** una watchlist personale
- 📱 **Noleggiare** film (sistema simulato)

---

## 🏗️ Architettura

```
┌─────────────────┐    📡 HTTP/REST API    ┌─────────────────┐    🔗 Mongoose    ┌─────────────────┐
│                 │ ──────────────────────► │                 │ ─────────────────► │                 │
│  FRONTEND       │                         │  BACKEND        │                    │  DATABASE       │
│  React + Vite   │ ◄────────────────────── │  Node + Express │ ◄───────────────── │  MongoDB Atlas  │
│  Port: 5173     │    📤 JSON Response     │  Port: 3001     │    📊 Documents    │  Cloud Database │
└─────────────────┘                         └─────────────────┘                    └─────────────────┘
```

### **Comunicazione Cross-Origin**
- ✅ **CORS** configurato per `localhost:5173` → `localhost:3001`
- ✅ **Environment Variables** per configurazioni
- ✅ **Fallback System** per robustezza (mockMovies → Database)

---

## ⚡ Quick Start

### **1. Clona il Repository**
```bash
git clone https://github.com/kuraito/retroBuster.git
cd retroBuster
```

### **2. Setup Backend**
```bash
cd retroflixBck
npm install
cp .env.example .env  # Configura le tue credenziali MongoDB
npm run dev           # Avvia su http://localhost:3001
```

### **3. Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev          # Avvia su http://localhost:5173
```

### **4. Database Setup**
```bash
cd ../retroflixBck
node seed.js         # Popola il database con film di esempio
```

**🎉 L'app è pronta su `http://localhost:5173`**

---

## 🛠️ Stack Tecnologico

### **Frontend**
- **⚛️ React 18.2.0** - UI Library con Hooks
- **🚀 Vite 4.5.14** - Build Tool veloce
- **🎨 Tailwind CSS** - Styling con tema retrò
- **🛣️ React Router** - SPA Navigation

### **Backend**
- **🟢 Node.js** - Runtime JavaScript
- **🚀 Express** - Web Framework
- **🗄️ Mongoose** - MongoDB
- **🔐 dotenv** - Environment Management
- **🌐 CORS** - Cross-Origin Resource Sharing

### **Database**
- **🍃 MongoDB Atlas** - Cloud NoSQL Database
- **📊 Collections:** `movies` (film catalog)

### **Tools & DevOps**
- **📦 npm** - Package Manager
- **🔄 Nodemon** - Auto-restart durante sviluppo
- **🔒 .gitignore** - Protezione credenziali
- **📝 ESLint** - Code Quality

---

## 📂 Struttura del Progetto

```
retroflixprog/
├── 🎨 frontend/                    # Client React
│   ├── src/
│   │   ├── components/             # Componenti riutilizzabili
│   │   │   ├── MovieCard.jsx      # Card singolo film
│   │   │   └── MovieDetail.jsx    # Dettaglio film completo
│   │   ├── pages/                 # Pagine principali
│   │   │   ├── Home.jsx           # Homepage con film in evidenza
│   │   │   └── Catalogo.jsx       # Lista completa + ricerca
│   │   ├── services/              # Logica business
│   │   │   └── api.js             # Servizi API per backend
│   │   └── mockMovies.js          # Dati di fallback
│   └── .env                       # Config frontend (VITE_API_URL)
│
├── 🚀 retroflixBck/               # Server Node.js
│   ├── src/
│   │   ├── models/                # Schema MongoDB
│   │   │   └── Movie.js           # Model film
│   │   ├── routes/                # Endpoint API
│   │   │   └── movies.js          # CRUD operations
│   │   ├── config/                # Configurazioni
│   │   │   └── db.js              # Connessione MongoDB
│   │   └── server.js              # Entry point Express
│   ├── .env                       # Config backend (MONGO_URI, PORT)
│   ├── .gitignore                 # Esclude .env dal git
│   └── seed.js                    # Popolamento database iniziale
│
└── 📚 README.md                   # Documentazione
```

---

## 🔄 Flusso di Dati

### **1. Caricamento Homepage (Film in Evidenza)**
```mermaid
graph LR
    A[User apre /] --> B[Home.jsx]
    B --> C[movieService.getFeaturedMovies()]
    C --> D[GET /api/movies/featured]
    D --> E[Backend: Movie.find().limit(3)]
    E --> F[MongoDB Atlas]
    F --> G[3 film restituiti]
    G --> H[React State aggiornato]
    H --> I[UI renderizzata]
```

### **2. Visualizzazione Dettaglio Film**
```mermaid
graph LR
    A[User clicca Dettagli] --> B[Link /film/:id]
    B --> C[MovieDetail.jsx]
    C --> D[movieService.getMovieById(id)]
    D --> E[GET /api/movies/:id]
    E --> F[Backend: Movie.findById(id)]
    F --> G[MongoDB Atlas]
    G --> H[Film completo restituito]
    H --> I[Pagina dettaglio renderizzata]
```

### **3. Sistema di Fallback**
```mermaid
graph TD
    A[API Call] --> B{Backend risponde?}
    B -->|✅ Sì| C[Usa dati database]
    B -->|❌ No| D[Fallback a mockMovies]
    C --> E[Rendering UI]
    D --> E
```

---

## 🌐 API Endpoints

### **Movies API (`/api/movies`)**

| Method | Endpoint | Descrizione | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/movies` | Lista tutti i film | `Array<Movie>` |
| `GET` | `/api/movies/featured` | Primi 3 film in evidenza | `Array<Movie>` |
| `GET` | `/api/movies/:id` | Film specifico per ObjectId | `Movie` |
| `POST` | `/api/movies/rent/:id` | Noleggia film (simulato) | `RentResponse` |
| `POST` | `/api/movies/return/:id` | Restituisci film | `ReturnResponse` |

### **Health Check**

| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/health` | Status server e database |

### **Esempi di Response**

**GET `/api/movies/featured`**
```json
[
  {
    "_id": "68bc0b4e418b26098ba4b68f",
    "title": "Matrix",
    "year": 1999,
    "poster": "https://image.tmdb.org/t/p/w500/...",
    "description": "Un programmatore scopre...",
    "available": true
  }
]
```

**Error Response**
```json
{
  "error": "Film non trovato",
  "details": "ID fornito non è nel formato corretto"
}
```

---

## 🗄️ Database Schema

### **Movies Collection**
```javascript
{
  _id: ObjectId,           // ID MongoDB auto-generato
  title: String,           // Titolo film
  year: Number,            // Anno di uscita
  poster: String,          // URL immagine poster
  description: String,     // Descrizione film
  available: Boolean,      // Disponibile per noleggio
  __v: Number             // Version key (Mongoose)
}
```

### **Indexes**
```javascript
// Index per performance ricerca
db.movies.createIndex({ title: "text", description: "text" })
db.movies.createIndex({ year: 1 })
db.movies.createIndex({ available: 1 })
```

---

## ⚙️ Configurazione

### **Frontend Environment (`.env`)**
```bash
# URL del backend API
VITE_API_URL=http://localhost:3001/api

# Per produzione
# VITE_API_URL=https://yourdomain.com/api
```

### **Backend Environment (`.env`)**
```bash
# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Settings
FRONTEND_URL=http://localhost:5173

# Security (per futuro)
JWT_SECRET=your_jwt_secret_here
```

### **Package.json Scripts**

**Frontend:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Backend:**
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "seed": "node seed.js"
  }
}
```

---

## 🔧 Troubleshooting

### **❌ CORS Error**
```
Access-Control-Allow-Origin header missing
```
**Soluzione:** Verifica che `FRONTEND_URL` in `.env` backend corrisponda all'URL frontend

### **❌ MongoDB Connection Failed**
```
MongoNetworkError: connection refused
```
**Soluzione:** Controlla `MONGO_URI` e IP whitelist su MongoDB Atlas

### **❌ API 404 Not Found**
```
Cannot GET /api/movies
```
**Soluzione:** Verifica che il backend sia avviato su porta 3001

---

## 👥 Contributi

1. Fork del repository
2. Crea feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambiamenti (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri Pull Request

---

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi `LICENSE` per dettagli.

---

## 🎯 Roadmap Future

- [ ] 🔐 Sistema autenticazione utenti (JWT)
- [ ] 🔍 Ricerca avanzata con filtri
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🎮 Sistema recensioni e valutazioni
- [ ] 📧 Notifiche email
- [ ] 📊 Dashboard admin per gestione film

---

**Made by [kuraito](https://github.com/kuraito)**