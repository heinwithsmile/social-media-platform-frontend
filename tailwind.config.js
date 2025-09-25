/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#138aec",
        "background-light": "#f6f7f8",
        "background-dark": "#101a22",
        "foreground-light": "#111518",
        "foreground-dark": "#ffffff",
        "card-light": "#ffffff",
        "card-dark": "#182430",
        "subtle-light": "#617789",
        "subtle-dark": "#94a3b8",
        "border-light": "#e2e8f0",
        "border-dark": "#334155"
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Poppins', 'sans-serif']
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
