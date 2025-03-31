/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                main: "rgb(220, 38, 38)", // Olov rang (orange-red) - Afandi Food loyihangiz uchun asosiy rang
            },
        },
    },
    plugins: [],
});
