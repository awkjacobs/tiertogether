import { useMediaQuery } from "@app/hooks/use-media-query"
import { Skeleton } from "@components/ui/skeleton"

export default function SearchCardSkeleton() {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className={`relative w-full rounded-md bg-zinc-900 shadow-md`}>
            <div className={`flex h-24 flex-row rounded-md md:h-60`}>
                <Skeleton
                    className={
                        isDesktop
                            ? `h-[240px] w-[160px]`
                            : `h-[100px] w-[66.6px]`
                    }
                />
                <div
                    className={`flex min-w-[50%] flex-1 flex-col justify-between gap-1 p-[min(3vw,_1.5rem)] pb-0 md:pb-[min(3vw,_1.5rem)]`}
                >
                    <Skeleton
                        className={isDesktop ? `h-[140px]` : `h-[48px]`}
                    />

                    {isDesktop && (
                        <>
                            <Skeleton className={`h-[105px]`} />
                            <div style={{ flex: 1 }} />
                            <Skeleton className={`h-[105px]`} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
