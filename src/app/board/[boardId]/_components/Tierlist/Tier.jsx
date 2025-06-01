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
 * @param {string} props.tier - Identifier for the tier.
 * @param {Array} [props.entries] - List of entry objects to display in the tier.
 * @param {string} props.label - Label text for the tier.
 * @param {boolean} props.queueShouldBeOpen - Indicates if the queue should be open for ranked card clones.
 */

export function Tier(props) {
    const showDifference = useAtomValue(showDifferenceAtom)

    const { active, isOver, setNodeRef } = useSortable({
        id: props.tier,
        data: { type: "tier" },
    })

    const entries = props.entries ? props.entries : []

    const style = TIER_STYLE(props.tier)

    return (
        <section
            className={`flex min-h-[4.75rem] overflow-hidden shadow-inner first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem] ${
                isOver
                    ? "bg-purple-400/25"
                    : "bg-surface-300 dark:bg-surface-900"
            }`}
        >
            <div
                className={`relative flex w-[clamp(2rem,_10vw,_5rem)] min-w-12 items-center justify-center p-1 text-center font-semibold md:p-2 ${style}`}
            >
                <ResizableText
                    text={props.label}
                    minFontSize={12}
                    maxFontSize={36}
                    className={`flex h-[calc(100%-.5rem)] w-[calc(100%-.5rem)] items-center justify-center`}
                />
            </div>

            {!showDifference && (
                <SortableContext items={entries ? entries : []} id={props.tier}>
                    <ul
                        ref={setNodeRef}
                        className={`m-2 flex flex-1 flex-wrap gap-y-2 md:gap-y-4 ${
                            isOver ? "" : ""
                        }`}
                    >
                        {entries &&
                            entries.map((item, index) => {
                                return (
                                    <Draggable
                                        id={item.id}
                                        key={item.id}
                                        index={index}
                                        item={item}
                                        tier={props.tier}
                                        active={active}
                                    ></Draggable>
                                )
                            })}
                    </ul>
                </SortableContext>
            )}
            {showDifference && (
                <ul className={`flex flex-1 flex-wrap gap-y-2 p-2 md:gap-y-4`}>
                    {entries.map((item, index) => {
                        return (
                            <RankedCardClone
                                id={item.id}
                                key={item.id}
                                index={index}
                                item={item}
                                tier={props.tier}
                                queueShouldBeOpen={props.queueShouldBeOpen}
                            />
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
