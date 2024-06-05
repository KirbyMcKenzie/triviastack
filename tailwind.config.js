//@ts-ignore
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 400ms ease-in-out",
      },
      boxShadow: {
        "3xl":
          "rgba(50, 50, 93, 0.26) 1px 51px 101px -21px, rgba(0, 0, 0, 0.31) 1px 31px 61px -31px",
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
