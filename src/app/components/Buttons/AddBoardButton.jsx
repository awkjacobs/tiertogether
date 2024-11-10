import { ResponsiveDialog } from "../ui/ResponsiveDialog"
import NewBoardDialogContent from "../Dialogs/Dialog Modules/NewBoardDialogContent"
import NewBoardActions from "../Dialogs/Dialog Actions/NewBoardActions"
import { useState } from "react"
import { PRISMA_CREATE_NEW_BOARD } from "@prismaFuncs/prismaFuncs"
import { ROW_OPTIONS } from "@/lib/const"

// TODO - after saving a board, clear out info
// TODO - should probably figure out how to convert to form

export default function AddBoardButton({ appData }) {
    const [isOpen, setIsOpen] = useState()

    const [boardName, setBoardName] = useState()
    const [boardType, setBoardType] = useState()
    const [rowOptions, setRowOptions] = useState(ROW_OPTIONS)

    const [invitedUsers, setInvitedUsers] = useState([appData.user])

    const handleCreate = async () => {
        let creationObj = {
            boardName: boardName,
            type: boardType,
            owner: appData.user,
            ...rowOptions,
        }
        await PRISMA_CREATE_NEW_BOARD(creationObj)

        setIsOpen(false)
    }
    return (
        <ResponsiveDialog
            trigger={"New Board"}
            triggerVariant={"outline"}
            triggerClasses={`hover:bg-purple-600 dark:hover:bg-purple-600/50 hover:text-white min-h-9`}
            title={"New Board"}
            hideDescription={true}
            dialogFit={true}
            triggerSize={"sm"}
            component={
                <NewBoardDialogContent
                    appData={appData}
                    boardName={boardName}
                    setBoardName={setBoardName}
                    setBoardType={setBoardType}
                    invitedUsers={invitedUsers}
                    setIvitedUsers={setInvitedUsers}
                    rowOptions={rowOptions}
                    setRowOptions={setRowOptions}
                />
            }
            footer={
                <NewBoardActions
                    boardName={boardName}
                    boardType={boardType}
                    invitedUsers={invitedUsers}
                    rowOptions={rowOptions}
                    handleCreate={handleCreate}
                />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    )
}
