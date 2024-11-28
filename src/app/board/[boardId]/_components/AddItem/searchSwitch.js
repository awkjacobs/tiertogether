import {
    TMDB_SEARCH_ACTOR_MOVIE,
    TMDB_SEARCH_DIRECTOR,
    TMDB_SEARCH_ANIME_SERIES,
    TMDB_SEARCH_ANIME_MOVIE,
    TMDB_SEARCH_TITLE,
    TMDB_SEARCH_ACTOR_TV,
    TMDB_SEARCH_TV_SERIES,
} from "@/lib/movieFuncs"

export const searchFunc = (type, queryType, query, page) => {
    if (type === "movie") {
        switch (queryType) {
            case "Director":
                return TMDB_SEARCH_DIRECTOR(query, page)
            case "Actor":
                return TMDB_SEARCH_ACTOR_MOVIE(query, page)

            default:
                return TMDB_SEARCH_TITLE(query, page)
        }
    }
    if (type === "anime") {
        switch (queryType) {
            case "Movie":
                return TMDB_SEARCH_ANIME_MOVIE(query, page)
            default:
                return TMDB_SEARCH_ANIME_SERIES(query, page)
        }
    }
    if (type === "tv") {
        switch (queryType) {
            case "Actor":
                return TMDB_SEARCH_ACTOR_TV(query, page)
            default:
                return TMDB_SEARCH_TV_SERIES(query, page)
        }
    }
    return res
}
