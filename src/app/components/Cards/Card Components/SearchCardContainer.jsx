export default function SearchCardContainer({
    children,
    style,
    backdropSource,
}) {
    return (
        <div
            style={style}
            className={`border-1 absolute left-0 top-0 w-full rounded-md border border-zinc-800 bg-surface-200 shadow-md dark:bg-surface-800`}
        >
            <div
                className={`flex h-24 flex-row rounded-md md:h-60`}
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgb(var(--surface800) / 40%), rgb(var(--surface900)/ 80%)), url(${backdropSource})`,
                    backgroundSize: "cover",
                }}
            >
                {children}
            </div>
        </div>
    )
}
