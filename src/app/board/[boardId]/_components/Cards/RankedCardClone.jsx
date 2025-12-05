import { Card } from "./Card"
import { useMediaQuery } from "@app/hooks/use-media-query"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import RankingsTooltipDisplay from "@app/components/Utility/RankingsTooltipDisplay"
import { RankGroup, RankOverall } from "@app/components/Utility/RankGroup"
import { COMPARED_RANK, SCORE_DIF } from "@lib/const"
import { useContext } from "react"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import RankBadge from "./Card Components/RankBadge"

export default function RankedCardClone(props) {
    const { item } = props
    const { appData, userEntries } = useContext(AppDataContext)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const scoreToCompareAgainst = item?.averageRank
        ? item.averageRank
        : item.rank.find((ranking) => {
              return ranking.userId === userEntries
          }).rank

    const userRank = item.rank.find((ranking) => {
        return ranking.userId === appData.user.id
    })

    userRank.name = appData.user.name
    userRank.id = userRank.userId

    const serverAverageIsHigherThanUserScore = () => {
        if (userRank.rank.split(".")[0] >= 7 || userRank.rank === "") return "u"
        if (scoreToCompareAgainst.split(".")[0] < userRank.rank.split(".")[0])
            return 1
        else if (
            scoreToCompareAgainst.split(".")[0] == userRank.rank.split(".")[0]
        )
            return 0
        else if (
            scoreToCompareAgainst.split(".")[0] > userRank.rank.split(".")[0]
        )
            return -1
        else return "u"
    }
    const difference = SCORE_DIF(serverAverageIsHigherThanUserScore())

    if (!isDesktop)
        return (
            <div className="relative mx-1 overflow-clip rounded">
                <Popover>
                    <PopoverTrigger className="absolute right-0">
                        <RankBadge difference={difference} />
                    </PopoverTrigger>
                    <PopoverContent side={"top"} className={`w-fit`}>
                        <RankingsTooltipDisplay
                            difference={difference}
                            userEntries={userEntries}
                        >
                            {userEntries === "overall" && (
                                <RankOverall
                                    averageRank={scoreToCompareAgainst}
                                />
                            )}
                            {userEntries !== "overall" && (
                                <RankGroup
                                    rank={COMPARED_RANK(
                                        item,
                                        appData,
                                        userEntries,
                                        scoreToCompareAgainst,
                                    )}
                                />
                            )}
                            <RankGroup rank={userRank} />
                        </RankingsTooltipDisplay>
                    </PopoverContent>
                </Popover>
                <Card {...props} difference={difference}></Card>
            </div>
        )

    return (
        <Card
            {...props}
            difference={difference}
            scoreToCompareAgainst={scoreToCompareAgainst}
        >
            <RankBadge difference={difference} />
        </Card>
    )
}
