export default function compareIndexes(originalArr, newArr) {
    return newArr.filter(
        (itemA) =>
            newArr.indexOf(itemA) !==
            originalArr.indexOf(
                originalArr.find((itemB) => itemB.id == itemA.id),
            ),
    )
}
