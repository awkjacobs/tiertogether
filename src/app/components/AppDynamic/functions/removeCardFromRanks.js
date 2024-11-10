export function removeCardFramRanks(ranks, item) {
    const newState = {
        ...ranks,
    }
    newState.allItems = newState.allItems.filter((card) => card.id !== item.id)
    newState.cardsQueue = newState.cardsQueue.filter(
        (card) => card.id !== item.id
    )
    newState.sRank = newState.sRank.filter((card) => card.id !== item.id)
    newState.aRank = newState.aRank.filter((card) => card.id !== item.id)
    newState.bRank = newState.bRank.filter((card) => card.id !== item.id)
    newState.cRank = newState.cRank.filter((card) => card.id !== item.id)
    newState.dRank = newState.dRank.filter((card) => card.id !== item.id)
    newState.fRank = newState.fRank.filter((card) => card.id !== item.id)

    return newState
}
