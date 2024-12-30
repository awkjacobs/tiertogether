import LogoTriangles from "@app/components/Utility/LogoTriangles"
import DotsBackground from "@components/Utility/dotsBackground"
import TextLink from "@components/Utility/textLink"

export default async function LandingPageContent() {
    return (
        <main
            className={`col-span-full row-start-2 row-end-3 grid max-h-[calc(100svh-3.5rem)] grid-cols-subgrid overflow-x-clip overflow-y-scroll`}
        >
            <section
                className={`relative col-span-full items-center justify-center`}
                style={{
                    display: `grid`,
                    gridTemplateColumns: `
                    [left-side-start] 
                    1fr
                    [left-side-end main-content-start] 
                    2fr
                    [query-start] 
                    min(calc(100vw - 2rem), 75rem) 
                    [query-end] 
                    2fr
                    [main-content-end right-side-start] 
                    1fr 
                    [right-side-end]`,
                    gridAutoRows: `auto`,
                }}
            >
                <div
                    className={`relative col-span-full row-start-1 row-end-2 grid h-[50svh] grid-cols-subgrid grid-rows-subgrid items-center justify-center overflow-clip md:h-[calc(100svh-4rem)]`}
                >
                    <DotsBackground className={`col-span-full row-start-1`} />

                    <div
                        className={`relative z-50 col-start-3 col-end-4 flex h-[calc(100svh-4rem)] flex-col items-center justify-center gap-4`}
                    >
                        <div
                            className={`flex h-min flex-row items-center gap-4 text-4xl shadow-2xl md:text-8xl`}
                        >
                            <LogoTriangles className={`h-16 w-auto md:h-36`} />
                            <h1 className={`relative flex-1 text-purple-200`}>
                                tier
                                <span className={`font-bold text-purple-500`}>
                                    together
                                </span>
                            </h1>
                        </div>
                        <p className="text-balance text-center md:text-2xl dark:text-purple-300">
                            Create a board, add media, and start ranking them
                            with your friends.
                        </p>
                    </div>
                </div>
                <div
                    className={`relative col-span-full row-start-2 row-end-3 grid grid-cols-subgrid grid-rows-subgrid items-start justify-start py-32`}
                >
                    <div
                        className={`relative z-50 col-start-3 col-end-4 items-center justify-center gap-4 space-y-8 text-lg leading-9`}
                    >
                        <h2 className={`font-bold text-purple-300 md:text-4xl`}>
                            About tiertogether
                        </h2>
                        <p>
                            tiertogether is a personal project that I started
                            with the intention of tracking and rating movies
                            that some friends and I viewed during a regular-ish
                            movie night, but after a year of spending weekends
                            and PTO days on development, this project has become
                            an extended exercise to learn React and Next.js as
                            well as continue learning Javascript.
                        </p>

                        <p>
                            I am not a developer or engineer. I&apos;ve only
                            been programming with Javascript since 2022, and
                            this is my first large web project developed from
                            scratch. As such, this project is sloppy and will
                            most likely present bugs. I will continue to attempt
                            to improve the site and add new features, but I
                            don&apos;t intend to spend as much time working on
                            it in the future as I did in the first year. Feel
                            free to view the source code on{" "}
                            <TextLink
                                href={`https://github.com/awkjacobs/tiertogether`}
                                newTab={true}
                            >
                                GitHub
                            </TextLink>
                            , clone the project, or submit issues or pull
                            requests!
                        </p>
                        <p>
                            More features are planned for the future, check out
                            the{" "}
                            <TextLink newTab={false}>
                                Changelog/Roadmap
                            </TextLink>{" "}
                            for details.
                        </p>
                        <p>Have fun!</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
