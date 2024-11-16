"use client"

import { useEffect, useState } from "react"

import { TierContainer } from "../Tierlist/TierContainer"
import CardQueue from "../Card Queue/CardQueue"
import BoardBar from "./BoardBar"
import { CardOverlay } from "../Cards/CardOverlay"
import { move } from "./functions/react-dndFuncs"
import sortItems from "./functions/sortItems"
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    closestCenter,
    closestCorners,
    getFirstCollision,
    pointerWithin,
    rectIntersection,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"

export default function DraggingContent({ appData, boardItems, boardName }) {
    const { board, boardOwner, serverRanks, user, users } = appData

    const [ranks, setRanks] = useState(sortItems(boardItems, user, board.id))
    useEffect(() => {
        setRanks(sortItems(boardItems, user, board.id))
    }, [boardItems, user, board.id])

    const [showServerRanks, setShowServerRanks] = useState(false)

    const [queueIsOpen, setQueueIsOpen] = useState(true)

    const [activeCardIndex, setActiveCardIndex] = useState(0)

    // drag and drop
    const [activeItem, setActiveItem] = useState(null)
    const [startSortable, setStartSortable] = useState()
    const [changedTiers, setChangedTiers] = useState({ start: null, end: null })

    function findContainer(id) {
        if (id in ranks) {
            return id
        }
        return Object.keys(ranks).find(
            (key) =>
                key !== "allItems" && ranks[key].find((item) => item.id == id),
        )
    }

    function handleDragStart(event) {
        const { active } = event
        const { id } = active
        const activeContainer = findContainer(id)

        setStartSortable(active.data.current.sortable)
        setChangedTiers((prev) => {
            return {
                start: activeContainer,
                end: null,
            }
        })

        // ! timeout causes the overlay to sometimes not get the item from active Item, but it did remove the max depth error
        // setTimeout(() => {
        setActiveItem(event.active.data.current.item)
        // }, 0)
    }
    function handleDragOver(event) {
        const { active, over, draggingRect } = event

        if (!over) {
            return
        }
        const { id } = active
        const { id: overId } = over

        // Find the containers
        const activeContainer = findContainer(id)
        const overContainer = findContainer(overId)

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        )
            return
        setChangedTiers((prev) => {
            return {
                ...prev,
                end: overContainer,
            }
        })

        // setTimeout(() => {
        setRanks((prev) => {
            const activeItems = prev[activeContainer]
            const overItems = prev[overContainer]

            // Find the indexes for the items
            const activeIndex = activeItems.map((item) => item.id).indexOf(id)
            const overIndex = overItems.map((item) => item.id).indexOf(overId)

            let newIndex
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1 &&
                    draggingRect?.offsetTop >
                        over.rect.offsetTop + over.rect.height

                const modifier = isBelowLastItem ? 1 : 0

                newIndex =
                    overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter(
                        (item) => item.id !== active.id,
                    ),
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    ranks[activeContainer][activeIndex],
                    ...prev[overContainer].slice(
                        newIndex,
                        prev[overContainer].length,
                    ),
                ],
            }
        })
        // }, 0)
    }

    function handleDragEnd(event) {
        setActiveItem(null)

        const { active, over } = event
        if (!over) return
        // const { id: overId } = over
        // Find the containers
        // const overContainer = findContainer(overId)

        const isOverTier = over?.data.current?.type === "tier"
        const isOverInitialContainer =
            changedTiers.start == changedTiers.end || !changedTiers.end

        move(
            isOverTier,
            isOverInitialContainer,
            ranks,
            active,
            over,
            setRanks,
            user,
            boardItems,
            changedTiers,
            startSortable,
            board,
        )
    }
    // Sensors
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 2,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 150ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 150,
            tolerance: 5,
        },
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    return (
        <DndContext
            sensors={sensors}
            // collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div
                className={`no-scrollbar col-start-2 col-end-3 flex h-full flex-1 flex-col overflow-x-visible overflow-y-scroll pb-8`}
            >
                <BoardBar
                    title={boardName}
                    showServerRanks={showServerRanks}
                    setShowServerRanks={setShowServerRanks}
                    queueIsOpen={queueIsOpen}
                    setQueueIsOpen={setQueueIsOpen}
                    board={board}
                    appData={appData}
                />
                <TierContainer
                    ranks={ranks}
                    showServerRanks={showServerRanks}
                    serverRanks={serverRanks}
                    appData={appData}
                    activeItem={activeItem ? true : false}
                />
            </div>
            <CardQueue
                board={board}
                appData={appData}
                queue={ranks.cardsQueue}
                activeCardIndex={activeCardIndex}
                setActiveCardIndex={setActiveCardIndex}
                queueIsOpen={queueIsOpen}
                setQueueIsOpen={setQueueIsOpen}
                activeItem={activeItem ? true : false}
            />
            <DragOverlay modifiers={[restrictToWindowEdges]}>
                <CardOverlay item={activeItem} board={board} />
            </DragOverlay>
        </DndContext>
    )
}
