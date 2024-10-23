/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glow-blue': '#00FFFF',  // Add custom colors for glowing
        'glow-pink': '#FF00FF',
      },
      boxShadow: {
        'glow': '0 0 15px 3px rgba(0, 255, 255, 0.6)', // Subtle glowing shadow
        'glow-pink': '0 0 15px 3px rgba(255, 0, 255, 0.6)',
      }
    },
  },
  plugins: [],
};
