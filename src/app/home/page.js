import {
    PRISMA_CREATE_NEWUSER_INVITE_NOTIFICATION,
    PRISMA_CREATE_USER,
    PRISMA_GET_INVITATION,
    PRISMA_GET_USER,
} from "@api/prismaFuncs"
import AppBar from "@components/AppBar/AppBar"
import HomeContainer from "./_components/HomeContainer"
import HomeContent from "./_components/HomeContent"
import { auth, currentUser } from "@clerk/nextjs/server"

async function makeBoardWait() {
    await new Promise((resolve) => setTimeout(resolve, 100000))
}
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

    return (
        <HomeContainer>
            <AppBar appData={appData} />
            <HomeContent appData={appData} />
        </HomeContainer>
    )
}
