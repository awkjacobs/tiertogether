import { cn } from "@/lib/utils"
import { convertRank } from "../Dialogs/Dialog Modules/Dialog Functions/convertRank"

export function RankGroup({ rank, appData }) {
    const name = rank.id === appData.user.id ? <b>Your Ranking</b> : rank.name

    return (
        <div className={`flex items-center justify-between text-xs`}>
            <p>{name} </p>

            <Rank value={rank.rank} appData={appData} />
        </div>
    )
}
export function RankOverall({ averageRank, appData, className }) {
    console.log(averageRank)
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
            <Rank value={averageRank} appData={appData} />
        </div>
    )
}
function Rank({ value, appData }) {
    return (
        <div
            className={`flex h-6 min-w-6 items-center justify-center rounded bg-surface-300 px-2 dark:bg-surface-800`}
        >
            <p>{convertRank(value, appData)}</p>
        </div>
    )
}
