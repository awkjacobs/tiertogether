import { findUserName } from "@lib/const"
import { AppDataContext } from "../_providers/appDataProvider"
import { useContext } from "react"

export default function RankingsTooltipDisplay({
    difference,
    userEntries,
    children,
}) {
    const { appData } = useContext(AppDataContext)
    const comparedAgainst =
        userEntries === "overall"
            ? "Board average"
            : `${findUserName(userEntries, appData)}'s rank`

    return (
        <div className={`space-y-2 whitespace-nowrap text-sm`}>
            {difference === "higher" && (
                <>
                    {comparedAgainst} is{" "}
                    <b>
                        <i>HIGHER</i>
                    </b>{" "}
                    than your rank
                </>
            )}
            {difference === "equals" && (
                <>
                    {comparedAgainst} is{" "}
                    <b>
                        <i>EQUAL</i>
                    </b>{" "}
                    to your rank
                </>
            )}
            {difference === "lower" && (
                <>
                    {comparedAgainst} is{" "}
                    <b>
                        <i>LOWER</i>
                    </b>{" "}
                    than your rank
                </>
            )}
            {difference === "u" && <p>You haven&apos;t ranked this item yet</p>}

            <div
                className={`space-y-2 rounded border border-zinc-300 p-2 dark:border-zinc-800`}
            >
                {children}
            </div>
        </div>
    )
}
