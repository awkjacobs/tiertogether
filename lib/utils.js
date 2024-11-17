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