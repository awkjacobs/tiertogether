import { useMediaQuery } from "@/app/hooks/use-media-query"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchCardSkeleton() {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className={`bg-surface-900 rounded-md shadow-md w-full relative`}>
            <div className={`flex flex-row rounded-md h-24 md:h-60`}>
                <Skeleton
                    className={
                        isDesktop
                            ? `w-[160px] h-[240px]`
                            : `w-[66.6px] h-[100px]`
                    }
                />
                <div
                    className={`min-w-[50%] flex-1 flex flex-col pb-0 md:pb-[min(3vw,_1.5rem)] p-[min(3vw,_1.5rem)] gap-1 justify-between`}
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
