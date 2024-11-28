import { SortableContext, useSortable } from "@dnd-kit/sortable"
import Draggable from "../Cards/Draggable"
import RankedCardClone from "../Cards/RankedCardClone"
import { Star } from "lucide-react"
import ResponsiveTooltip from "../../../../components/ui/ResponsiveTooltip"
import { cn } from "@/lib/utils"

// ? - reduce the number of renders by being more selective of the entries

export function Tier(props) {
    const { active, isOver, setNodeRef } = useSortable({
        id: props.tier,
        data: { type: "tier" },
    })

    const entries = props.entries ? props.entries : []

    let style
    let tooltip
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
            style = `bg-zinc-600/10`
            break
        case "dugout":
            style = `bg-zinc-600/10`
            break
        default:
            break
    }

    return (
        <section
            className={`flex min-h-[4.75rem] overflow-hidden shadow-inner first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem] ${
                isOver
                    ? "bg-purple-400/25"
                    : "bg-surface-200 dark:bg-surface-900"
            }`}
        >
            {props.tier === "sRank" && (
                <ResponsiveTooltip
                    content={
                        <p>
                            Reserved for items with at least{" "}
                            {props.appData.board.specialThreshold}% Special
                            Rankings from users
                        </p>
                    }
                    side={"right"}
                    trigger={
                        <div
                            className={cn(
                                `flex h-full w-[clamp(2rem,_10vw,_5rem)] min-w-11 items-center justify-center overflow-hidden p-1 text-center text-tierClamp font-semibold`,
                                style,
                            )}
                        >
                            <Star color="#ffffff" />
                        </div>
                    }
                />
            )}
            {props.tier !== "sRank" && (
                <div
                    className={`flex w-[clamp(2rem,_10vw,_5rem)] min-w-11 items-center justify-center overflow-hidden p-1 text-center font-semibold ${
                        props.tier === "bleachers" || props.tier === "dugout"
                            ? "text-tierClampSmall"
                            : "text-tierClamp"
                    } ${style}`}
                >
                    {props.label}
                </div>
            )}

            {!props.showServerRanks && (
                <SortableContext items={entries ? entries : []} id={props.tier}>
                    <ul
                        ref={setNodeRef}
                        className={`m-2 flex flex-1 flex-wrap gap-y-2 md:gap-y-4 ${
                            isOver ? "" : ""
                        }`}
                    >
                        {entries &&
                            entries.map((item, index) => {
                                // if (!item) return
                                return (
                                    <Draggable
                                        id={item.id}
                                        key={item.id}
                                        index={index}
                                        item={item}
                                        tier={props.tier}
                                        active={active}
                                        appData={props.appData}
                                        activeItem={props.activeItem}
                                    ></Draggable>
                                )
                            })}
                    </ul>
                </SortableContext>
            )}
            {props.showServerRanks && (
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
                                appData={props.appData}
                            />
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
