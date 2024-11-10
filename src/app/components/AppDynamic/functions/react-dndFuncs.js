import makeUpdates from "./makeUpdates"
import compareIndexes from "./compareIndexes"
import sortItems from "./sortItems"

/** reorders a list when changing positions of items **/
export function reorder(list, startIndex, endIndex) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

/** Moves an item from one list to another list. **/
export function move(
    isOverTier,
    isOverInitialContainer,
    ranks,
    active,
    over,
    setRanks,
    user,
    boardItems,
    changedTiers,
    startSortable,
    board,
) {
    let newState = {
        ...ranks,
    }

    if (!isOverTier && isOverInitialContainer) {
        let items = reorder(
            ranks[active.data.current?.tier],
            active.data.current?.index,
            over.data.current?.index,
        )
        newState[active.data.current?.tier] = items

        let changedItems = compareIndexes(
            ranks[active.data.current?.tier],
            newState[active.data.current?.tier],
        )
        setRanks(newState)

        makeUpdates(
            changedItems,
            newState[active.data.current?.tier],
            active.data.current?.tier,
            user,
            board.id,
        )
    } else if (!isOverTier && !isOverInitialContainer) {
        let baseRanks = sortItems(boardItems, user, board.id)
        let items = reorder(
            ranks[active.data.current?.tier],
            active.data.current?.index,
            over.data.current?.index,
        )
        newState[active.data.current?.tier] = items
        setRanks(newState)

        let changedItemsToTier = compareIndexes(
            baseRanks[active.data.current?.tier],
            newState[active.data.current?.tier],
        )
        let changedItemsFromTier = compareIndexes(
            baseRanks[changedTiers.start],
            newState[changedTiers.start],
        )
        makeUpdates(
            changedItemsToTier,
            newState[active.data.current?.tier],
            active.data.current?.tier,
            user,
            board.id,
        )
        makeUpdates(
            changedItemsFromTier,
            newState[startSortable.containerId],
            startSortable.containerId,
            user,
            board.id,
        )
    } else {
        makeUpdates(
            [active.data.current?.item],
            ranks[active.data.current?.tier],
            active.data.current?.tier,
            user,
            board.id,
        )
    }
}
