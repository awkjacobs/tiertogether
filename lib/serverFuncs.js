export function serverAverage(board) {
    const { items } = board

    const averages = []

    items.forEach((item) => {
        let rankCount = item.rank.length

        let sum = item.rank.reduce((averageRank, ranking) => {
            if (ranking.rank === "") rankCount--
            return averageRank + Number(ranking.rank)
        }, 0)

        let average = sum < 1 ? 99 : sum / rankCount

        averages.push({
            ...item,
            averageRank: average.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }),
        })
    })
    const newState = {}

    let queue = averages.filter((item) => item.averageRank > 98)

    let s = filterAndSort(averages, 2, 0)
    let a = filterAndSort(averages, 3, 2)
    let b = filterAndSort(averages, 4, 3)
    let c = filterAndSort(averages, 5, 4)
    let d = filterAndSort(averages, 6, 5)
    let f = filterAndSort(averages, 7, 6)
    let bleachers = filterAndSort(averages, 8, 7)
    let dugout = filterAndSort(averages, 9, 8)

    newState.cardsQueue = !queue ? [] : queue
    newState.sRank = !s ? [] : s
    newState.aRank = !a ? [] : a
    newState.bRank = !b ? [] : b
    newState.cRank = !c ? [] : c
    newState.dRank = !d ? [] : d
    newState.fRank = !f ? [] : f
    newState.bleachers = !bleachers ? [] : bleachers
    newState.dugout = !dugout ? [] : dugout
    newState.allItems = [
        ...queue,
        ...s,
        ...a,
        ...b,
        ...c,
        ...d,
        ...f,
        ...bleachers,
        ...dugout,
    ]

    return newState
}

const filterAndSort = (averages, startScore, endScore) => {
    return averages
        .filter(
            (item) =>
                item.averageRank < startScore && item.averageRank >= endScore,
        )
        .sort((a, b) =>
            a.averageRank.split(".")[1] > b.averageRank.split(".")[1]
                ? 1
                : a.averageRank.split(".")[1] < b.averageRank.split(".")[1]
                  ? -1
                  : 0,
        )
        .map((item, index) => {
            return {
                ...item,
                averageRank:
                    item.averageRank.split(".")[0] +
                    "." +
                    (index > 9 ? index : `0${index}`),
            }
        })
}
