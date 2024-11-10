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

// TODO - need to improve the dnd, its choppy and unresponsive

// * Extra features
// * - add a board description area
// * - add rotten tomatoes score

const userIdArr = [
    "0369aa7d-95ea-44e1-a805-b907484810f4",
    "10426dd9-6d07-488d-9aa9-5b3fc7ae8f7f",
    "b9bdcc56-e4c9-4198-9846-2813dabdf3e6",
    "dc60c15e-6358-445e-8102-ba8974d8c00d",
    "ec6e0bde-106e-4083-ac4d-9de6189ee2e1",
    "f60a8941-09e8-435e-bdf5-cc93da493075",
    "f71fb769-c497-4468-aa58-209de0e328fc",
    "ff64bb8e-e80a-4416-b7f0-212cdfb71f04",
]
async function makeBoardWait() {
    await new Promise((resolve) => setTimeout(resolve, 100000))
}
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
