export default function sortItems(boardItems, userId, boardId) {
    const filterFunc = (item, score) => {
        return (
            item.rank
                .find((ranking) => ranking.userId === userId)
                ?.rank.split(".")[0] == score
        )
    }

    const newState = {}
    newState.allItems = boardItems
    const usersRanked = boardItems.filter((item) =>
        item.rank.filter(
            (userRank) =>
                userRank.userId === userId && userRank.boardId === boardId,
        ),
    )

    let queue = usersRanked.filter((item) => filterFunc(item, ""))

    let s = usersRanked.filter((item) => filterFunc(item, 1))
    let a = usersRanked.filter((item) => filterFunc(item, 2))
    let b = usersRanked.filter((item) => filterFunc(item, 3))
    let c = usersRanked.filter((item) => filterFunc(item, 4))
    let d = usersRanked.filter((item) => filterFunc(item, 5))
    let f = usersRanked.filter((item) => filterFunc(item, 6))

    let bleachers = usersRanked.filter((item) => filterFunc(item, 7))
    let dugout = usersRanked.filter((item) => filterFunc(item, 8))

    bleachers.sort((a, b) => sort(a, b, userId))
    dugout.sort((a, b) => sort(a, b, userId))
    s.sort((a, b) => sort(a, b, userId))
    a.sort((a, b) => sort(a, b, userId))
    b.sort((a, b) => sort(a, b, userId))
    c.sort((a, b) => sort(a, b, userId))
    d.sort((a, b) => sort(a, b, userId))
    f.sort((a, b) => sort(a, b, userId))

    newState.cardsQueue = !queue ? [] : queue
    newState.bleachers = !bleachers ? [] : bleachers
    newState.dugout = !dugout ? [] : dugout
    newState.sRank = !s ? [] : s
    newState.aRank = !a ? [] : a
    newState.bRank = !b ? [] : b
    newState.cRank = !c ? [] : c
    newState.dRank = !d ? [] : d
    newState.fRank = !f ? [] : f

    return newState
}
function sort(a, b, userId) {
    return Number(
        a.rank.find((rank) => rank.userId === userId).rank.split(".")[1],
    ) > Number(b.rank.find((rank) => rank.userId === userId).rank.split(".")[1])
        ? 1
        : Number(
                a.rank
                    .find((rank) => rank.userId === userId)
                    .rank.split(".")[1],
            ) <
            Number(
                b.rank
                    .find((rank) => rank.userId === userId)
                    .rank.split(".")[1],
            )
          ? -1
          : 0
}
