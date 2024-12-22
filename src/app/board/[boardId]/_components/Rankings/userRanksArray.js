export function userRanksArray(item, userRank, appData) {
    const { board, user: currentUser } = appData
    const { users } = board
    let ranksArray = []

    item.rank.forEach((ranking) => {
        let userMatch = users.find((user) => {
            return user.id == ranking.userId
        })

        if (userMatch.id === currentUser.id) {
            ranking.rank = userRank.rank
        }
        ranksArray.push({
            name: userMatch.name,
            id: userMatch.id,
            rank: ranking.rank ? ranking.rank : "Unranked",
            boardId: ranking.boardId,
        })
    })

    return ranksArray
}
