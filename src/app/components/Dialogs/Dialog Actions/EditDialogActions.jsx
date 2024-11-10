import { PRISMA_UPDATE_BOARD } from "@prismaFuncs/prismaFuncs"
import { Button } from "../../ui/button"
import {
    DeleteBoardButton,
    LeaveBoardButton,
} from "./EditDialogActionComponents"

export default function EditDialogActions({
    appData,
    board,
    boardName,
    setIsDialogOpen,
    dialogRowOptions,
    setRowOptions,
    isOwner,
}) {
    const handleSave = async () => {
        await PRISMA_UPDATE_BOARD(
            appData?.board ? appData.board.id : board.id,
            dialogRowOptions,
            boardName.trim(),
        )
        setRowOptions(dialogRowOptions)
        setIsDialogOpen(false)
    }
    return (
        <>
            <DeleteBoardButton
                board={appData?.board ? appData.board : board}
                isOwner={isOwner}
                setIsDialogOpen={setIsDialogOpen}
            />
            <LeaveBoardButton
                board={appData?.board ? appData.board : board}
                isOwner={isOwner}
                appData={appData}
                setIsDialogOpen={setIsDialogOpen}
            />

            <div style={{ flex: 1 }} />
            <Button onClick={handleSave} size="sm">
                Save
            </Button>
        </>
    )
}
