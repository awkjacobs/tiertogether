import AddButton from "../Buttons/AddButton"
import SwiperZone from "./SwiperZone"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../ui/button"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { useDroppable } from "@dnd-kit/core"
import { motion } from "framer-motion"

export default function CardQueue(props) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const QUEUE_IS_EMPTY = props.queue.length === 0

    const [activeCard, setActiveCard] = useState(props.queue[0])

    useEffect(() => {
        if (!props.queue[0]) setActiveCard(undefined)
    }, [props.queue])

    function handleClose() {
        props.setQueueIsOpen(!props.queueIsOpen)
    }
    const { active, isOver, setNodeRef } = useDroppable({
        id: "cardsQueue",
        data: { type: "tier" },
    })
    const height = isDesktop
        ? props.queueIsOpen && !QUEUE_IS_EMPTY
            ? 272
            : 80
        : props.queueIsOpen && !QUEUE_IS_EMPTY
          ? 136
          : 56
    return (
        <motion.div
            animate={{ height }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            ref={setNodeRef}
            className={`col-start-2 col-end-3 ${
                isOver
                    ? "bg-purple-400/25"
                    : "bg-surface-200 dark:bg-surface-900"
            } bottom-0 flex flex-row justify-center rounded-t-md p-2 shadow-[0px_-14px_34px_-20px_rgba(0,0,0,0.8)] md:p-4`}
        >
            <OpenCloseQueueButton
                queueIsOpen={props.queueIsOpen}
                handleClose={handleClose}
                isDesktop={isDesktop}
                disabled={QUEUE_IS_EMPTY}
            />
            {!QUEUE_IS_EMPTY && (
                <SwiperZone
                    {...props}
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    setActiveCardIndex={props.setActiveCardIndex}
                    isDesktop={isDesktop}
                />
            )}
            {QUEUE_IS_EMPTY && <EmptyStatement />}
            <AddButton
                isOpen={props.queueIsOpen}
                {...props}
                isDesktop={isDesktop}
            />
        </motion.div>
    )
}

function OpenCloseQueueButton({
    handleClose,
    queueIsOpen,
    isDesktop,
    disabled,
}) {
    return (
        <Button
            onPointerDown={handleClose}
            size={isDesktop ? "" : "icon"}
            disabled={disabled}
            className={`z-10 shadow-md transition-all ${
                queueIsOpen
                    ? "bg-transparent outline outline-1 outline-purple-800/10 hover:bg-purple-600/30 dark:bg-transparent dark:outline-purple-100/10 dark:hover:bg-purple-600/20"
                    : "bg-purple-700 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600"
            }`}
        >
            {queueIsOpen ? (
                <ChevronDown
                    className={`h-4 w-4 text-purple-800 dark:text-purple-100`}
                />
            ) : (
                <ChevronUp className={`h-4 w-4 text-purple-100`} />
            )}
        </Button>
    )
}
function EmptyStatement() {
    return (
        <div
            className={`flex flex-1 flex-col items-center justify-start text-center text-xs text-purple-800 md:text-base dark:text-purple-400`}
        >
            <h6 className={`px-4 font-bold`}>Queue is empty.</h6>
            <p className={`opacity-75`}>
                Add items with + button or drag card here.
            </p>
        </div>
    )
}
