// ===========================================
// 📡 SERVIZIO API - COMUNICAZIONE COL BACKEND
// ===========================================

// 🌐 Indirizzo del server backend
// Se non è definito nell'ambiente, usa quello locale
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// 🎬 Servizi per gestire i film
export const movieService = {
  
  // 📋 FUNZIONE: Prendi tutti i film dal database
  getAllMovies: async () => {
    try {
      console.log('🔄 Chiamando il backend per TUTTI i film...');
      
      // 📡 Fai una richiesta HTTP GET al backend
      const response = await fetch(`${BACKEND_URL}/movies`);
      
      // ❌ Se la risposta ha errori, lancia un errore
      if (!response.ok) {
        throw new Error(`Errore del server: ${response.status}`);
      }
      
      // ✅ Converte la risposta da JSON a oggetto JavaScript
      const films = await response.json();
      console.log('✅ Film ricevuti dal backend:', films.length);
      
      return films; // 📤 Restituisce i film al componente React
      
    } catch (error) {
      console.error('❌ Errore nel caricare i film:', error);
      throw error; // 🚨 Rilancia l'errore per gestirlo nel componente
    }
  },

  // ⭐ FUNZIONE: Prendi solo i film in evidenza (primi 3)
  getFeaturedMovies: async () => {
    try {
      console.log('🔄 Chiamando il backend per film IN EVIDENZA...');
      
      // 📡 Chiama endpoint specifico per film in evidenza
      const response = await fetch(`${BACKEND_URL}/movies/featured`);
      
      if (!response.ok) {
        throw new Error(`Errore del server: ${response.status}`);
      }
      
      const featuredFilms = await response.json();
      console.log('⭐ Film in evidenza ricevuti:', featuredFilms.length);
      
      return featuredFilms;
      
    } catch (error) {
      console.error('❌ Errore nel caricare i film in evidenza:', error);
      throw error;
    }
  },

  // 🎯 FUNZIONE: Prendi un singolo film tramite ID
  getMovieById: async (movieId) => {
    try {
      console.log(`🔍 Chiamando il backend per film ID: ${movieId}`);
      
      // 📡 Chiama endpoint specifico per un singolo film
      const response = await fetch(`${BACKEND_URL}/movies/${movieId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Film non trovato');
        }
        throw new Error(`Errore del server: ${response.status}`);
      }
      
      const movie = await response.json();
      console.log('🎬 Film ricevuto dal backend:', movie.title);
      
      return movie; // 📤 Restituisce il singolo film
      
    } catch (error) {
      console.error(`❌ Errore nel caricare il film ${movieId}:`, error);
      throw error;
    }
  }
};

// 📤 Esporta il servizio per usarlo nei componenti React
export default movieService;
