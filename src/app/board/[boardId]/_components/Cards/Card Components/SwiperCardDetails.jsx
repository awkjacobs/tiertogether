export function SwiperCardDetails({
    type,
    date,
    directors,
    seasons,
    episodes,
    status,
}) {
    const directorPluralisation =
        directors?.length > 1 ? "Directors:" : "Director:"
    const directorsJoin =
        directors?.length > 1 ? directors.join(", ") : directors

    return (
        <div
            className={`grid grid-cols-[auto_1fr] gap-1 rounded bg-surface-900/60 p-2 text-xs text-purple-50`}
        >
            <SwiperCardDetailsGroup
                section={type === "movie" ? "Released:" : "Air Dates:"}
                content={date}
            />
            {directors && (
                <SwiperCardDetailsGroup
                    section={directorPluralisation}
                    content={directorsJoin}
                />
            )}
            {seasons && (
                <SwiperCardDetailsGroup
                    section={"Length:"}
                    content={`
                        ${seasons.toString()} ${
                            seasons > 1 ? "Seasons / " : "Season / "
                        } ${episodes.toString()} Eps`}
                />
            )}
            {(type === "tv" || type === "anime") && status && (
                <SwiperCardDetailsGroup
                    section={"Status:"}
                    content={`
                        ${status}`}
                />
            )}
        </div>
    )
}

function SwiperCardDetailsGroup({ section, content }) {
    return (
        <div className={`col-start-1 col-end-3 grid grid-cols-subgrid`}>
            <span className={`col-start-1 pr-2 font-light opacity-60`}>
                {section}
            </span>
            <p className={`col-start-2`}>{content}</p>
        </div>
    )
}
