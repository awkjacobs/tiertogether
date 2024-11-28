export const ROW_OPTIONS = {
    special: false,
    bleachers: false,
    bleachersLabel: "Bleachers",
    dugout: false,
    dugoutLabel: "Dugout",
    specialThreshold: 50,
}
export const sortedBoards = (boards) =>
    boards.toSorted((a, b) =>
        a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0,
    )
export const scoreDif = (vsScore) => {
    return {
        "-1": "lower",
        0: "equals",
        1: "higher",
    }[vsScore]
}
export const queryTypesList = (type) => {
    return {
        movie: ["Title", "Director", "Actor"],
        anime: ["Series", "Movie"],
        tv: ["Series", "Actor"],
    }[type]
}

import Crown from "@/app/components/Utility/Crown"
import { Minus, Plus, SquarePlus, UserMinus, UserPlus } from "lucide-react"

export const NOTIFICATION_ICONS = {
    Invitation: (
        <SquarePlus
            className={"col-start-1 col-end-2 row-span-2 text-purple-500"}
        />
    ),
    itemAdded: (
        <Plus className={"col-start-1 col-end-2 row-span-2 text-emerald-500"} />
    ),
    itemRemoved: (
        <Minus className={`col-start-1 col-end-2 row-span-2 text-rose-500`} />
    ),
    join: (
        <UserPlus
            className={`col-start-1 col-end-2 row-span-2 text-emerald-500`}
        />
    ),
    leave: (
        <UserMinus
            className={`col-start-1 col-end-2 row-span-2 text-zinc-500`}
        />
    ),
    kick: (
        <UserMinus
            className={`col-start-1 col-end-2 row-span-2 text-rose-500`}
        />
    ),
    newOwner: <Crown className={`col-start-1 col-end-2 row-span-2`} />,
}

export const itemType = (board, queryType) => {
    if (board.type == "movie") return "movie"
    else if (board.type == "tv") return "tv"
    else if (board.type == "anime" && queryType == "Series") return "tv"
    else if (board.type == "anime" && queryType == "Movie") return "movie"
}
