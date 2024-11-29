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
        },
    },
    plugins: [require("tailwindcss-animate")],
}
