import { PRISMA_GET_SPECIFIC_BOARD } from "@api/prismaFuncs"
import { subscore } from "./const"

export async function serverAverage(boardId) {
    const board = await PRISMA_GET_SPECIFIC_BOARD(boardId)
    const { items } = board

    const averages = []

    items.forEach((item) => {
        let filteredRanks

        let isOnlyBleachers =
            item.rank.filter(
                (ranking) =>
                    Number(ranking.rank) >= 7 && Number(ranking.rank) < 8,
            ).length === item.rank.length

        let isOnlyDugout =
            item.rank.filter(
                (ranking) =>
                    Number(ranking.rank) >= 8 && Number(ranking.rank) < 9,
            ).length === item.rank.length

        if (isOnlyBleachers || isOnlyDugout) {
            filteredRanks = item.rank
        } else {
            filteredRanks = item.rank.filter(
                (ranking) => ranking.rank !== "" && Number(ranking.rank) < 7,
            )
        }

        let sum = filteredRanks.reduce((averageRank, ranking) => {
            return averageRank + Number(ranking.rank)
        }, 0)

        let average = sum < 1 ? 99 : sum / filteredRanks.length

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
                    item.averageRank.split(".")[0] + "." + subscore(index),
            }
        })
}
