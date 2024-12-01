import { cn } from "@/lib/utils"
import { convertRank } from "../Dialogs/Dialog Modules/Dialog Functions/convertRank"
import { useContext } from "react"
import { AppDataContext } from "../_providers/appDataProvider"

export function RankGroup({ rank }) {
    const { appData } = useContext(AppDataContext)
    const name = rank.id === appData.user.id ? <b>Your Ranking</b> : rank.name
    console.log(rank)
    return (
        <div className={`flex items-center justify-between text-xs`}>
            <p>{name} </p>

            <Rank value={rank.rank} />
        </div>
    )
}
export function RankOverall({ averageRank, className }) {
    console.log("rankOverall")
    return (
        <div
            className={cn(
                `flex items-center justify-between text-xs`,
                className,
            )}
        >
            <p>
                <b>OVERALL</b>
            </p>
            <Rank value={averageRank} />
        </div>
    )
}
function Rank({ value }) {
    const { appData } = useContext(AppDataContext)
    console.log(value)
    return (
        <div
            className={`flex h-6 min-w-6 items-center justify-center rounded bg-surface-300 px-2 dark:bg-surface-800`}
        >
            <p>{convertRank(value, appData)}</p>
        </div>
    )
}
