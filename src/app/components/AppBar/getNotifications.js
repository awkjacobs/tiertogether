import { PRISMA_GET_ALL_NOTIFICATIONS } from "@api/prismaFuncs"

export default async function getNotifications(boardIdArray) {
    const allNotifications = await PRISMA_GET_ALL_NOTIFICATIONS(boardIdArray)
    const spreadNotifications = [...allNotifications[0], ...allNotifications[1]]

    return spreadNotifications
}
