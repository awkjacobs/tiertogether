import ResponsiveTooltip from "@/app/components/ui/ResponsiveTooltip"

const scoreBar = {
    1: { style: "sRank", rank: "S" },
    2: { style: `bg-teal-500/20`, rank: "A" },
    3: { style: `bg-green-500/20`, rank: "B" },
    4: { style: `bg-yellow-500/20`, rank: "C" },
    5: { style: `bg-orange-500/20`, rank: "D" },
    6: { style: `bg-red-500/20`, rank: "F" },
    7: { style: `bg-zinc-600/10`, rank: "Bleachers" },
    8: { style: `bg-zinc-600/10`, rank: "Dugout" },
}

export default function RankChart({ ranks }) {
    const scores1 = ranks
        .map((rank) => {
            return { score: rank.rank.split(".")[0], user: rank.name }
        })
        .filter((item) => item.score !== "7")
    console.log(scores1)

    const scores = scores1.reduce((acc, curr) => {
        const key = curr.score
        acc[key] = acc[key] ? [...acc[key], curr] : [curr]
        return acc
    }, [])
    console.log(scores)
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
                                className={`h-full text-center font-bold flex-${scoreGroup.length} ${scoreBar[index].style}`}
                            >
                                {scoreBar[index].rank}
                            </div>
                        }
                        content={
                            <div className={`flex flex-wrap gap-2`}>
                                {scoreGroup.map((score) => (
                                    <p key={score}>{score.user}</p>
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
