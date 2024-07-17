/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
      "text-blue-500",
      "text-green-500",
      "text-red-500",
      "text-yellow-500",
      "text-purple-500",
      "text-amber-500",
      "text-pink-500",
      "text-teal-500",
      "text-indigo-500",
      "text-gray-500",
      "text-violet-500",
      "text-lime-500",
      "text-cyan-500",
      "text-rose-500",
      "text-emerald-500",

      "border-blue-500",
      "border-green-500",
      "border-red-500",
      "border-yellow-500",
      "border-purple-500",
      "border-amber-500",
      "border-pink-500",
      "border-teal-500",
      "border-indigo-500",
      "border-gray-500",
      "border-violet-500",
      "border-lime-500",
      "border-cyan-500",
      "border-rose-500",
      "border-emerald-500",

      "h-[135px]",
      "h-[283px]",
      "h-[450px]",
      "h-[630px]",
      "h-[900px]",
      "h-[1000px]",
      "h-[100%]",

      "min-h-[135px]",
      "min-h-[283px]",
      "min-h-[450px]",
      "min-h-[630px]",
      "min-h-[900px]",
      "min-h-[1000px]",
      "min-h-[100%]",

      "max-h-[135px]",
      "max-h-[283px]",
      "max-h-[450px]",
      "max-h-[630px]",
      "max-h-[900px]",
      "max-h-[1000px]",
      "max-h-[100%]",

      // Add other color classes that you are using
    ],
  },
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // colors

    // extend: {
    // colors: {
    //   blue: {
    //     50: "#576ECE",
    //     100: "#7176B6",
    //     200: "#8B7E9E",
    //     300: "##A58786",
    //     400: "#BF8F6D",
    //     500: "#D99755",
    //     600: "#F39F3D",
    //   },
    // },
    // },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        pallette: {
          50: "#d4c493",
          100: "#f5ede0",
          200: "#936965",
          300: "#A58786",
          400: "#9e8467",
          500: "#63494c",
          600: "#15232e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
