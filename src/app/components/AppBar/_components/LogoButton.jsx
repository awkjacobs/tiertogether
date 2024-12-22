"use client"

import { useMediaQuery } from "@app/hooks/use-media-query"
import LogoTriangles from "@components/Utility/LogoTriangles"

export default function LogoButton() {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <>
            <LogoTriangles className={`h-full w-auto`} />
            {isDesktop && (
                <h1
                    className={`text-base font-medium text-purple-500 dark:text-purple-200`}
                >
                    tier
                    <span className={`text-purple-800 dark:text-purple-500`}>
                        together
                    </span>
                </h1>
            )}
        </>
    )
}
