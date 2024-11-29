/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

module.exports = {
    darkMode: "selector",
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
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
            colors: {
                surface: colors.zinc,
                backdrop: {
                    800: "#11081e",
                    900: "#0a0014",
                },
            },
            fontSize: {
                tierClamp: "clamp(1rem, 1vw + 1rem, 2rem)",
                tierClampSmall: "clamp(0.5rem, 1.5vw, 0.8rem)",
            },
            flex: {
                2: "2 2 0%",
                3: "3 3 0%",
                4: "4 4 0%",
                5: "5 5 0%",
                6: "6 6 0%",
                7: "7 7 0%",
                8: "8 8 0%",
                9: "9 9 0%",
                10: "10 10 0%",
                11: "11 11 0%",
                12: "12 12 0%",
                13: "13 13 0%",
                14: "14 14 0%",
                15: "15 15 0%",
                16: "16 16 0%",
                17: "17 17 0%",
                18: "18 18 0%",
                19: "19 19 0%",
                20: "20 20 0%",
                21: "21 21 0%",
                22: "22 22 0%",
                23: "23 23 0%",
                24: "24 24 0%",
                25: "25 25 0%",
                26: "26 26 0%",
                27: "27 27 0%",
                28: "28 28 0%",
                29: "29 29 0%",
                30: "30 30 0%",
                31: "31 31 0%",
                32: "32 32 0%",
                33: "33 33 0%",
                34: "34 34 0%",
                35: "35 35 0%",
                36: "36 36 0%",
                37: "37 37 0%",
                38: "38 38 0%",
                39: "39 39 0%",
                40: "40 40 0%",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
