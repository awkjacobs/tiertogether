export const ROW_OPTIONS = {
    special: false,
    bleachers: false,
    bleachersLabel: "Bleachers",
    dugout: false,
    dugoutLabel: "Dugout",
}
export const sortedBoards = (boards) =>
    boards.toSorted((a, b) =>
        a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0,
    )
export const scoreDif = (vsScore) => {
    return {
        "-1": "lower",
        0: "equals",
        1: "higher",
        u: "u",
    }[vsScore]
}
export const queryTypesList = (type) => {
    return {
        movie: ["Title", "Director", "Actor"],
        anime: ["Series", "Movie"],
        tv: ["Series", "Actor"],
        videoGame: ["Title", "Developer"],
    }[type]
}

import Crown from "@app/components/Utility/Crown"
import { Minus, Plus, SquarePlus, UserMinus, UserPlus } from "lucide-react"

export const NOTIFICATION_ICONS = {
    Invitation: (
        <SquarePlus
            className={"col-start-1 col-end-2 row-span-2 text-purple-500"}
        />
    ),
    itemAdded: (
        <Plus className={"col-start-1 col-end-2 row-span-2 text-emerald-500"} />
    ),
    itemRemoved: (
        <Minus className={`col-start-1 col-end-2 row-span-2 text-rose-500`} />
    ),
    join: (
        <UserPlus
            className={`col-start-1 col-end-2 row-span-2 text-emerald-500`}
        />
    ),
    leave: (
        <UserMinus
            className={`col-start-1 col-end-2 row-span-2 text-zinc-500`}
        />
    ),
    kick: (
        <UserMinus
            className={`col-start-1 col-end-2 row-span-2 text-rose-500`}
        />
    ),
    newOwner: <Crown className={`col-start-1 col-end-2 row-span-2`} />,
}

export const itemType = (board, queryType) => {
    if (board.type == "movie") return "movie"
    else if (board.type == "tv") return "tv"
    else if (board.type == "anime" && queryType == "Series") return "tv"
    else if (board.type == "anime" && queryType == "Movie") return "movie"
    else if (board.type == "videoGame") return "videoGame"
}
export const scoreBar = {
    1: { style: "sRank", rank: "S" },
    2: { style: `bg-teal-500/20`, rank: "A" },
    3: { style: `bg-green-500/20`, rank: "B" },
    4: { style: `bg-yellow-500/20`, rank: "C" },
    5: { style: `bg-orange-500/20`, rank: "D" },
    6: { style: `bg-red-500/20`, rank: "F" },
    7: { style: `bg-zinc-600/10`, rank: "Bleachers" },
    8: { style: `bg-zinc-600/10`, rank: "Dugout" },
}
export const scoreFlex = (scoreGroup) => {
    switch (scoreGroup.length) {
        case 1:
            return "flex-1"
        case 2:
            return "flex-2"
        case 3:
            return "flex-3"
        case 4:
            return "flex-4"
        case 5:
            return "flex-5"
        case 6:
            return "flex-6"
        case 7:
            return "flex-7"
        case 8:
            return "flex-8"
        case 9:
            return "flex-9"
        case 10:
            return "flex-10"
        case 11:
            return "flex-11"
        case 12:
            return "flex-12"
        case 13:
            return "flex-13"
        case 14:
            return "flex-14"
        case 15:
            return "flex-15"
        case 16:
            return "flex-16"
        case 17:
            return "flex-17"
        case 18:
            return "flex-18"
        case 19:
            return "flex-19"
        case 20:
            return "flex-20"
        case 21:
            return "flex-21"
        case 22:
            return "flex-22"
        case 23:
            return "flex-23"
        case 24:
            return "flex-24"
        case 25:
            return "flex-25"
        case 26:
            return "flex-26"
        case 27:
            return "flex-27"
        case 28:
            return "flex-28"
        case 29:
            return "flex-29"
        case 30:
            return "flex-30"
        default:
            return "flex-1"
    }
}
export const subscore = (index) => {
    return index > 9 ? index : `0${index}`
}
export const contextRankConvert = (tier, index) => {
    switch (tier) {
        case "sRank":
            return "1." + subscore(index)
        case "aRank":
            return "2." + subscore(index)
        case "bRank":
            return "3." + subscore(index)
        case "cRank":
            return "4." + subscore(index)
        case "dRank":
            return "5." + subscore(index)
        case "fRank":
            return "6." + subscore(index)
        case "bleachers":
            return "7." + subscore(index)
        case "dugout":
            return "8." + subscore(index)
    }
}
export const comparedRank = (
    item,
    appData,
    userEntries,
    scoreToCompareAgainst,
) => {
    return {
        boardId: appData.board.id,
        id: userEntries,
        itemsId: item.id,
        name: findUserName(userEntries, appData),
        rank: scoreToCompareAgainst,
        userId: userEntries,
    }
}
export const findUserName = (userId, appData) => {
    return appData.board.users.find((user) => user.id === userId).name
}
export const findLogo = (images) => {
    return images?.logos?.find((logo) => logo.iso_639_1 === "en")?.file_path
}
export const releaseDate = (dateArr) => {
    const convertDate = (date) => new Date(date).toDateString().substring(4)

    let releaseArr = dateArr.map((date) => (date ? convertDate(date) : null))

    let release
    if (releaseArr.length < 2 || !releaseArr[1]) {
        release = releaseArr[0]
    } else if (releaseArr[0] && releaseArr[1]) {
        release = releaseArr[0] + " - " + releaseArr[1]
    } else release = null
    return release
}
const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
}
export const simplifiedDate = (date) => {
    let currentYear = new Date().getFullYear()
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()

    if (currentYear === year) return `${months[month]} ${day}`
    else return `${months[month]} ${day} ${year}`
}
export const backdropSource = (item, type) => {
    if (type === "videoGame") {
        if (item?.artworks)
            return `https://images.igdb.com/igdb/image/upload/t_1080p/${item?.artworks[0]?.image_id}.jpg`
        else
            return `https://images.igdb.com/igdb/image/upload/t_1080p/${item.backdrop_path}.jpg`
    } else return `http://image.tmdb.org/t/p/original${item.backdrop_path}`
}
export const posterSource = (item, type) => {
    if (type === "videoGame" && item.cover) {
        if (item.cover)
            return `https://images.igdb.com/igdb/image/upload/t_cover_big/${item?.cover?.image_id}.jpg`
    } else return `http://image.tmdb.org/t/p/w300${item.poster_path}`
}
export const get_release = (item, details) => {
    if (item.release_date) return [item.release_date]
    else if (details?.data?.release_date) return [details?.data?.release_date]
    else if (details.data?.first_air_date && details?.data?.last_air_date)
        return [details.data?.first_air_date, details?.data?.last_air_date]
    else if (item.release_dates) return [item.release_dates[0].human]
    else if (details?.data?.release_dates)
        return [details?.data?.release_dates[0].human]
    else return null
}
