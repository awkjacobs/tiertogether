"use client" // Error boundaries must be Client Components

import { useEffect } from "react"

export default function BoardErrorBoundary({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="mb-4 text-xl font-bold dark:text-white">
                Something went wrong!
            </h2>
            <p className="mb-4 dark:text-gray-300">
                We encountered an error while displaying this content.
            </p>
            <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
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
