import RankBadge from "./Card Components/RankBadge"
import { Card } from "./Card"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RankingsTooltipDisplay from "@/components/Utility/RankingsTooltipDisplay"
import { RankGroup, RankOverall } from "@/components/Utility/RankGroup"
import { scoreDif } from "@/lib/const"
import { useContext } from "react"
import { AppDataContext } from "@/app/components/_providers/appDataProvider"

export default function RankedCardClone(props) {
    const { item } = props
    const appData = useContext(AppDataContext)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const average = item.averageRank.split(".")[0]
    const userRank = item.rank.find((ranking) => {
        return ranking.userId === appData.user.id
    })

    userRank.name = appData.user.name
    userRank.id = userRank.userId

    const serverAverageIsHigherThanUserScore = () => {
        if (average < userRank.rank.split(".")[0]) return 1
        if (average == userRank.rank.split(".")[0]) return 0
        else return -1
    }

    const difference = scoreDif(serverAverageIsHigherThanUserScore())

    if (!isDesktop)
        return (
            <Card {...props} difference={difference}>
                <Popover>
                    <PopoverTrigger>
                        <RankBadge difference={difference} />
                    </PopoverTrigger>
                    <PopoverContent side={"bottom"}>
                        <RankingsTooltipDisplay difference={difference}>
                            <RankOverall averageRank={item.averageRank} />
                            <RankGroup rank={userRank} />
                        </RankingsTooltipDisplay>
                    </PopoverContent>
                </Popover>
            </Card>
        )

    return (
        <Card {...props} difference={difference}>
            <RankBadge difference={difference} />
        </Card>
    )
}
