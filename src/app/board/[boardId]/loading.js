import Link from "next/link"
import { House } from "lucide-react"
import PageContainer from "@components/Utility/PageContainer"
import { Button } from "@components/ui/button"
import { Skeleton } from "@components/ui/skeleton"
import LogoTriangles from "@components/Utility/LogoTriangles"

export default function BoardLoading() {
    return (
        <PageContainer>
            {/* app bar */}
            <header
                className={`sticky top-0 z-10 col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 mt-2 grid h-10 w-svw grid-cols-subgrid grid-rows-subgrid justify-center rounded border-b border-surface-400 bg-surface-200 shadow-xl drop-shadow-2xl md:h-12 dark:border-surface-900 dark:bg-surface-900`}
            >
                <div
                    className={`col-start-2 col-end-3 flex items-center justify-between`}
                >
                    <Button variant="ghost" asChild>
                        <Link
                            className={`flex h-full cursor-pointer flex-row content-center items-center gap-2 px-2`}
                            href={`/home`}
                        >
                            <LogoTriangles className={`h-full w-auto`} />

                            <h1
                                className={`text-base font-medium text-purple-500 dark:text-purple-200`}
                            >
                                tier
                                <span
                                    className={`text-purple-800 dark:text-purple-500`}
                                >
                                    together
                                </span>
                            </h1>
                        </Link>
                    </Button>
                    <div className={`flex items-center justify-center`}>
                        <Skeleton className={`m-1 h-8 w-8`} />
                        <Skeleton className={`m-1 h-8 w-8`} />
                        <Skeleton className={`m-1 h-8 w-8`} />
                        <Skeleton className={`m-1 h-8 w-8`} />
                    </div>
                </div>
            </header>
            {/* board */}
            <div
                className={`no-scrollbar col-start-2 col-end-3 flex h-full flex-1 flex-col overflow-x-visible overflow-y-scroll pb-8`}
            >
                <div
                    className={`my-2 grid w-full grid-cols-[1fr,auto] grid-rows-[auto,auto] items-center gap-2 md:grid-cols-[1fr,auto,auto] md:grid-rows-[auto]`}
                >
                    <Skeleton
                        className={`col-start-1 row-start-1 h-10 flex-1 md:h-10`}
                    />
                    <div
                        className={`col-start-1 col-end-3 row-start-2 flex w-full flex-row items-center gap-2 md:col-start-2 md:col-end-3 md:row-start-1`}
                    >
                        <Skeleton className={`h-8 w-16 md:h-10 md:w-20`} />
                        <Skeleton className={`h-8 flex-1 md:h-10 md:w-52`} />
                    </div>
                    <Skeleton
                        className={`col-start-2 row-start-1 h-10 w-10 md:col-start-3`}
                    />
                </div>
                <section
                    className={`flex w-full flex-col gap-2 self-start border-2 border-transparent md:gap-4`}
                >
                    <div className={`flex flex-col gap-1`}>
                        <Skeleton
                            className={`min-h-[4.75rem] overflow-hidden first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem]`}
                        ></Skeleton>
                        <Skeleton
                            className={`min-h-[4.75rem] overflow-hidden first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem]`}
                        ></Skeleton>
                        <Skeleton
                            className={`min-h-[4.75rem] overflow-hidden first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem]`}
                        ></Skeleton>
                        <Skeleton
                            className={`min-h-[4.75rem] overflow-hidden first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem]`}
                        ></Skeleton>
                        <Skeleton
                            className={`min-h-[4.75rem] overflow-hidden first:rounded-t-lg last:rounded-b-lg md:min-h-[7rem]`}
                        ></Skeleton>
                    </div>
                </section>
            </div>
            {/* queue */}
            <Skeleton
                className={`bottom-0 col-start-2 col-end-3 flex h-[136px] flex-row justify-center rounded-t-md p-2 shadow-[0px_-14px_34px_-20px_rgba(0,0,0,0.8)] md:h-[272px] md:p-4`}
            />
        </PageContainer>
    )
}
