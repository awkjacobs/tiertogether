"use server"
export async function TMDB_SEARCH(query, page) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => {
            console.error("Search Movie Title Error: " + err)
            throw new Error(err)
        })

    return res
}
export async function TMDB_SEARCH_TITLE(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => {
            console.error("Search Movie Title Error: " + err)
            throw new Error(err)
        })

    return res
}
export async function TMDB_SEARCH_DIRECTOR(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
    )
        .then((response) => response.json())
        .then((result) => {
            return fetch(
                `https://api.themoviedb.org/3/person/${result.results[0].id}/movie_credits?language=en-US`,
                options,
                // { cache: "force-cache" },
            )
        })
        .then((response) => response.json())
        .then((result) => result.crew.filter((item) => item.job === "Director"))
        .then((data) => ({ results: data }))
        .catch((err) => console.error("Search Movie Director Error: " + err))
    return res
}
export async function TMDB_SEARCH_ACTOR_MOVIE(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
        { cache: "force-cache" },
    )
        .then((response) => response.json())
        .then((result) => {
            return fetch(
                `https://api.themoviedb.org/3/person/${result.results[0].id}/movie_credits?language=en-US`,
                options,
                // { cache: "force-cache" },
            )
        })
        .then((response) => response.json())
        .then((result) => result.cast)
        .then((data) => ({ results: data }))
        .catch((err) => console.error("Search Movie Actor Error: " + err))
    return res
}
export async function TMDB_SEARCH_TV_SERIES(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Search TV Series Error: " + err))

    return res
}
export async function TMDB_SEARCH_ACTOR_TV(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .then((result) => {
            return fetch(
                `https://api.themoviedb.org/3/person/${result.results[0].id}/tv_credits?language=en-US`,
                options,
                // { cache: "force-cache" },
            )
        })
        .then((response) => response.json())
        .then((result) => result.cast)
        .then((data) => ({ results: data }))
        .catch((err) => console.error("Search TV Actor Error: " + err))
    return res
}

export async function TMDB_SEARCH_ANIME_SERIES(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&page=${page}&sort_by=name.asc&with_genres=16&with_text_query=${query}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Search Anime Series Error: " + err))

    return res
}
export async function TMDB_SEARCH_ANIME_MOVIE(query, page = 1) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_null_first_air_dates=false&page=${page}&sort_by=name.asc&with_genres=16&with_keywords=210024%7C287501&with_text_query=${query}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Search Anime Movie Error: " + err))

    return res
}

export async function TMDB_GET_IMAGES(id, type) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }

    const res = await fetch(
        `
        https://api.themoviedb.org/3/${type}/${id}/images`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Search Images Error: " + err))

    return res
}

export async function TMDB_GET_CREDITS(id, type) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }

    const res = await fetch(
        `
        https://api.themoviedb.org/3/${type === "anime" ? "tv" : type}/${id}/credits`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Search Movie Credits Error: " + err))

    return res
}
export async function TMDB_GET_DETAILS(id, type) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }

    const res = await fetch(
        `
        https://api.themoviedb.org/3/${type === "anime" ? "tv" : type}/${id}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Get Details Error: " + err))

    return res
}
export async function TMDB_GET_COLLECTION(id) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${process.env.MOVIEDB_TOKEN}`,
        },
    }

    const res = await fetch(
        `
        https://api.themoviedb.org/3/collection/${id}`,
        options,
        // { cache: "force-cache" },
    )
        .then((response) => response.json())
        .catch((err) => console.error("Get Collection Error: " + err))

    return res
}
