/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: ["16px", "19px"],
        md: ["20px", "24px"],
      },
      colors: {
        sora: "#538EDF",
        nam: "#015397",
        parang: "#1098ED",
        textNavy: "#12396F",
      },
    },
  },
  plugins: [],
};
