/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/*
1. **`content`**: Dice a Tailwind **dove cercare** le classi CSS nei tuoi file React
2. **`theme.extend`**: Qui puoi aggiungere **colori, font e stili personalizzati** per il tema retro
3. **`plugins`**: Per aggiungere **funzionalità extra** (attualmente vuoto)
*/