export default function sortItems(boardItems, user, boardId) {
    const filterFunc = (item, score) => {
        return (
            item.rank
                .find((ranking) => ranking.userId === user.id)
                ?.rank.split(".")[0] == score
        )
    }

    const newState = {}
    newState.allItems = boardItems
    const usersRanked = boardItems.filter((item) =>
        item.rank.filter(
            (userRank) =>
                userRank.userId === user.id && userRank.boardId === boardId,
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

    bleachers.sort((a, b) => sort(a, b, user))
    dugout.sort((a, b) => sort(a, b, user))
    s.sort((a, b) => sort(a, b, user))
    a.sort((a, b) => sort(a, b, user))
    b.sort((a, b) => sort(a, b, user))
    c.sort((a, b) => sort(a, b, user))
    d.sort((a, b) => sort(a, b, user))
    f.sort((a, b) => sort(a, b, user))

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
function sort(a, b, user) {
    return Number(
        a.rank.find((rank) => rank.userId === user.id).rank.split(".")[1],
    ) >
        Number(
            b.rank.find((rank) => rank.userId === user.id).rank.split(".")[1],
        )
        ? 1
        : Number(
                a.rank
                    .find((rank) => rank.userId === user.id)
                    .rank.split(".")[1],
            ) <
            Number(
                b.rank
                    .find((rank) => rank.userId === user.id)
                    .rank.split(".")[1],
            )
          ? -1
          : 0
}
