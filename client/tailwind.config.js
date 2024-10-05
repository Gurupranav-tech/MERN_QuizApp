/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F8C120",
        "primary-color-light": "#EDDD4A",
        "secondary-color": "#9A6CF0",
        "text-color": "#444746",
        "text-color-darker": "##464947",
      },
    },
  },
  plugins: [],
};
