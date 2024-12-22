"use server"

import { auth } from "@clerk/nextjs/server"
import { createClerkClient } from "@clerk/backend"
import {
    PRISMA_CREATE_INVITATION,
    PRISMA_CREATE_NO_USER_INVITATION,
} from "@api/prismaFuncs"

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
})

export default async function INVITE_USER(email, boardId) {
    const user = auth()
    if (!user.userId) throw new Error("Unauthorized")

    const clerkUsers = await clerkClient.users.getUserList()

    let existingUser = false

    clerkUsers.data.forEach((user) => {
        const emails = user.emailAddresses.map((email) => email.emailAddress)
        if (emails.includes(email)) {
            existingUser = user
        }
    })

    if (existingUser) {
        await PRISMA_CREATE_INVITATION(boardId, existingUser.id)
        return "NotificationSent"
    } else {
        await createEmailInvitation(email, boardId)
        return "EmailSent"
    }
}

async function createEmailInvitation(email, boardId) {
    const invitation = await PRISMA_CREATE_NO_USER_INVITATION(boardId, null)
    const invitationId = invitation.id

    const response = await clerkClient.invitations.createInvitation({
        emailAddress: email,
        redirectUrl: "http://localhost:3000/invite",
        publicMetadata: {
            inviteId: invitationId,
        },
        notify: true,
        ignoreExisting: true,
    })
}
