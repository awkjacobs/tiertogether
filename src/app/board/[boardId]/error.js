"use client" // Error boundaries must be Client Components

import { useEffect } from "react"

-export default function Error({ error, reset }) {
+export default function BoardErrorBoundary({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2 className={`dark:text-white`}>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
