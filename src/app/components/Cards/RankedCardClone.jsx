import RankBadge from "./Card Components/RankBadge"
import { Card } from "./Card"

export default function RankedCardClone(props) {
    const average = props.item.averageRank.split(".")[0]
    const userRank = props.item.rank
        .find((ranking) => {
            return ranking.userId === props.appData.user.id
        })
        .rank.split(".")[0]

    const serverAverageIsHigherThanUserScore = () => {
        if (average < userRank) return 1
        if (average == userRank) return 0
        else return -1
    }

    return (
        <Card {...props} vsScore={serverAverageIsHigherThanUserScore()}>
            <RankBadge vsScore={serverAverageIsHigherThanUserScore()} />
        </Card>
    )
}
