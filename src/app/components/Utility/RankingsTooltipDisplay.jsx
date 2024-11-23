export default function RankingsTooltipDisplay({ difference, children }) {
    return (
        <div className={`space-y-2 text-sm`}>
            {difference === "higher" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>HIGHER</i>
                    </b>{" "}
                    than your rating
                </>
            )}
            {difference === "equals" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>EQUAL</i>
                    </b>{" "}
                    to your rating
                </>
            )}
            {difference === "lower" && (
                <>
                    Board average is{" "}
                    <b>
                        <i>LOWER</i>
                    </b>{" "}
                    than your rating
                </>
            )}

            <div
                className={`space-y-2 rounded border border-zinc-300 p-2 dark:border-zinc-800`}
            >
                {children}
            </div>
        </div>
    )
}
