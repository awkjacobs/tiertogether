export function stateAverage(items) {
    const averages = []

    items.forEach((item) => {
        let rankCount = item.rank.length

        let sum = item.rank.reduce((averageRank, ranking) => {
            if (ranking.rank === "") rankCount--
            return averageRank + Number(ranking.rank)
        }, 0)

        let average = sum / rankCount

        averages.push({
            id: item.id,
            name: item.name,
            description: item.description,
            poster: item.poster,
            backdrop: item.backdrop,
            release_date: item.release_date,
            boardId: item.boardId,
            rank: item.rank,
            averageRank: average.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }),
        })
    })

    const newState = {
        // ...averages,
    }
    newState.allItems = averages

    let queue = averages.filter((item) => item.averageRank === "")
    let s = averages.filter((item) => item.averageRank <= 1.25)
    let a = averages.filter(
        (item) => item.averageRank < 3 && item.averageRank > 1.25
    )
    let b = averages.filter(
        (item) => item.averageRank < 4 && item.averageRank >= 3
    )
    let c = averages.filter(
        (item) => item.averageRank < 5 && item.averageRank >= 4
    )
    let d = averages.filter(
        (item) => item.averageRank < 6 && item.averageRank >= 5
    )
    let f = averages.filter(
        (item) => item.averageRank < 7 && item.averageRank >= 6
    )

    s.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )
    a.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )
    b.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )
    c.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )
    d.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )
    f.sort((a, b) =>
        a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
            ? 1
            : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
            ? -1
            : 0
    )

    newState.cardsQueue = !queue ? [] : queue
    newState.sRank = !s ? [] : s
    newState.aRank = !a ? [] : a
    newState.bRank = !b ? [] : b
    newState.cRank = !c ? [] : c
    newState.dRank = !d ? [] : d
    newState.fRank = !f ? [] : f

    return newState
}
