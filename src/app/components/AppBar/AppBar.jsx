import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { checkRole } from "@lib/roles"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import { House, SquareCode } from "lucide-react"
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

export default async function AppBar({ appData, className }) {
    return (
        <header
            className={cn(
                `sticky z-50 col-span-full row-start-1 row-end-2 grid h-10 w-svw grid-cols-subgrid grid-rows-subgrid justify-center rounded border-b border-surface-400 bg-surface-200 shadow-xl drop-shadow-2xl md:h-12 dark:border-surface-900 dark:bg-surface-900`,
                className,
            )}
        >
            <div className={`col-span-full flex items-center justify-between`}>
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
                        <Link href={`/home`}>
                            <SquareCode className={`h-5 w-5`} />
                        </Link>
                    </Button>
                )}
                <SideDrawer appData={appData} />
            </TooltipProvider>
        </div>
    )
}
