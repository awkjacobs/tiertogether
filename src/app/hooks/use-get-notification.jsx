import { PRISMA_GET_SPECIFIC_BOARD } from "@api/prismaFuncs"
import { useQuery } from "@tanstack/react-query"

async function getInvite(notification) {
    return await PRISMA_GET_SPECIFIC_BOARD(notification.boardId)
}

export const useGetInvitationData = (notification) => {
    return useQuery({
        queryKey: ["invitation", notification.id],
        queryFn: () => getInvite(notification),
        staleTime: Infinity,
        refetchOnMount: true,
    })
}
