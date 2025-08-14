import type { Config } from "tailwindcss";

// Configuration de base pour Tailwind CSS
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Ou si vous utilisez le répertoire `src` :
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Ajout de la palette de couleurs et des polices personnalisées du projet AUTOMATIC
      colors: {
        'deep-space-blue': '#0A192F',
        'kinetic-cyan': '#64FFDA',
        'slate-light': '#CCD6F6',
        'slate-dark': '#8892B0',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};

export default config;
