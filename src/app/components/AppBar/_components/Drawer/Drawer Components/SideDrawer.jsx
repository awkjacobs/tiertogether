"use client"

import { LucideMenu } from "lucide-react"
import BoardLinks from "./BoardLinks"
import AddBoardButton from "@/app/components/Buttons/AddBoardButton"
import ProfileButton from "./ProfileButton"
import { sortedBoards } from "@/lib/const"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function SideDrawer({ appData }) {
    const userBoards = appData.user.boards
    // const testBoards = [
    //     ...userBoards,
    //     ...userBoards,
    //     ...userBoards,
    //     ...userBoards,
    //     ...userBoards,
    // ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                    <LucideMenu
                        className={`h-[1.2rem] w-[1.2rem] text-purple-800 dark:text-purple-300`}
                    />
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
                <SheetHeader>
                    <SheetTitle
                        className={`text-purple-800 dark:text-purple-400`}
                    >
                        My Boards
                    </SheetTitle>
                    <SheetDescription
                        className={`text-purple-800 dark:text-purple-200`}
                    >
                        Navigate to your other boards, or create a new board.
                    </SheetDescription>
                </SheetHeader>
                <section
                    className={`my-2 flex flex-1 flex-col gap-4 overflow-hidden md:my-4`}
                >
                    <div className={`overflow-y-scroll`}>
                        <div
                            className={`rounded bg-surface-200/50 p-2 md:p-4 dark:bg-surface-900/50`}
                        >
                            {sortedBoards(userBoards).map((board) => {
                                return (
                                    <BoardLinks
                                        appData={appData}
                                        key={board.id}
                                        board={board}
                                        thisUser={appData.user}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <AddBoardButton appData={appData} />
                </section>
                <SheetFooter>
                    <ProfileButton appData={appData} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
