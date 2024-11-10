export function convertRank(rank, appData) {
    const { board } = appData
    const { bleachersLabel, dugoutLabel, specialThreshold } = board

    let threshold = specialThreshold / 100

    let subrank = Number(rank.split(".")[1]) + 1

    let score
    switch (true) {
        case rank <= 2 - threshold:
            score = `S ${subrank}`
            break
        case rank < 3:
            score = `A ${subrank}`
            break
        case rank < 4:
            score = `B ${subrank}`
            break
        case rank < 5:
            score = `C ${subrank}`
            break
        case rank < 6:
            score = `D ${subrank}`
            break
        case rank < 7:
            score = `F ${subrank}`
            break
        case rank < 8:
            score = bleachersLabel
            break
        case rank < 9:
            score = dugoutLabel
            break

        default:
            score = "Unscored"
            break
    }
    return score
}
