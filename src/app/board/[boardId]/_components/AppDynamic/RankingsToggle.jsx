import { useState } from "react"

export default function RankingsToggle({
    showServerRanks,
    setShowServerRanks,
    queueIsOpen,
    setQueueIsOpen,
}) {
    const [queueShouldBeOpen, setQueueShouldBeOpen] = useState(null)

    function handleClick() {
        setShowServerRanks(!showServerRanks)

        if (queueIsOpen) {
            setQueueIsOpen(false)
            setQueueShouldBeOpen(true)
        } else {
            setQueueShouldBeOpen(false)
        }
        if (!queueIsOpen && queueShouldBeOpen) setQueueIsOpen(true)
    }
    return (
        <button
            className={`overflow-hidden flex h-6 md:h-8 cursor-pointer rounded`}
            onPointerDown={handleClick}
        >
            <div
                className={`h-12 md:h-16 relative transition-all ${
                    showServerRanks ? "-top-6 md:-top-8" : "top-0 md:top-0"
                }`}
            >
                <div
                    className={`text-purple-100 h-6 md:h-8 flex items-center justify-center text-xs px-2 md:px-3 bg-purple-600`}
                >
                    My Rankings
                </div>
                <div
                    className={`text-emerald-100 h-6 md:h-8 flex items-center justify-center text-xs px-2 md:px-3 bg-emerald-600`}
                >
                    Overall Rankings
                </div>
            </div>
        </button>
    )
}
