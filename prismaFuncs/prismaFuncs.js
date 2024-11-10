"use server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"
import { MAKE_ID } from "@/lib/utils"

const prisma = new PrismaClient()

export async function PRISMA_GET_BOARDS() {
    return await prisma.board.findMany({
        include: {
            items: {
                include: {
                    rank: true,
                },
            },
            users: true,
            owner: true,
        },
    })
}
export async function PRISMA_GET_SPECIFIC_BOARD(boardId) {
    return await prisma.board.findUnique({
        where: { id: boardId },
        include: {
            items: {
                include: {
                    rank: {
                        where: {
                            boardId: boardId,
                        },
                    },
                    addedBy: true,
                },
            },
            users: true,
            owner: true,
            Rank: true,
        },
    })
}
export async function PRISMA_UPDATE_BOARD(boardId, values) {
    const boardOptions = prisma.board.update({
        where: { id: boardId },
        data: {
            boardName: values.boardName,
            special: values.tierOptions.includes("Special"),
            bleachers: values.tierOptions.includes("Bleachers"),
            bleachersLabel: values.bleachersLabel,
            dugout: values.tierOptions.includes("Dugout"),
            dugoutLabel: values.dugoutLabel,
            specialThreshold: values.specialThreshold,
        },
    })
    let transaction = [boardOptions]
    if (!values.tierOptions.includes("Special"))
        transaction.push(
            prisma.rank.updateMany({
                where: {
                    boardId: boardId,
                    rank: {
                        contains: "1.",
                    },
                },
                data: {
                    rank: "",
                },
            }),
        )
    if (!values.tierOptions.includes("Bleachers"))
        transaction.push(
            prisma.rank.updateMany({
                where: {
                    boardId: boardId,
                    rank: {
                        contains: "7.",
                    },
                },
                data: {
                    rank: "",
                },
            }),
        )
    if (!values.tierOptions.includes("Dugout"))
        transaction.push(
            prisma.rank.updateMany({
                where: {
                    boardId: boardId,
                    rank: {
                        contains: "8.",
                    },
                },
                data: {
                    rank: "",
                },
            }),
        )

    await prisma.$transaction(transaction)
    revalidatePath("/board/[boardId]", "page")
}

export async function PRISMA_CREATE_NEW_BOARD(creationObj) {
    await prisma.board.create({
        data: {
            boardName: creationObj.boardName,
            type: creationObj.type,
            special: creationObj.special,
            bleachers: creationObj.bleachers,
            bleachersLabel: creationObj.bleachersLabel,
            dugout: creationObj.dugout,
            dugoutLabel: creationObj.dugoutLabel,
            specialThreshold: creationObj.specialThreshold,

            owner: {
                connect: {
                    id: creationObj.owner.id,
                },
            },
            users: {
                connect: {
                    id: creationObj.owner.id,
                },
            },
        },
        include: {
            items: true,
            owner: true,
            users: true,
        },
    })
    revalidatePath("/*", "page")
}
export async function PRISMA_JOIN_BOARD(boardId, itemsIdArray) {
    const { userId } = await auth()

    const boardUpdate = prisma.board.update({
        where: {
            id: boardId,
        },
        data: {
            users: {
                connect: {
                    id: userId,
                },
            },
        },
    })
    let createdRanks = itemsIdArray.map((itemId) => ({
        rank: "",
        itemsId: itemId,
        boardId: boardId,
    }))

    const userUpdate = prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            Rank: {
                createMany: {
                    data: createdRanks,
                },
            },
        },
    })
    await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
            inviteId: null,
        },
        unsafeMetadata: {
            inviteId: null,
        },
    })
    await prisma.$transaction([boardUpdate, userUpdate])
    revalidatePath("/home", "page")
}
export async function PRISMA_DELETE_BOARD(boardId) {
    await prisma.board.delete({
        where: {
            id: boardId,
        },
    })
    revalidatePath("/*", "page")
}
export async function PRISMA_LEAVE_BOARD(boardId, itemsIdArray, userId) {
    const leave = prisma.board.update({
        where: {
            id: boardId,
        },
        data: {
            users: {
                disconnect: {
                    id: userId,
                },
            },
        },
    })
    const remove = prisma.rank.deleteMany({
        where: { itemsId: { in: itemsIdArray }, userId: userId },
    })

    await prisma.$transaction([leave, remove])
    revalidatePath("/*", "page")
}

