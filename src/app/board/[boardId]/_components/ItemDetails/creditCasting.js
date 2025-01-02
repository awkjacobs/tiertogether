export function creditCasting(credits) {
    let castings = []
    for (let i = 0; i < 7 && i < credits.cast.length; i++) {
        castings.push(credits.cast[i].name)
    }
    return castings
}
