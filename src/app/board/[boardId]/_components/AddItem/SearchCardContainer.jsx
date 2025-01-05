import { ItemDataContext } from "@app/components/_providers/itemDataProvider"
import { useTheme } from "next-themes"

export default function SearchCardContainer({
    children,
    style,
    backdropSource,
    contextValue,
}) {
    const appTheme = useTheme()
    const bgImage =
        appTheme.theme === "dark"
            ? `linear-gradient(to bottom, rgb(var(--zinc800) / 40%), rgb(var(--zinc900)/ 80%)), url(${backdropSource?.fullPath})`
            : `linear-gradient(to bottom, rgb(228 228 231 / 40%), rgb(var(--zinc100)/ 80%)), url(${backdropSource?.fullPath})`

    return (
        <ItemDataContext.Provider value={contextValue}>
            <div
                style={style}
                className={`border-1 absolute left-0 top-0 w-full rounded-md border border-zinc-300 shadow-md dark:border-zinc-800`}
            >
                <div
                    className={`flex h-24 flex-row rounded-md md:h-60`}
                    style={{
                        backgroundImage: backdropSource ? bgImage : null,
                        backgroundSize: "cover",
                    }}
                >
                    {children}
                </div>
            </div>
        </ItemDataContext.Provider>
    )
}
