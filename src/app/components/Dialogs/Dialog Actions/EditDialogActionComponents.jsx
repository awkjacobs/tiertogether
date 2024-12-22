import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    PRISMA_DELETE_BOARD,
    PRISMA_LEAVE_BOARD,
    PRISMA_MAKE_NEW_OWNER,
    PRISMA_UPDATE_BOARD,
} from "@api/prismaFuncs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../../ui/button"
import DesignateNewBoardOwner from "../Dialog Modules/Dialog Components/DesignateNewBoardOwner"
import { useState } from "react"

export function DeleteBoardButton({
    board,
    isOwner,
    setIsDialogOpen,
    className,
}) {
    const pathname = usePathname()
    const router = useRouter()
    const isOnDeletingBoard = pathname === `/board/${board.id}`

    const handleRemove = () => {
        if (isOnDeletingBoard) router.push("/home")
        PRISMA_DELETE_BOARD(board.id)
        setIsDialogOpen(false)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="destructive"
                    disabled={!isOwner}
                    className={className}
                >
                    Delete Board
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete {board.boardName} Board?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will remove the{" "}
                        <b>{board.boardName}</b> board for all users.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={`h-8`}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemove} className={`h-8`}>
                        Delete Board
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export function LeaveBoardButton({
    board,
    isOwner,
    appData,
    setIsDialogOpen,
    className,
}) {
    const { user } = appData

    const [selectedUser, setSelectedUser] = useState(null)

    const pathname = usePathname()
    const router = useRouter()
    const isOnLeavingBoard = pathname === `/board/${board.id}`
    const boardCannotBeLeft = isOwner && board.users.length <= 1
    const needToDesignateNewOwner = isOwner && board.users.length > 1

    const itemsIdArray = board.items.map((item) => item.id)
    const newOwner = (selectedUserId) =>
        board.users.find((user) => user.id === selectedUserId)

    // TODO - need to redo, as leave and designate will need both a new owner notification and a leave notification
    const leaveObj = [
        board.id,
        itemsIdArray,
        `${user.name} left ${board.boardName}.`,
        "leave",
    ]
    const leaveAndDesignateObj = [
        board.id,
        itemsIdArray,
        { content: `${user.name} left ${board.boardName}.`, type: "leave" },
        {
            content: `${newOwner(selectedUser)?.name} is the new owner of ${board.boardName}.`,
            type: "newOwner",
            newOwnerId: selectedUser,
        },
    ]

    const handleLeave = async () => {
        if (isOnLeavingBoard) router.push("/home")
        await PRISMA_LEAVE_BOARD(...leaveObj)
        setIsDialogOpen(false)
    }
    const handleDesignateAndLeave = async () => {
        if (isOnLeavingBoard) router.push("/home")
        await PRISMA_MAKE_NEW_OWNER(...leaveAndDesignateObj)
        setIsDialogOpen(false)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    disabled={boardCannotBeLeft}
                    className={className}
                >
                    Leave Board
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`w-[95vw] rounded md:w-full`}>
                {!needToDesignateNewOwner && (
                    <LeaveAlertContent
                        board={board}
                        handleLeave={handleLeave}
                    />
                )}
                {needToDesignateNewOwner && (
                    <LeaveAndDesignateAlertContent
                        board={board}
                        handleDesignateAndLeave={handleDesignateAndLeave}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}
function LeaveAlertContent({ board, handleLeave }) {
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Leave {board.boardName} Board?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Your rankings will be discarded <b>{board.boardName}</b>{" "}
                    board for all users.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className={`h-8`}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLeave} className={`h-8`}>
                    Leave Board
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
}
function LeaveAndDesignateAlertContent({
    board,
    handleDesignateAndLeave,
    setSelectedUser,
    selectedUser,
}) {
    const otherBoardUsers = board.users.filter(
        (user) => user.id !== board.owner.id,
    )

    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Leave {board.boardName} Board?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Because you are the <b>Board Owner</b>, please designate a
                    new <b>Board Owner</b> for <b>{board.boardName}</b> before
                    leaving.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <DesignateNewBoardOwner
                users={otherBoardUsers}
                setSelectedUser={setSelectedUser}
            />
            <AlertDialogFooter>
                <AlertDialogCancel className={`h-8`}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    disabled={selectedUser == null}
                    onClick={handleDesignateAndLeave}
                    className={`h-8`}
                >
                    Designate User and Leave Board
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
}
