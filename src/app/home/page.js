import {
    PRISMA_CREATE_NEWUSER_INVITE_NOTIFICATION,
    PRISMA_CREATE_USER,
    PRISMA_GET_INVITATION,
    PRISMA_GET_USER,
    PRISMA_SET_IGDG_API_KEY,
} from "@api/prismaFuncs"
import PageContainer from "@app/components/Utility/PageContainer"
import { auth, currentUser } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import HomeContent from "./_components/HomeContent"
import { IGBD_GET_TOKEN } from "@api/IGDB"

export const metadata = {
    title: "Home | tiertogether",
    description: "The home for all your boards.",
}
export default async function Home() {
    const { userId } = await auth()
    const user = await currentUser()
    const userDB = await PRISMA_GET_USER(userId)
    const needDisplayName = user.firstName == null && user.lastName == null
    const name = needDisplayName ? "null" : user.firstName + " " + user.lastName

    let userConst

    let newUser = false

    if (!userDB) {
        userConst = await PRISMA_CREATE_USER(userId, name)
        newUser = true
    } else {
        userConst = userDB
    }

    if (user.publicMetadata.inviteId || user.unsafeMetadata.inviteId) {
        const inviteId = user.publicMetadata.inviteId
            ? user.publicMetadata.inviteId
            : user.unsafeMetadata.inviteId

        const invitation = await PRISMA_GET_INVITATION(inviteId)

        if (invitation) {
            await PRISMA_CREATE_NEWUSER_INVITE_NOTIFICATION(
                invitation.id,
                userId,
                invitation.boardId,
            )
        }
    }

    if (needDisplayName && !userDB) newUser = true

    const appData = {
        user: userConst,
        newUser: newUser,
    }

    const igdbKey = await prisma.aPIkey.findFirst({})
    if (igdbKey) {
        const createdAt = new Date(igdbKey.updatedAt)
        const expiresIn = igdbKey.expires_in // seconds
        const now = new Date()
        const expiryDate = new Date(createdAt.getTime() + expiresIn * 1000)
        console.log(now, expiryDate, now > expiryDate)
        if (now > expiryDate || !igdbKey) {
            const res = await IGBD_GET_TOKEN()
            await PRISMA_SET_IGDG_API_KEY(res)
        }
    } else {
        const res = await IGBD_GET_TOKEN()
        await PRISMA_SET_IGDG_API_KEY(res)
    }

    return (
        <PageContainer>
            <AppBar appData={appData} />
            <HomeContent appData={appData} />
        </PageContainer>
    )
}
