import LogoTriangles from "@app/components/Utility/LogoTriangles"
import DotsBackground from "@components/Utility/dotsBackground"
import TextLink from "@components/Utility/textLink"
import H2 from "@components/Utility/H2"
import H3 from "@components/Utility/H3"
import TextBlock from "@components/Utility/TextBlock"
import { GRID_TEMP_COLUMNS } from "@lib/const"
import Image from "next/image"
import { SignedOut, SignUpButton } from "@clerk/nextjs"
import { Button } from "@app/components/ui/button"

export default async function LandingPageContent() {
    return (
        <main
            className={`z-0 col-span-full row-start-2 row-end-3 grid max-h-[calc(100svh-3.5rem)] grid-cols-subgrid overflow-x-clip overflow-y-scroll`}
        >
            <section
                className={`relative col-span-full items-center justify-center`}
                style={{
                    display: `grid`,
                    gridTemplateColumns: GRID_TEMP_COLUMNS,
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
                            className={`flex h-min flex-row items-center gap-4 text-4xl md:text-8xl`}
                        >
                            <LogoTriangles className={`h-16 w-auto md:h-36`} />
                            <h1
                                className={`relative flex-1 text-purple-500 dark:text-purple-200`}
                            >
                                tier
                                <span
                                    className={`font-bold text-purple-800 dark:text-purple-500`}
                                >
                                    together
                                </span>
                            </h1>
                        </div>
                        <p className="text-balance text-center text-purple-800 md:text-2xl dark:text-purple-300">
                            Create a board, add media, and start ranking them
                            with your friends.
                        </p>
                        <SignedOut>
                            <Button asChild className={`my-8`}>
                                <SignUpButton mode="modal" />
                            </Button>
                        </SignedOut>
                    </div>
                </div>
                <div
                    className={`relative col-span-full row-auto row-start-2 row-end-3 grid grid-cols-subgrid items-start justify-start gap-y-16 py-32`}
                >
                    <TextBlock>
                        <H2>About tiertogether</H2>
                        <p>
                            tiertogether is a personal project that I started to
                            track and rate movies that some friends and I viewed
                            during a regular-ish movie night, but after a year
                            of spending weekends and PTO days on development,
                            this project has become an extended exercise to
                            learn React and Next.js, in addition to continuing
                            to learn Javascript.
                        </p>
                        <em className={`text-purple-800 dark:text-purple-300`}>
                            This project was never intended to earn any money,
                            nor was it ever intended to be a commercial project.
                            It is not monetized, and is not intended to be
                            monetized.
                        </em>

                        <p>
                            I am not a developer or engineer. I&apos;ve only
                            been programming with Javascript since 2022, and
                            this is my first large web project developed from
                            scratch. As such, this project is sloppy and will
                            most likely present bugs. I will continue to attempt
                            to improve the site and add new features, but I
                            don&apos;t intend to spend as much time working on
                            it in the future as I did in the first year. You're
                            welcome to view the source code on{" "}
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
                            <TextLink newTab={false} href="/roadmap">
                                Roadmap
                            </TextLink>{" "}
                            for details.
                        </p>
                        <p>Have fun!</p>
                    </TextBlock>
                    <TextBlock>
                        <H3>Attributions</H3>
                        <div className={`flex flex-col gap-4 py-8 md:flex-row`}>
                            <Image
                                src={"/TMDB_logo.svg"}
                                alt="TMDB logo"
                                width="200"
                                height="200"
                            />
                            <p>
                                This product uses the{" "}
                                <TextLink
                                    href={`https://developer.themoviedb.org/docs/getting-started`}
                                    newTab={true}
                                >
                                    TMDB API
                                </TextLink>{" "}
                                but is not endorsed or certified by TMDB.
                            </p>
                        </div>
                        <div className={`flex flex-col gap-4 md:flex-row`}>
                            <Image
                                src={"/IGDB_logo.svg"}
                                alt="IGDB logo"
                                width="200"
                                height="200"
                            />
                            <p>
                                This product uses the{" "}
                                <TextLink
                                    href={`https://api-docs.igdb.com/#getting-started`}
                                    newTab={true}
                                >
                                    IGDB API
                                </TextLink>{" "}
                                but is not endorsed or certified by IGDB.
                            </p>
                        </div>
                    </TextBlock>
                </div>
            </section>
        </main>
    )
}
