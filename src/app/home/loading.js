import PageContainer from "@app/components/Utility/PageContainer"
import { Button } from "@components/ui/button"
import { Skeleton } from "@components/ui/skeleton"
import LogoTriangles from "@components/Utility/LogoTriangles"
import Link from "next/link"
import LogoButton from "../components/AppBar/_components/LogoButton"

export default function HomeLoading() {
    return (
        <PageContainer>
            {/* app bar */}
            <header
                className={`sticky top-0 z-10 col-span-full row-start-1 row-end-2 grid h-10 w-svw grid-cols-subgrid grid-rows-subgrid justify-center rounded border-b border-surface-400 bg-surface-200 shadow-xl drop-shadow-2xl md:h-12 dark:border-surface-900 dark:bg-surface-900`}
            >
                <div
                    className={`col-span-full flex items-center justify-between`}
                >
                    <Button variant="ghost" asChild>
                        <Link
                            className={`flex h-full cursor-pointer flex-row content-center items-center gap-1 px-2`}
                            href={`/home`}
                        >
                            <LogoButton />
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
            {/* content */}
            <section
                className={`no-scrollbar col-start-3 col-end-4 flex h-full flex-1 flex-col overflow-x-visible overflow-y-scroll`}
            >
                <div
                    className={`my-2 flex items-center justify-between md:py-6`}
                >
                    <h1
                        className={`flex-1 text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
                    >
                        My Boards
                    </h1>
                    <div className={`flex gap-2 md:gap-4`}>
                        <Skeleton className={`h-9 w-[96px]`} />
                    </div>
                </div>
                <div
                    className={`mb-4 flex flex-wrap gap-4 overflow-visible rounded bg-surface-300 p-4 md:p-8 dark:bg-surface-900`}
                >
                    <Skeleton
                        className={`relative flex h-48 min-w-60 flex-1 overflow-hidden rounded-md shadow-lg drop-shadow-lg`}
                    />
                    <Skeleton
                        className={`relative flex h-48 min-w-60 flex-1 overflow-hidden rounded-md shadow-lg drop-shadow-lg`}
                    />
                    <Skeleton
                        className={`relative flex h-48 min-w-60 flex-1 overflow-hidden rounded-md shadow-lg drop-shadow-lg`}
                    />
                </div>
            </section>
        </PageContainer>
    )
}
