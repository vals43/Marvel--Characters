// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards", // Ajout de l'animation de fade-in
        "scale-in": "scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards", // Ajout de l'animation de scale-in
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        fadeIn: { // Keyframes pour le fade-in
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: { // Keyframes pour le scale-in (effet "pop")
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      boxShadow: {
        '2xl-custom': '0 25px 50px -12px rgba(255, 0, 0, 0.4), 0 10px 10px -5px rgba(255, 0, 0, 0.3)',
        'inner-xl': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0,0,0,0.6)',
      }
    },
  },
  plugins: [],
}