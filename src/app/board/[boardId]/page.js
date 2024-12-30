import {
    PRISMA_GET_SPECIFIC_BOARD,
    PRISMA_GET_BOARD_DATA,
} from "@api/prismaFuncs"
import { serverAverage } from "@lib/serverFuncs"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@components/Utility/PageContainer"
import DraggingContent from "./_components/AppDynamic/DraggingContent"
import { auth } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"

// * Extra features
// * - add a board description area
// * - add rotten tomatoes score

export async function generateMetadata({ params }, parent) {
    // read route params
    const boardId = (await params).boardId

    const board = await PRISMA_GET_SPECIFIC_BOARD(boardId)

    return {
        title: `${board.boardName} | tiertogether`,
    }
}

export default async function Board({ params }) {
    const { userId } = await auth()
    const queryClient = new QueryClient()

    const boardId = (await params).boardId

    await queryClient.prefetchQuery({
        queryKey: ["averages", boardId],
        queryFn: () => serverAverage(boardId),
    })

    const [board, userDB, notifications] = await PRISMA_GET_BOARD_DATA(
        boardId,
        userId,
    )

    const appData = {
        board,
        user: userDB,
    }
    return (
        <PageContainer>
            <AppBar appData={appData} notifications={notifications} />
            <DraggingContent appData={appData} />
        </PageContainer>
    )
}
