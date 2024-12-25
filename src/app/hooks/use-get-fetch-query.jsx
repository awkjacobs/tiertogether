import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
    TMDB_GET_COLLECTION,
    TMDB_GET_CREDITS,
    TMDB_GET_DETAILS,
    TMDB_GET_IMAGES,
} from "@api/movieFuncs"
import { searchFunc } from "../board/[boardId]/_components/AddItem/searchSwitch"

export const useGetDetailsQuery = (itemId, itemType) => {
    return useQuery({
        queryKey: ["details", itemId, itemType],
        queryFn: () => TMDB_GET_DETAILS(itemId, itemType),
        staleTime: Infinity,
    })
}
export const useGetCreditsQuery = (itemId, itemType) => {
    return useQuery({
        queryKey: ["credits", itemId, itemType],
        queryFn: () => TMDB_GET_CREDITS(itemId, itemType),
        staleTime: Infinity,
    })
}
export const useGetImagesQuery = (itemId, itemType) => {
    return useQuery({
        queryKey: ["logo", itemId, itemType],
        queryFn: () => TMDB_GET_IMAGES(itemId, itemType),
        staleTime: Infinity,
    })
}
export const useGetCollectionQuery = (collectionId) => {
    return useQuery({
        queryKey: ["collection", collectionId],
        queryFn: () => TMDB_GET_COLLECTION(collectionId),
        staleTime: Infinity,
    })
}

export const useGetSearchQuery = (boardType, queryType, query, page = 1) => {
    return useQuery({
        queryKey: ["search", boardType, queryType, query, page],
        queryFn: () => searchFunc(boardType, queryType, query, page),
        staleTime: Infinity,
        enabled: query !== "",
        placeholderData: keepPreviousData(),
    })
}
