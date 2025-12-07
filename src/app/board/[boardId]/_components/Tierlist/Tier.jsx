import { SortableContext, useSortable } from "@dnd-kit/sortable"
import Draggable from "../Cards/Draggable"
import RankedCardClone from "../Cards/RankedCardClone"

import ResizableText from "@app/components/Utility/ResizableText"
import { showDifferenceAtom } from "../../../../atoms"
import { useAtomValue } from "jotai"
import { TIER_STYLE } from "./const"

/**
 * Renders a sortable tier section with draggable or ranked card entries based on the current difference view mode.
 *
 * Displays a labeled tier containing a list of entries, which can be reordered via drag-and-drop when not in difference mode, or shown as static ranked cards when difference mode is active.
 *
 * @param {object} props - Component properties.
 * @param {string} tier - Identifier for the tier.
 * @param {Array} [entries] - List of entry objects to display in the tier.
 * @param {string} label - Label text for the tier.
 * @param {boolean} queueShouldBeOpen - Indicates if the queue should be open for ranked card clones.
 */

export function Tier({ tier, entries, label, queueShouldBeOpen }) {
    const showDifference = useAtomValue(showDifferenceAtom)

    const { active, isOver, setNodeRef } = useSortable({
        id: tier,
        data: { type: "tier" },
    })

    const entriesArray = entries ? entries : []

    const labelStyle = TIER_STYLE(tier)

    const containerStyle = "m-2 flex flex-1 flex-wrap gap-2 md:gap-y-4"
    return (
        <section
            className={`flex min-h-[4.75rem] overflow-hidden shadow-inner first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem] ${
                isOver
                    ? "bg-purple-400/25"
                    : "bg-surface-300 dark:bg-surface-900"
            }`}
        >
            <div
                className={`relative flex w-[clamp(2rem,_10vw,_5rem)] min-w-12 items-center justify-center p-1 text-center font-semibold md:p-2 ${labelStyle}`}
            >
                <ResizableText
                    text={label}
                    minFontSize={12}
                    maxFontSize={36}
                    className={`flex h-[calc(100%-.5rem)] w-[calc(100%-.5rem)] items-center justify-center`}
                />
            </div>

            <SortableContext items={entriesArray} id={tier}>
                <ul ref={setNodeRef} className={containerStyle}>
                    {entriesArray.map((item, index) => {
                        return showDifference ? (
                            <RankedCardClone
                                id={item.id}
                                key={item.id}
                                index={index}
                                item={item}
                                tier={tier}
                                queueShouldBeOpen={queueShouldBeOpen}
                            />
                        ) : (
                            <Draggable
                                id={item.id}
                                key={item.id}
                                index={index}
                                item={item}
                                tier={tier}
                                active={active}
                            ></Draggable>
                        )
                    })}
                </ul>
            </SortableContext>
        </section>
    )
}
