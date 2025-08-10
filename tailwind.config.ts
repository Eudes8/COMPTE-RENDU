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
      // Étendez le thème ici si nécessaire
      // Par exemple, pour ajouter des couleurs personnalisées :
      // colors: {
      //   'primary': '#1DA1F2',
      // },
    },
  },
  plugins: [],
};

export default config;
