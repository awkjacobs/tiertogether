export function convertRank(rank, appData) {
    const { board } = appData
    const tierLabels = JSON.parse(board.tierLabels)
    const { bleachersLabel, dugoutLabel } = board

    let subrank = Number(rank.split(".")[1]) + 1

    let score
    switch (true) {
        case rank < 2 && rank > 0:
            score = `${tierLabels[0]} ${subrank}`
            break
        case rank < 3 && rank >= 2:
            score = `${tierLabels[1]} ${subrank}`
            break
        case rank < 4 && rank >= 3:
            score = `${tierLabels[2]} ${subrank}`
            break
        case rank < 5 && rank >= 4:
            score = `${tierLabels[3]} ${subrank}`
            break
        case rank < 6 && rank >= 5:
            score = `${tierLabels[4]} ${subrank}`
            break
        case rank < 7 && rank >= 6:
            score = `${tierLabels[5]} ${subrank}`
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
