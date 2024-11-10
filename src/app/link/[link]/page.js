import { SignUp, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"

export default async function LinkInvitePage({ params }) {
    const linkParams = await params
    const invite = linkParams.link

    const user = await currentUser()

    if (!user) {
        return (
            <main className={`flex h-full justify-center p-32`}>
                <SignUp routing="hash" unsafeMetadata={{ inviteId: invite }} />
            </main>
        )
    }
    await clerkClient().users.updateUserMetadata(user.id, {
        publicMetadata: {
            inviteId: invite,
        },
    })
    redirect("/home")
}
