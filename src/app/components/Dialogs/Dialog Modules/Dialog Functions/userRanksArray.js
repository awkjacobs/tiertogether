export function userRanksArray(item, users, boardId) {
    let ranksArray = []

    item.rank.forEach((ranking) => {
        if (ranking.boardId !== boardId) return

        let userMatch = users.find((user) => {
            return user.id == ranking.userId
        })

        ranksArray.push({
            name: userMatch.name,
            id: userMatch.id,
            rank: ranking.rank ? ranking.rank : "Unranked",
            boardId: ranking.boardId,
        })
    })

    return ranksArray
}