export async function PRISMA_MAKE_NEW_OWNER(boardId, userId) {
    await prisma.board.update({
        where: {
            id: boardId,
        },
        data: {
            ownerId: userId,
        },
    })
    revalidatePath("/*", "page")
}
export async function PRISMA_ADD_BOARD_TYPE(boardId) {
    return await prisma.board.update({
        where: { id: boardId },
        data: {
            type: "movie",
        },
    })
}

export async function PRISMA_GET_USERS(boardId) {
    return await prisma.user.findMany({
        where: {
            boards: {
                some: {
                    id: {
                        equals: boardId,
                    },
                },
            },
        },
        include: {
            boards: {
                include: {
                    users: true,
                    owner: true,
                },
            },
            ownedBoards: true,
        },
    })
}
export async function PRISMA_GET_BOARD_USERS(boardId) {
    return await prisma.board.find({
        where: {
            boards: {
                some: {
                    id: {
                        equals: boardId,
                    },
                },
            },
        },
        include: {
            boards: {
                include: {
                    users: true,
                    owner: true,
                },
            },
            ownedBoards: true,
            Rank: true,
        },
    })
}

export async function PRISMA_CREATE_USER(id, name) {
    return await prisma.user.create({
        data: {
            id: id,
            name: name,
        },
        include: {
            boards: {
                include: {
                    users: true,
                    owner: true,
                    items: true,
                },
            },
            ownedBoards: true,
            Rank: true,
        },
    })
}
// TODO - scrub sensitive data
export async function PRISMA_GET_USER(id) {
    return await prisma.user.findFirst({
        where: { id: id },
        include: {
            boards: {
                include: {
                    users: true,
                    owner: true,
                    items: true,
                },
            },
            ownedBoards: true,
            Rank: true,
        },
    })
}
export async function PRISMA_UPDATE_DISPLAY_NAME(user, input) {
    await prisma.user.update({
        where: { id: user.id },
        data: {
            name: input,
        },
    })
    revalidatePath("/*", "page")
}
export async function PRISMA_ADD_ITEM(board, item, content, type) {
    const { userId } = await auth()
    const userIds = board.users.map((user) => user.id)

    const addItem = prisma.items.upsert({
        where: { id: item.id },
        update: {
            Board: {
                connect: {
                    id: board.id,
                },
            },
            addedBy: {
                connect: {
                    id: userId,
                },
            },
        },
        create: {
            id: item.id,
            type: item.type,
            backdrop_path: item.backdrop_path,
            addedBy: {
                connect: {
                    id: userId,
                },
            },
            Board: {
                connect: {
                    id: board.id,
                },
            },
        },
    })
    const addRanks = userIds.map((userId) => {
        return prisma.rank.upsert({
            where: {
                userId_itemsId_boardId: {
                    userId: userId,
                    itemsId: item.id,
                    boardId: board.id,
                },
            },
            create: {
                rank: "",
                Items: {
                    connect: {
                        id: item.id,
                    },
                },
                User: {
                    connect: {
                        id: userId,
                    },
                },
                Board: {
                    connect: {
                        id: board.id,
                    },
                },
            },
            update: {
                rank: "",
                Items: {
                    connect: {
                        id: item.id,
                    },
                },
                User: {
                    connect: {
                        id: userId,
                    },
                },
                Board: {
                    connect: {
                        id: board.id,
                    },
                },
            },
        })
    })
    const addNotifications = prisma.notification.create({
        data: {
            content: content,
            type: type,
            viewed: {
                connect: {
                    id: userId,
                },
            },
            Board: {
                connect: {
                    id: board.id,
                },
            },
        },
    })
    await prisma.$transaction([addItem, ...addRanks, addNotifications])
    revalidatePath("/board/[boardId]", "page")
}
export async function PRISMA_DELETE_ITEM(board, item, content, type) {
    const { userId } = await auth()
    const userIds = board.users.map((user) => user.id)

    const removeItem = prisma.items.update({
        where: { id: item.id },
        data: {
            Board: {
                disconnect: {
                    id: board.id,
                },
            },
            addedBy: {
                disconnect: {
                    id: userId,
                },
            },
        },
    })
    const removeRanks = userIds.map((userId) => {
        return prisma.rank.delete({
            where: {
                userId_itemsId_boardId: {
                    userId: userId,
                    itemsId: item.id,
                    boardId: board.id,
                },
            },
        })
    })
    const removeNotifications = prisma.notification.create({
        data: {
            content: content,
            type: type,
            viewed: {
                connect: {
                    id: userId,
                },
            },
            Board: {
                connect: {
                    id: board.id,
                },
            },
        },
    })

    // await prisma.board.update({
    //     where: { id: board.id },
    //     data: {
    //         items: {
    //             disconnect: {
    //                 id: item.id,
    //             },
    //         },
    //     },
    //     include: {
    //         items: {
    //             include: {
    //                 Board: true,
    //             },
    //         },
    //     },
    // })
    await prisma.$transaction([removeItem, ...removeRanks, removeNotifications])

    revalidatePath("/board/[boardId]", "page")
}
export async function PRISMA_ADD_PATHS_TO_ITEMS(itemId, backdrop_path) {
    await prisma.items.update({
        where: { id: itemId },
        data: {
            backdrop_path: backdrop_path,
        },
    })
}

