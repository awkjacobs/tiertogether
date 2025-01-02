import { AppDataContext } from "@app/components/_providers/appDataProvider"
import ResponsiveTooltip from "@app/components/ui/ResponsiveTooltip"
import { SCORE_BAR, SCORE_FLEX } from "@lib/const"
import { useContext } from "react"
import { Textfit } from "react-textfit"

export default function RankChart({ ranks }) {
    const { appData } = useContext(AppDataContext)
    const { board } = appData
    const tierLabels = JSON.parse(board.tierLabels)

    const scores = ranks
        .map((rank) => {
            return { score: rank.rank.split(".")[0], user: rank.name }
        })
        .filter((item) => item.score !== "7")
        .reduce((acc, curr) => {
            const key = curr.score
            acc[key] = acc[key] ? [...acc[key], curr] : [curr]
            return acc
        }, [])

    if (scores.length > 0)
        return (
            <div
                className={`flex h-6 min-w-6 items-center justify-center overflow-clip rounded bg-surface-300 dark:bg-surface-800`}
            >
                {scores.map((scoreGroup, index) => (
                    <ResponsiveTooltip
                        key={index}
                        trigger={
                            <div
                                key={index}
                                className={`h-full text-center font-bold ${SCORE_BAR[index].style}`}
                                style={{
                                    width: `${(scoreGroup.length / scores.filter((item) => item.length > 0).length) * 100}%`,
                                }}
                            >
                                <Textfit
                                    mode="multi"
                                    max={16}
                                    className={`flex h-full items-center justify-center px-1 text-center font-bold ${SCORE_FLEX(scoreGroup)} ${SCORE_BAR[index].style}`}
                                >
                                    {tierLabels[index - 1]}
                                </Textfit>
                            </div>
                        }
                        content={
                            <div className={`flex flex-col flex-wrap gap-2`}>
                                {scoreGroup.map((score) => (
                                    <p key={score.user}>{score.user}</p>
                                ))}
                            </div>
                        }
                        side="top"
                        className={`w-fit`}
                    />
                ))}
            </div>
        )
}
