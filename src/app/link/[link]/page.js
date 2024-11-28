import { SignUp } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { auth, clerkClient } from "@clerk/nextjs/server"

export default async function LinkInvitePage({ params }) {
    const linkParams = await params
    const invite = linkParams.link

    const { userId } = await auth()

    if (!userId) {
        return (
            <main className={`flex h-full justify-center p-32`}>
                <SignUp routing="hash" unsafeMetadata={{ inviteId: invite }} />
            </main>
        )
    }

    const res = (await clerkClient()).users.updateUserMetadata(userId, {
        publicMetadata: {
            inviteId: invite,
        },
    })
    redirect("/home")
}
//link/uiQ39j4t
