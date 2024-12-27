"use server"

export async function IGBD_GET_TOKEN() {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
        },
    }
    const res = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGBD_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
        options,
    )
        .then((response) => response.json())
        .catch((err) => {
            console.error("IGDB Token Error: " + err)
            throw new Error(err)
        })

    return res
}
export async function IGDB_GAME_SEARCH(query) {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Client-ID": `${process.env.IGBD_CLIENT_ID}`,
            Authorization: `${process.env.IGBD_ACCESS_TOKEN}`,
        },
        body: `
            search "${query}"; 
            fields name, artworks.image_id, cover.image_id, genres, expansions.*, franchises.*, platforms.name, platforms.platform_logo.image_id, release_dates.*, storyline, summary;
            where version_parent = null & parent_game = null;
            limit 50;
            `,
    }
    const res = await fetch(`https://api.igdb.com/v4/games`, options)
        .then((response) => response.json())
        .then((data) => ({ results: data }))
        .catch((err) => {
            console.error("Search Game Title Error: " + err)
            throw new Error(err)
        })

    return res
}
export async function IGDB_GET_DETAILS(id) {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Client-ID": `${process.env.IGBD_CLIENT_ID}`,
            Authorization: `${process.env.IGBD_ACCESS_TOKEN}`,
        },
        body: `
            fields name, artworks.image_id, cover.image_id, genres.*, expansions.*, franchises.*, platforms.name, release_dates.*, storyline, summary, involved_companies.company.*, involved_companies.developer;
            where id = ${id};
        `,
    }
    const res = await fetch(
        `
        https://api.igdb.com/v4/games/`,
        options,
        { cache: "force-cache" },
    )
        .then((response) => response.json())
        .then((data) => data[0])
        .catch((err) => {
            console.error("IGDB Get Details Error: " + err)
            throw new Error(err)
        })

    return res
}
export async function IGDB_GET_FRANCHISE(id) {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Client-ID": `${process.env.IGBD_CLIENT_ID}`,
            Authorization: `${process.env.IGBD_ACCESS_TOKEN}`,
        },
        body: `
            fields name, games.release_dates.*, games.platforms.name, games.artworks.image_id, games.*;
            where id = ${id};
        `,
    }
    const res = await fetch(
        `
        https://api.igdb.com/v4/franchises/`,
        options,
        { cache: "force-cache" },
    )
        .then((response) => response.json())
        .then((data) => data[0])
        .catch((err) => {
            console.error("IGDB Get Franchise Error: " + err)
            throw new Error(err)
        })

    return res
}
