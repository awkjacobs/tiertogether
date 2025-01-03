import { useQuery } from "@tanstack/react-query"
import { serverAverage } from "@lib/serverFuncs"

export const useGetServerAverages = (boardId) => {
    return useQuery({
        queryKey: ["averages", boardId],
        queryFn: () => serverAverage(boardId),
    })
}
