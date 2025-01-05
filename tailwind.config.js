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
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                backdrop: {
                    100: "#f1e3ff",
                    200: "#dfcef0",
                    800: "#11081e",
                    900: "#0a0014",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            fontSize: {
                tierClamp: "clamp(1rem, 1vw + 1rem, 2rem)",
                tierClampSmall: "clamp(0.5rem, 1.5vw, 0.8rem)",
            },
            backgroundImage: {
                "light-texture":
                    "radial-gradient(transparent 1px,rgb(228 228 231) 1px)",
                "dark-texture":
                    "radial-gradient(transparent 1px, rgb(9 9 11) 1px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
