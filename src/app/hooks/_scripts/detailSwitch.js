import { TMDB_GET_DETAILS } from "@api/TMDB"

import { IGDB_GET_DETAILS } from "@api/IGDB"

export const detailsFunc = (itemId, itemType) => {
    if (itemType === "movie" || itemType === "tv") {
        return TMDB_GET_DETAILS(itemId, itemType)
    }
    if (itemType === "videoGame") {
        return IGDB_GET_DETAILS(itemId)
    }
    return res
}
