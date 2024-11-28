import { PRISMA_UPDATE_RANK } from "@prismaFuncs/prismaFuncs"

export default async function makeUpdates(
    changedItems,
    items,
    tier,
    user,
    boardId,
) {
    if (changedItems.length === 0) return
    let changedItemsIdArray = changedItems.map((item) => item.id)
    let scoresObj = {}
    changedItems.forEach((item) => {
        let score

        let subscore = items.indexOf(item).toString().padStart(2, "0")

        switch (tier) {
            case "sRank":
                score = "1." + subscore
                break
            case "aRank":
                score = "2." + subscore
                break
            case "bRank":
                score = "3." + subscore
                break
            case "cRank":
                score = "4." + subscore
                break
            case "dRank":
                score = "5." + subscore
                break
            case "fRank":
                score = "6." + subscore
                break
            case "bleachers":
                score = "7." + subscore
                break
            case "dugout":
                score = "8." + subscore
                break
            case "cardsQueue":
                score = ""
                break
            default:
                break
        }
        scoresObj[item.id] = score
    })
    await PRISMA_UPDATE_RANK(changedItemsIdArray, user, boardId, scoresObj)
}
