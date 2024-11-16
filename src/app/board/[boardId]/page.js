import {
    PRISMA_GET_SPECIFIC_BOARD,
    PRISMA_GET_USER,
    PRISMA_GET_BOARD_NOTIFICATIONS,
} from "@prismaFuncs/prismaFuncs"
import { serverAverage } from "@/lib/serverFuncs"
import AppBar from "../../components/AppBar/AppBar"
import PageContainer from "@/app/components/AppDynamic/PageContainer"
import DraggingContent from "@/app/components/AppDynamic/DraggingContent"
import { auth } from "@clerk/nextjs/server"

// TODO - revist card scale options

// TODO - ensure the display when a lot of items are present on a board

// * Extra features
// * - add a board description area
// * - add rotten tomatoes score

export default async function Board({ params }) {
    const { userId } = await auth()

    const boardParams = await params
    const boardId = boardParams.boardId

    // TODO - combine these two queries
    const board = await PRISMA_GET_SPECIFIC_BOARD(boardId)
    const userDB = await PRISMA_GET_USER(userId)

    const users = board.users
    const serverRanks = await serverAverage(board)

    const notifications = await PRISMA_GET_BOARD_NOTIFICATIONS(boardId, userDB)

    const boardItems = board.items
    const boardName = board.boardName
    const boardOwner = userDB.id === board.owner.id

    const appData = {
        board,
        boardOwner,
        serverRanks,
        user: userDB,
        users,
    }
    // const timer = await makeBoardWait()
    return (
        <PageContainer>
            <AppBar appData={appData} notifications={notifications} />
            <DraggingContent
                appData={appData}
                boardItems={boardItems}
                boardName={boardName}
            />
        </PageContainer>
    )
}
