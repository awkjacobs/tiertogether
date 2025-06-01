"use client"

import { useEffect, useState } from "react"

import { activeItemAtom, showDifferenceAtom } from "@app/atoms"
import { AppDataContext } from "@components/_providers/appDataProvider"
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useAtom, useSetAtom } from "jotai"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import BoardErrorBoundary from "../../error"
import CardQueue from "../Card Queue/CardQueue"
import CardOverlay from "../Cards/CardOverlay"
import InfoDialog from "../Dialogs/InfoDialog"
import TierContainer from "../Tierlist/TierContainer"
import BoardBar from "./BoardBar"
import { move } from "./functions/react-dndFuncs"
import sortItems from "./functions/sortItems"

export default function DraggingContent({ appData }) {
    const { board, user } = appData

    const boardItems = board.items
    const [userEntries, setUserEntries] = useState(user.id)

    const [ranks, setRanks] = useState(
        sortItems(boardItems, userEntries, board.id),
    )

    const setShowDifference = useSetAtom(showDifferenceAtom)

    useEffect(() => {
        setShowDifference(userEntries !== user.id)
    }, [setShowDifference, userEntries, user.id])

    useEffect(() => {
        if (userEntries === "overall") return
        setRanks(sortItems(boardItems, userEntries, board.id))
    }, [boardItems, userEntries, board.id])

    // drag and drop
    const [activeItem, setActiveItem] = useAtom(activeItemAtom)
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

        setActiveItem(event.active.data.current.item)
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
                    activeItems[activeIndex],
                    ...prev[overContainer].slice(
                        newIndex,
                        prev[overContainer].length,
                    ),
                ],
            }
        })
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
        <AppDataContext.Provider
            value={{
                appData,
                userEntries,
            }}
        >
            <ErrorBoundary errorComponent={BoardErrorBoundary}>
                <DndContext
                    sensors={sensors}
                    // collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div
                        className={`no-scrollbar col-start-2 col-end-5 row-start-2 row-end-3 flex h-full w-full flex-1 flex-col place-self-center overflow-x-visible overflow-y-scroll pb-36 md:pb-72`}
                    >
                        <BoardBar setUserEntries={setUserEntries} />
                        <TierContainer ranks={ranks} />
                    </div>
                    <CardQueue queue={ranks.cardsQueue} />
                    <DragOverlay modifiers={[restrictToWindowEdges]}>
                        <CardOverlay item={activeItem} />
                    </DragOverlay>
                    <InfoDialog />
                </DndContext>
            </ErrorBoundary>
        </AppDataContext.Provider>
    )
}
