"use server"

export async function serverAverage(board) {
    const { items, specialThreshold } = board
    let threshold = specialThreshold / 100

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

    let s = averages
        .filter((item) => item.averageRank <= 2 - threshold)
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
    let a = averages
        .filter((item) => item.averageRank < 3 && item.averageRank > 1.25)
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
    let b = averages
        .filter((item) => item.averageRank < 4 && item.averageRank >= 3)
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
    let c = averages
        .filter((item) => item.averageRank < 5 && item.averageRank >= 4)
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
    let d = averages
        .filter((item) => item.averageRank < 6 && item.averageRank >= 5)
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
    let f = averages
        .filter((item) => item.averageRank < 7 && item.averageRank >= 6)
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
    let bleachers = averages
        .filter((item) => item.averageRank < 8 && item.averageRank >= 7)
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
    let dugout = averages
        .filter((item) => item.averageRank < 9 && item.averageRank >= 8)
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
