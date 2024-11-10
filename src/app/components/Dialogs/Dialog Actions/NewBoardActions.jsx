import { Button } from "../../ui/button"

export default function NewBoardActions({
    handleClose,
    handleCreate,
    boardName,
    boardType,
    invitedUsers,
}) {
    return (
        <Button
            onMouseDown={handleCreate}
            disabled={boardName && boardType ? false : true}
            variant="ghost"
            className={`dark:text-purple-300 dark:disabled:text-zinc-500`}
        >
            Create
        </Button>
    )
}
