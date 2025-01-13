import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          base: '#151817',
          accent: '#4CAF50',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
}

export default config;
