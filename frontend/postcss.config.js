module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

/*
1. Scrivi JSX con classi Tailwind
   ↓
2. PostCSS + Tailwind plugin
   ↓
3. Genera CSS dalle classi utilizzate
   ↓
4. Autoprefixer aggiunge compatibilità
   ↓
5. CSS finale ottimizzato
*/