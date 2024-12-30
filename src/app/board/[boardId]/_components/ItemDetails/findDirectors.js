export function findDirectors(credits) {
    let directorsList = credits.crew
        .filter((person) => person.job === "Director")
        .map((director) => {
            return director.name
        })
    return directorsList
}
