import { PRISMA_GET_SPECIFIC_BOARD } from "@prismaFuncs/prismaFuncs"
import { useQuery } from "@tanstack/react-query"

async function getInvite(notification) {
    console.log(notification)
    return await PRISMA_GET_SPECIFIC_BOARD(notification.boardId)
    // itemsIdArray = board.items.map((item) => item.id)
}

export const useGetInvitationData = (notification) => {
    return useQuery({
        queryKey: ["invitation", notification.id],
        queryFn: () => getInvite(notification),
        staleTime: Infinity,
        refetchOnMount: true,
    })
}
