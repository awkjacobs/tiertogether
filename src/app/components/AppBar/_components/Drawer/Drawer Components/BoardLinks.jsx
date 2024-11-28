import Crown from "@/components/Utility/Crown"
import Link from "next/link"
import { useState } from "react"
import EditBoardButton from "@/components/Buttons/EditBoardButton"
import { Button } from "@/components/ui/button"

export default function BoardLinks({ board, thisUser, appData }) {
    const [boardName, setNewBoardName] = useState(board.boardName)
    const isOwner = thisUser.id === board.ownerId

    return (
        <div
            className={`flex items-center py-1 text-purple-700 md:py-2 dark:text-purple-200`}
        >
            <Button asChild variant="ghost" className={`justify-start`}>
                <Link
                    href={`/board/${board.id}`}
                    className={`flex flex-1 items-center gap-4 rounded px-4 text-sm transition-all hover:bg-purple-500/10 active:bg-purple-400/20 md:py-2 md:text-base dark:hover:bg-purple-400/10`}
                >
                    <p>{board.boardName}</p>
                    {thisUser.id === board.ownerId && <Crown />}
                </Link>
            </Button>
            <EditBoardButton
                appData={appData}
                board={board}
                boardName={boardName}
                setNewBoardName={setNewBoardName}
                isOwner={isOwner}
            />
        </div>
    )
}
