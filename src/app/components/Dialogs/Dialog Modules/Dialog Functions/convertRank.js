export function convertRank(rank, appData) {
    const { board } = appData
    const { bleachersLabel, dugoutLabel } = board

    let subrank = Number(rank.split(".")[1]) + 1

    let score
    switch (true) {
        case rank < 2 && rank > 0:
            score = `S ${subrank}`
            break
        case rank < 3 && rank >= 2:
            score = `A ${subrank}`
            break
        case rank < 4 && rank >= 3:
            score = `B ${subrank}`
            break
        case rank < 5 && rank >= 4:
            score = `C ${subrank}`
            break
        case rank < 6 && rank >= 5:
            score = `D ${subrank}`
            break
        case rank < 7 && rank >= 6:
            score = `F ${subrank}`
            break
        case rank < 8 && rank >= 7:
            score = bleachersLabel
            break
        case rank < 9 && rank >= 8:
            score = dugoutLabel
            break

        default:
            score = "Unscored"
            break
    }
    return score
}
