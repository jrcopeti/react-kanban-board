/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
