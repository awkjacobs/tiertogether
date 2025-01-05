import { SortableContext, useSortable } from "@dnd-kit/sortable"
import Draggable from "../Cards/Draggable"
import RankedCardClone from "../Cards/RankedCardClone"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { useContext } from "react"
import { Textfit } from "react-textfit"

// ? - reduce the number of renders by being more selective of the entries

export function Tier(props) {
    const { appData } = useContext(AppDataContext)
    const { active, isOver, setNodeRef } = useSortable({
        id: props.tier,
        data: { type: "tier" },
    })

    const entries = props.entries ? props.entries : []

    let style
    switch (props.tier) {
        case "sRank":
            style = "sRank rounded-tl-lg"
            break
        case "aRank":
            style = `bg-teal-500/20`
            break
        case "bRank":
            style = `bg-green-500/20`
            break
        case "cRank":
            style = `bg-yellow-500/20`
            break
        case "dRank":
            style = `bg-orange-500/20`
            break
        case "fRank":
            style = `bg-red-500/20`
            break
        case "bleachers":
        case "dugout":
            style = `bg-zinc-600/10`
            break
        default:
            break
    }

    return (
        <section
            className={`flex min-h-[4.75rem] overflow-hidden shadow-inner first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem] ${
                isOver ? "bg-purple-400/25" : "bg-zinc-300 dark:bg-zinc-900"
            }`}
        >
            <div
                className={`relative flex w-[clamp(2rem,_10vw,_5rem)] min-w-12 items-center justify-center p-1 text-center font-semibold md:p-2 ${style}`}
            >
                <Textfit
                    mode="multi"
                    className={`flex h-[calc(100%-.5rem)] w-[calc(100%-.5rem)] items-center justify-center`}
                    max={36}
                >
                    {props.label}
                </Textfit>
            </div>

            {!appData.showDifference && (
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
                                        activeItem={props.activeItem}
                                    ></Draggable>
                                )
                            })}
                    </ul>
                </SortableContext>
            )}
            {appData.showDifference && (
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
