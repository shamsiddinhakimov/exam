/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  daisyui: {
    themes: [
      "dracula",
      "winter"
    ],
  },
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
}

