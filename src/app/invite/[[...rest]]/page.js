import { SignUp } from "@clerk/nextjs"
import { createClerkClient } from "@clerk/backend"

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
})

export default async function InvitePage() {
    const response = await clerkClient.invitations.getInvitationList()

    return (
        <main className={`flex h-full justify-center p-32`}>
            <SignUp />
        </main>
    )
}
