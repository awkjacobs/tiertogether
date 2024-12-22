import Link from "next/link"
import SideDrawer from "./_components/Drawer/Drawer Components/SideDrawer"
import NotificationsDropdown from "./NotificationsDropdown"
import { House } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Button } from "../ui/button"
import LogoTriangles from "../Utility/LogoTriangles"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import getNotifications from "./getNotifications"
import { ClerkProvider } from "@clerk/nextjs"

export default async function AppBar({ appData }) {
    const boardIdArray = appData.user.boards.map((board) => board.id)
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notifications", ...boardIdArray],
        queryFn: () => getNotifications(boardIdArray),
    })

    return (
        <header
            className={`sticky top-0 z-10 col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 mt-2 grid h-10 w-svw grid-cols-subgrid grid-rows-subgrid justify-center rounded border-b border-surface-400 bg-surface-200 shadow-xl drop-shadow-2xl md:h-12 dark:border-surface-900 dark:bg-surface-900`}
        >
            <div
                className={`col-start-2 col-end-3 flex items-center justify-between`}
            >
                <Button variant="ghost" asChild>
                    <Link
                        className={`flex h-full cursor-pointer flex-row content-center items-center gap-1 px-2`}
                        href={`/`}
                    >
                        <LogoTriangles className={`h-full w-auto`} />
                        {/* <h1
                            className={`text-base font-medium text-purple-500 dark:text-purple-200`}
                        >
                            tier
                            <span
                                className={`text-purple-800 dark:text-purple-500`}
                            >
                                together
                            </span>
                        </h1> */}
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
                    <SideDrawer appData={appData} />
                </div>
            </div>
        </header>
    )
}
