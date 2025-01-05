import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { checkRole } from "@lib/roles"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import { House, LucideMenu, SquareCode } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import SideDrawer from "./_components/Drawer/Drawer Components/SideDrawer"
import LogoButton from "./_components/LogoButton"
import getNotifications from "./getNotifications"
import NotificationsDropdown from "./NotificationsDropdown"
import ThemeToggle from "./ThemeToggle"
import { cn } from "@lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@components/ui/tooltip"
import AlertBanner from "../Alerts/AlertBanner"
import { SidebarTrigger } from "../ui/sidebar"

export default async function AppBar({ appData, className }) {
    return (
        <header
            className={cn(
                `sticky z-50 col-span-full row-start-1 row-end-2 grid w-svw grid-cols-subgrid justify-center`,
                className,
            )}
        >
            <AlertBanner />
            <div
                className={`col-span-full flex h-10 items-center justify-between rounded border-b border-zinc-400 bg-zinc-200 shadow-xl drop-shadow-xl dark:border-zinc-900 dark:bg-zinc-900`}
            >
                <LogoButton />
                <SignedIn>
                    <SignedInContent appData={appData} />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="ghost">login</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    )
}

async function SignedInContent({ appData }) {
    const boardIdArray = appData?.user.boards.map((board) => board.id)
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notifications", ...boardIdArray],
        queryFn: () => getNotifications(boardIdArray),
    })

    const isAdmin = await checkRole("admin")

    return (
        <div className={`flex items-center justify-center`}>
            <TooltipProvider>
                <ThemeToggle />
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ClerkProvider dynamic>
                        <NotificationsDropdown boardIdArray={boardIdArray} />
                    </ClerkProvider>
                </HydrationBoundary>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/home`}>
                                <House className={`h-5 w-5`} />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Your Home</p>
                    </TooltipContent>
                </Tooltip>
                {isAdmin && (
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin`}>
                            <SquareCode className={`h-5 w-5`} />
                        </Link>
                    </Button>
                )}
                <SidebarTrigger className={`h-10 w-10`} />
            </TooltipProvider>
        </div>
    )
}
