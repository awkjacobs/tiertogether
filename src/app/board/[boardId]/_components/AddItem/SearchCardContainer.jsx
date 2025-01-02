import { ItemDataContext } from "@app/components/_providers/itemDataProvider"

export default function SearchCardContainer({
    children,
    style,
    backdropSource,
    contextValue,
}) {
    return (
        <ItemDataContext.Provider value={contextValue}>
            <div
                style={style}
                className={`border-1 absolute left-0 top-0 w-full rounded-md border border-zinc-800 shadow-md`}
            >
                <div
                    className={`flex h-24 flex-row rounded-md md:h-60`}
                    style={{
                        backgroundImage: backdropSource
                            ? `linear-gradient(to bottom, rgb(var(--surface800) / 40%), rgb(var(--surface900)/ 80%)), url(${backdropSource.fullPath})`
                            : null,
                        backgroundSize: "cover",
                    }}
                >
                    {children}
                </div>
            </div>
        </ItemDataContext.Provider>
    )
}
