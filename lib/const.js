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

import { Minus, Plus, SquarePlus } from "lucide-react"

export const TYPE_RETURN = {
    itemAdded: {
        title: "Item Added",
        titleColor: "text-emerald-500",
        icon: (
            <Plus
                className={"col-start-1 col-end-2 row-span-2 text-emerald-500"}
            />
        ),
    },
    itemRemoved: {
        title: "Item Removed",
        titleColor: "text-rose-500",
        icon: (
            <Minus
                className={`col-start-1 col-end-2 row-span-2 text-rose-500`}
            />
        ),
    },
    Invitation: {
        title: "Board Invitation",
        titleColor: "text-purple-500",
        icon: (
            <SquarePlus
                className={"col-start-1 col-end-2 row-span-2 text-purple-500"}
            />
        ),
    },
}
export const itemType = (board, queryType) => {
    if (board.type == "movie") return "movie"
    else if (board.type == "tv") return "tv"
    else if (board.type == "anime" && queryType == "Series") return "tv"
    else if (board.type == "anime" && queryType == "Movie") return "movie"
}
