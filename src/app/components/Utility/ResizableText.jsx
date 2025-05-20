import { useState, useEffect, useRef, useCallback } from "react"

const ResizableText = ({
    text,
    minFontSize = 10,
    maxFontSize = 100,
    className = "",
}) => {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const [fontSize, setFontSize] = useState(maxFontSize)
    const resizeObserverRef = useRef(null)
    const resizeTimeoutRef = useRef(null)

    const calculateFontSize = useCallback(() => {
        const container = containerRef.current
        const textEl = textRef.current

        if (!container || !textEl) return

        // Clear any pending resize calculations
        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current)
        }

        resizeTimeoutRef.current = setTimeout(() => {
            let low = minFontSize
            let high = maxFontSize
            let newFontSize = minFontSize

            // Reset to minimum size first to get accurate measurements
            textEl.style.fontSize = `${minFontSize}px`

            // Binary search to find the max font size that fits multiline
            while (low <= high) {
                const mid = Math.floor((low + high) / 2)
                textEl.style.fontSize = `${mid}px`

                // Check if text fits inside container (width and height)
                const fits =
                    textEl.scrollWidth <= container.clientWidth &&
                    textEl.scrollHeight <= container.clientHeight

                if (fits) {
                    newFontSize = mid
                    low = mid + 1
                } else {
                    high = mid - 1
                }
            }

            setFontSize(newFontSize)
        }, 100) // Debounce resize calculations
    }, [minFontSize, maxFontSize])

    // Initialize resize observer and recalculate on container size changes
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        if (!resizeObserverRef.current) {
            resizeObserverRef.current = new ResizeObserver(calculateFontSize)
        }

        resizeObserverRef.current.observe(container)
        calculateFontSize() // Initial calculation

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
            }
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current)
            }
        }
    }, [calculateFontSize]) // Recalculate when text or font size constraints change
    useEffect(() => {
        calculateFontSize()
    }, [text, minFontSize, maxFontSize, calculateFontSize])
    return (
        <div
            ref={containerRef}
            className={`flex h-full w-full items-center justify-center overflow-hidden ${className}`}
        >
            <div
                ref={textRef}
                className="h-full w-full text-center"
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.2,
                    maxHeight: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {text}
            </div>
        </div>
    )
}

export default ResizableText
