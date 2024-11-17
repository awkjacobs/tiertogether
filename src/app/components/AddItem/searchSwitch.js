import {
    TMDB_SEARCH,
    TMDB_SEARCH_ACTOR_MOVIE,
    TMDB_SEARCH_DIRECTOR,
    TMDB_SEARCH_ANIME_SERIES,
    TMDB_SEARCH_ANIME_MOVIE,
    TMDB_SEARCH_TITLE,
    TMDB_SEARCH_ACTOR_TV,
    TMDB_SEARCH_TV_SERIES,
} from "@/lib/movieFuncs"

export const searchSwitch = async (type, queryType, query) => {
    let res
    if (type === "movie") {
        switch (queryType) {
            case "Director":
                res = await TMDB_SEARCH_DIRECTOR(query)
                break
            case "Actor":
                res = await TMDB_SEARCH_ACTOR_MOVIE(query)
                break

            default:
                res = await TMDB_SEARCH_TITLE(query)
                break
        }
    }
    if (type === "anime") {
        switch (queryType) {
            case "Movie":
                res = await TMDB_SEARCH_ANIME_MOVIE(query)
                break

            default:
                res = await TMDB_SEARCH_ANIME_SERIES(query)
                break
        }
    }
    if (type === "tv") {
        switch (queryType) {
            case "Actor":
                res = await TMDB_SEARCH_ACTOR_TV(query)
                break

            default:
                res = await TMDB_SEARCH_TV_SERIES(query)
                break
        }
    }
    return res
}
