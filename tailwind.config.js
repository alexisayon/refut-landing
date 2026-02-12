/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores oficiales de ReFut (alineados con webapp)
        refut: {
          green: '#11A24A',
          black: '#1D1D1B',
        },
        primary: {
          DEFAULT: '#11A24A',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#11A24A',
          600: '#0d8239',
          700: '#0a6229',
          800: '#07421a',
          900: '#03210d',
        },
        dark: {
          bg: '#1D1D1B',
          surface: '#252525',
          card: '#2C2C2C',
          border: '#3A3A3A',
        },
        accent: {
          green: '#11A24A',
          greenLight: '#1DB954',
          greenDark: '#0d8239',
          purple: '#11A24A',
          purpleLight: '#1DB954',
          purpleDark: '#0d8239',
        },
      },
    },
  },
  plugins: [],
}
