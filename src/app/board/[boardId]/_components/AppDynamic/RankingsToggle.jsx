// import { useState } from "react"

export default function RankingsToggle({
    showServerRanks,
    setShowServerRanks,
    // queueIsOpen,
    setQueueIsOpen,
}) {
    // const [queueShouldBeOpen, setQueueShouldBeOpen] = useState(null)

    function handleClick() {
        setShowServerRanks(!showServerRanks)

        // if (queueIsOpen) {
        setQueueIsOpen(false)
        //     setQueueShouldBeOpen(true)
        // } else {
        //     setQueueShouldBeOpen(false)
        // }
        // if (!queueIsOpen && queueShouldBeOpen) setQueueIsOpen(true)
    }
    return (
        <button
            className={`flex h-6 cursor-pointer overflow-hidden rounded md:h-8`}
            onPointerDown={handleClick}
        >
            <div
                className={`relative h-12 transition-all md:h-16 ${
                    showServerRanks ? "-top-6 md:-top-8" : "top-0 md:top-0"
                }`}
            >
                <div
                    className={`flex h-6 items-center justify-center bg-purple-600 px-2 text-xs text-purple-100 md:h-8 md:px-3`}
                >
                    My Rankings
                </div>
                <div
                    className={`flex h-6 items-center justify-center bg-emerald-600 px-2 text-xs text-emerald-100 md:h-8 md:px-3`}
                >
                    Overall Rankings
                </div>
            </div>
        </button>
    )
}
