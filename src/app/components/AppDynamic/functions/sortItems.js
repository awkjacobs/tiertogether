export default function sortItems(boardItems, user, boardId) {
    const newState = {}
    newState.allItems = boardItems

    const usersRanked = boardItems.filter((item) =>
        item.rank.filter(
            (userRank) =>
                userRank.userId === user.id && userRank.boardId === boardId,
        ),
    )

    let queue = usersRanked.filter(
        (item) =>
            item.rank.find(
                (ranking) =>
                    ranking.userId === user.id && ranking.boardId === boardId,
            ).rank === "",
    )
    let bleachers = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 7,
    )
    let dugout = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 8,
    )

    let s = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 1,
    )
    let a = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 2,
    )
    let b = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 3,
    )
    let c = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 4,
    )
    let d = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 5,
    )
    let f = usersRanked.filter(
        (item) =>
            item.rank
                .find(
                    (ranking) =>
                        ranking.userId === user.id &&
                        ranking.boardId === boardId,
                )
                .rank.split(".")[0] == 6,
    )

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
