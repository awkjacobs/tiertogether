import {
    PRISMA_GET_SPECIFIC_BOARD,
    PRISMA_GET_USER,
    PRISMA_GET_BOARD_NOTIFICATIONS,
} from "@prismaFuncs/prismaFuncs"
import { serverAverage } from "@/lib/serverFuncs"
import AppBar from "@/components/AppBar/AppBar"
import PageContainer from "@/components/Utility/PageContainer"
import DraggingContent from "./_components/AppDynamic/DraggingContent"
import { auth } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"

// TODO - revist card scale options

// TODO - ensure the display when a lot of items are present on a board

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

    // TODO - combine these three queries?
    const board = await PRISMA_GET_SPECIFIC_BOARD(boardId)
    const userDB = await PRISMA_GET_USER(userId)
    const notifications = await PRISMA_GET_BOARD_NOTIFICATIONS(boardId, userDB)

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
