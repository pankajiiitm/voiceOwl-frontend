module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#ecefff",
          300: "#9aa6ff",
          500: "#646cff",
          700: "#484ff0",
        },
      },
      boxShadow: {
        glass: "0 8px 30px rgba(15,23,42,0.12)",
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};
