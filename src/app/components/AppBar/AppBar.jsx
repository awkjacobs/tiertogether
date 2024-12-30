import { ClerkProvider } from "@clerk/nextjs"
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
import { checkRole } from "@lib/roles"

export default async function AppBar({ appData }) {
    const boardIdArray = appData.user.boards.map((board) => board.id)
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notifications", ...boardIdArray],
        queryFn: () => getNotifications(boardIdArray),
    })

    const isAdmin = await checkRole("admin")

    return (
        <header
            className={`sticky z-10 col-span-full row-start-1 row-end-2 grid h-10 w-svw grid-cols-subgrid grid-rows-subgrid justify-center rounded border-b border-surface-400 bg-surface-200 shadow-xl drop-shadow-2xl md:h-12 dark:border-surface-900 dark:bg-surface-900`}
        >
            <div className={`col-span-full flex items-center justify-between`}>
                <Button variant="ghost" asChild>
                    <Link
                        className={`flex h-full cursor-pointer flex-row content-center items-center gap-1 px-2`}
                        href={`/`}
                    >
                        <LogoButton />
                    </Link>
                </Button>
                <div className={`flex items-center justify-center`}>
                    <ThemeToggle />
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ClerkProvider dynamic>
                            <NotificationsDropdown
                                boardIdArray={boardIdArray}
                            />
                        </ClerkProvider>
                    </HydrationBoundary>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/home`}>
                            <House className={`h-5 w-5`} />
                        </Link>
                    </Button>
                    {isAdmin && (
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/home`}>
                                <SquareCode className={`h-5 w-5`} />
                            </Link>
                        </Button>
                    )}
                    <SideDrawer appData={appData} />
                </div>
            </div>
        </header>
    )
}