export async function PRISMA_UPDATE_RANK(itemsIds, user, boardId, scoreObj) {
    await prisma.$transaction(
        itemsIds.map((itemId) => {
            return prisma.rank.upsert({
                where: {
                    userId_itemsId_boardId: {
                        userId: user.id,
                        itemsId: itemId,
                        boardId: boardId,
                    },
                },
                create: {
                    rank: scoreObj[itemId],
                    User: {
                        connect: {
                            id: user.id,
                        },
                    },
                    Board: {
                        connect: {
                            id: boardId,
                        },
                    },
                },
                update: {
                    rank: scoreObj[itemId],
                    User: {
                        connect: {
                            id: user.id,
                        },
                    },
                    Board: {
                        connect: {
                            id: boardId,
                        },
                    },
                },
            })
        }),
    )

    revalidatePath("/board/[boardId]", "page")
}
export async function PRISMA_GET_ALL_NOTIFICATIONS(boardIdArray) {
    const { userId } = await auth()

    const invites = prisma.notification.findMany({
        where: {
            userId: userId,
        },
        include: {
            User: true,
            Board: true,
            Invitation: {
                include: { accepted: true, declined: true },
            },
        },
    })
    const boardNotifications = prisma.notification.findMany({
        where: {
            boardId: {
                in: boardIdArray,
            },
        },
        include: {
            User: true,
            viewed: true,
            Board: true,
        },
    })
    return await prisma.$transaction([invites, boardNotifications])
}
export async function PRISMA_GET_USER_INVITES(userID) {
    return await prisma.notification.findMany({
        where: {
            userId: userID,
        },
        include: {
            User: true,
            Board: true,
            Invitation: {
                include: { accepted: true, declined: true },
            },
        },
    })
}
export async function PRISMA_GET_BOARD_NOTIFICATIONS(boardId, userDB) {
    return await prisma.notification.findMany({
        where: {
            boardId: boardId,
            userId: userDB.id,
        },
        include: {
            User: true,
            Board: true,
            Invitation: {
                include: { accepted: true, declined: true },
            },
        },
    })
}
export async function PRISMA_SET_BOARD_NOTIFICATIONS(
    boardId,
    user,
    notification,
) {
    await prisma.board.update({
        where: { id: boardId },
        data: {
            Notification: {
                create: {
                    content: notification.content,
                    type: notification.type,
                    viewed: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            },
        },
    })
    revalidatePath("/board/[boardId]", "page")
}
export async function PRISMA_VIEW_NOTIFICATION(id) {
    const { userId } = await auth()

    await prisma.notification.update({
        where: { id: id },
        data: {
            viewed: {
                connect: {
                    id: userId,
                },
            },
        },
    })
    revalidatePath("/*", "page")
}
export async function PRISMA_VIEW_NOTIFICATIONS(idArr) {
    const { userId } = await auth()

    const viewedNotifications = idArr.map((id) => {
        return prisma.notification.update({
            where: { id: id },
            data: {
                viewed: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })
    })
    await prisma.$transaction([...viewedNotifications])
    revalidatePath("/*", "page")
}
export async function PRISMA_DELETE_OLD_NOTIFICATIONS(idArr) {
    await prisma.notification.deleteMany({
        where: { id: { in: idArr } },
    })
}
export async function PRISMA_CREATE_NEWUSER_INVITE_NOTIFICATION(
    invitationId,
    userId,
    boardId,
) {
    await prisma.invitation.update({
        where: { id: invitationId },
        data: {
            Notification: {
                upsert: {
                    create: {
                        type: "Invitation",
                        content: "You've been invited to a board!",
                        viewed: false,
                        User: { connect: { id: userId } },
                        Board: { connect: { id: boardId } },
                    },
                    update: {
                        type: "Invitation",
                        content: "You've been invited to a board!",
                        User: { connect: { id: userId } },
                        Board: { connect: { id: boardId } },
                    },
                },
            },
        },
    })
}
export async function PRISMA_CREATE_INVITATION(boardId, userId) {
    return await prisma.invitation.create({
        data: {
            id: MAKE_ID(8),
            boardId: boardId,
            userId: userId,
            Notification: {
                create: {
                    type: "Invitation",
                    content: "You've been invited to a board!",
                    userId: userId,
                    boardId: boardId,
                    viewed: false,
                },
            },
        },
    })
}
export async function PRISMA_CREATE_NO_USER_INVITATION(boardId) {
    return await prisma.invitation.create({
        data: {
            id: MAKE_ID(8),
            boardId: boardId,
        },
    })
}
export async function PRISMA_CHECK_FOR_INVITATION(boardId) {
    return await prisma.invitation.findUnique({
        where: { boardId: boardId },
    })
}

export async function PRISMA_CREATE_LINK_INVITATION(boardId) {
    let invitation

    const existingInvitation = await prisma.invitation.findFirst({
        where: { boardId: boardId, userId: null },
    })
    let invitationIsStale

    if (existingInvitation) {
        invitationIsStale =
            existingInvitation.updatedAt.getTime() + 1000 * 60 * 60 * 24 * 7 <
            Date.now()
    }

    if (existingInvitation && !invitationIsStale) {
        invitation = existingInvitation
    } else {
        invitation = await prisma.invitation.create({
            data: {
                id: MAKE_ID(8),
                boardId: boardId,
            },
        })
    }

    return invitation
}

export async function PRISMA_GET_INVITATION(inviteId) {
    if (!inviteId) return null
    return await prisma.invitation.findUnique({
        where: { id: inviteId },
        include: {
            accepted: true,
            declined: true,
        },
    })
}
// export async function PRISMA_GET_USER_INVITES(userId) {
//     return await prisma.invitation.findMany({
//         where: { userId: userId },
//         include: {
//             Notification: true,
//         },
//     })
// }
export async function PRISMA_ACCEPT_INVITATION(id) {
    const { userId } = await auth()

    await prisma.invitation.update({
        where: { id: id },
        data: {
            accepted: { connect: { id: userId } },
        },
    })
    revalidatePath("/home", "page")
}
export async function PRISMA_DECLINE_INVITATION(id) {
    const { userId } = await auth()

    await prisma.invitation.update({
        where: { id: id },
        data: {
            declined: { connect: { id: userId } },
        },
    })
    clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: { inviteId: null },
        undafeMetadata: { inviteId: null },
    })

    revalidatePath("/home", "page")
}
