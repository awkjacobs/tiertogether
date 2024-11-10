import { PRISMA_SET_BOARD_NOTIFICATIONS } from "@prismaFuncs/prismaFuncs"

export async function setNotificationsForUsers(
    board,
    addedBy,
    content,
    type,
    idArr,
) {
    let notification = {
        addedBy: addedBy,
        content: content,
        type: type,
    }

    board.users.forEach(async (user) => {
        await PRISMA_SET_BOARD_NOTIFICATIONS(board.id, user, notification)
    })
}
