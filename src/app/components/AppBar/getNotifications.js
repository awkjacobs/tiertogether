import { PRISMA_GET_ALL_NOTIFICATIONS } from "@prismaFuncs/prismaFuncs"

export default async function getNotifications(boardIdArray) {
    const allNotifications = await PRISMA_GET_ALL_NOTIFICATIONS(boardIdArray)
    const spreadNotifications = [...allNotifications[0], ...allNotifications[1]]

    return spreadNotifications.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
}
