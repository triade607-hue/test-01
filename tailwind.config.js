/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F4FA",
          100: "#CCE9F5",
          200: "#99D3EB",
          300: "#66BDE1",
          400: "#339AD7",
          500: "#0077B6", // ← Couleur principale
          600: "#005F92",
          700: "#00476E",
          800: "#002F49",
          900: "#001825",
        },
        dark: {
          50: "#F7F7F7",
          100: "#E3E3E3",
          200: "#C8C8C8",
          300: "#A4A4A4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#1A1A1A",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#D80027",
        info: "#3B82F6",
      },
      backgroundImage: {
        "text-gradient-badge": "linear-gradient(90deg, #FDC830 0%, #F37335 100%)",
      },
    },
  },
  plugins: [],
};
