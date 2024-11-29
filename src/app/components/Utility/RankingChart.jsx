import ResponsiveTooltip from "@/app/components/ui/ResponsiveTooltip"
import { scoreBar, scoreFlex } from "@/lib/const"

export default function RankChart({ ranks }) {
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
                                className={`h-full text-center font-bold ${scoreFlex(scoreGroup)} ${scoreBar[index].style}`}
                            >
                                {scoreBar[index].rank}
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
