import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
export function MAKE_ID(length) {
    let result = ""
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        )
        counter += 1
    }
    return result
}
export const findLogo = (images) => {
    return images?.logos?.find((logo) => logo.iso_639_1 === "en")?.file_path
}
export const convertDate = (date) => new Date(date).toDateString().substring(4)
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
