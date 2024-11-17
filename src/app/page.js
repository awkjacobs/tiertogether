import Link from "next/link"
import Spacing from "@/components/Utility/Spacing"
import { Button } from "@/components/ui/button"
import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs"

// TODO - clean up the landing page

export default function LandingPage() {
    return (
        <section
            className={`flex h-svh flex-col items-center justify-center bg-surface-200 dark:bg-surface-950`}
        >
            <h1 className={`p-8 text-[min(10vw,_4rem)] text-purple-200`}>
                tier
                <span className={`font-bold text-purple-500`}>together</span>
            </h1>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        className={`bg-purple-500 text-purple-50 hover:bg-purple-600 dark:bg-purple-500 dark:text-purple-50 dark:hover:bg-purple-600`}
                    >
                        login
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
                <Button
                    className={`bg-purple-500 text-purple-50 hover:bg-purple-600 dark:bg-purple-500 dark:text-purple-50 dark:hover:bg-purple-600`}
                >
                    <Link href={`/home`}>Home</Link>
                </Button>
                <Spacing size={30} vertical />
                <Button
                    asChild
                    className={`bg-purple-500 text-purple-50 hover:bg-purple-600 dark:bg-purple-500 dark:text-purple-50 dark:hover:bg-purple-600`}
                >
                    <SignOutButton>Logout</SignOutButton>
                </Button>
            </SignedIn>
        </section>
    )
}