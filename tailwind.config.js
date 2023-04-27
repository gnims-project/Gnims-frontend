/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: ["16px", "19px"],
        md: ["20px", "24px"],
      },

      fontFamily: {
        Pretendard: ["Pretendard-Regular"],
      },

      colors: {
        sora: "#538EDF",
        nam: "#015397",
        parang: "#1098ED",
        textNavy: "#12396F",
        textBlack: "#121213",
        inputBox: "#E8E8E8",
        inputBoxFocus: "#FFFFFF",
        inputPlaceHoldText: "#6F6F6F",
        pink: "#DF538D",
        green: "#8DDF53",
        blackBorder: "#002C51",
        input: "#E8E8E8",
        placeHolder: "#6F6F6F",
      },
      dropShadow: {
        inputBoxShadow: "0px 4px 4px rgba(68, 111, 163, 0.1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
