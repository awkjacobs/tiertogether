import { cn } from "@lib/utils"
import { convertRank } from "../Dialogs/Dialog Modules/Dialog Functions/convertRank"
import { useContext } from "react"
import { AppDataContext } from "../_providers/appDataProvider"

export function RankGroup({ rank }) {
    const { appData } = useContext(AppDataContext)
    const name = rank.id === appData.user.id ? <b>Your Ranking</b> : rank.name

    return (
        <div className={`flex items-center justify-between gap-2 text-xs`}>
            <p>{name} </p>

            <Rank value={rank.rank} />
        </div>
    )
}
export function RankOverall({ averageRank, className }) {
    console.log(averageRank)
    return (
        <div
            className={cn(
                `flex items-center justify-between gap-2 text-xs`,
                className,
            )}
        >
            <p>
                <b>AVERAGE</b>
            </p>
            <Rank value={averageRank} />
        </div>
    )
}
function Rank({ value }) {
    const { appData } = useContext(AppDataContext)

    return (
        <div
            className={`flex h-6 min-w-6 items-center justify-center rounded bg-surface-300 px-2 dark:bg-surface-800`}
        >
            <p>{convertRank(value, appData)}</p>
        </div>
    )
}
