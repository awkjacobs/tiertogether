import { useQuery } from "@tanstack/react-query"
import { TMDB_GET_CREDITS, TMDB_GET_DETAILS } from "@/lib/movieFuncs"

export const useGetDetailsQuery = (itemId, boardType) => {
    return useQuery({
        queryKey: ["details", itemId, boardType],
        queryFn: () => TMDB_GET_DETAILS(itemId, boardType),
        staleTime: Infinity,
    })
}
export const useGetCreditsQuery = (itemId, boardType) => {
    return useQuery({
        queryKey: ["credits", itemId, boardType],
        queryFn: () => TMDB_GET_CREDITS(itemId, boardType),
        staleTime: Infinity,
    })
}
