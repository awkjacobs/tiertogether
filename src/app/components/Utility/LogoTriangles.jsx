"use client"
import { useTheme } from "next-themes"

export default function LogoTriangles({ className }) {
    const { resolvedTheme } = useTheme()

    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            className={className}
        >
            <polygon
                fill={resolvedTheme === "dark" ? "#e9d5ff" : "#a855f7"}
                points="43.03 36.07 15.38 83.97 70.69 83.97 43.03 36.07"
            />
            <polygon
                fill={resolvedTheme === "dark" ? "#a855f7" : "#6b21a8"}
                points="84.97 91.93 112.62 44.03 57.31 44.03 84.97 91.93"
            />
        </svg>
    )
}
