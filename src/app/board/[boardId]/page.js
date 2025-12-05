import {
    PRISMA_GET_SPECIFIC_BOARD,
    PRISMA_GET_BOARD_DATA,
} from "@api/prismaFuncs"
import { serverAverage } from "@lib/serverFuncs"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@app/components/Utility/PageContainer"
import DraggingContent from "./_components/AppDynamic/DraggingContent"
import { auth } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"
import { ITEM_ID_TYPE } from "@lib/const"
import { detailsFunc } from "@app/hooks/_scripts/detailSwitch"
import { TMDB_GET_CREDITS, TMDB_GET_IMAGES } from "@api/TMDB"

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

    const [board, userDB, notifications] = await PRISMA_GET_BOARD_DATA(
        boardId,
        userId,
    )

    const appData = {
        board,
        user: userDB,
    }
    // Prefetch board averages once
    await queryClient.prefetchQuery({
        queryKey: ["averages", boardId],
        queryFn: () => serverAverage(boardId),
    })

    await Promise.all(
        board.items.map(async (item) => {
            const { id: itemId, type: itemType } = ITEM_ID_TYPE(item.id)
            return Promise.all([
                // Prefetch details
                queryClient.prefetchQuery({
                    queryKey: ["details", itemId, itemType],
                    queryFn: () => detailsFunc(itemId, itemType),
                    staleTime: Infinity,
                }),
                // Prefetch credits for movies/TV
                queryClient.prefetchQuery({
                    queryKey: ["credits", itemId, itemType],
                    queryFn: () => TMDB_GET_CREDITS(itemId, itemType),
                    staleTime: Infinity,
                }),
                // Prefetch images/logos
                queryClient.prefetchQuery({
                    queryKey: ["logo", itemId, itemType],
                    queryFn: () => TMDB_GET_IMAGES(itemId, itemType),
                    staleTime: Infinity,
                }),
            ])
        }),
    )

    return (
        <PageContainer>
            <AppBar appData={appData} notifications={notifications} />
            <DraggingContent appData={appData} />
        </PageContainer>
    )
}
