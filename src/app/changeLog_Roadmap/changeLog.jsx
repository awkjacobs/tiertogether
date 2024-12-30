import TextLink from "@components/Utility/textLink"
import H2 from "@components/Utility/H2"
import TextBlock from "@components/Utility/TextBlock"

export default function Changelog() {
    return (
        <div
            className={`relative col-span-full grid grid-cols-subgrid grid-rows-subgrid items-start justify-start py-8 md:py-32`}
        >
            <TextBlock>
                <H2>Changlog</H2>
                <p>
                    tiertogether is a personal project that I started with the
                    intention of tracking and rating movies that some friends
                    and I viewed during a regular-ish movie night, but after a
                    year of spending weekends and PTO days on development, this
                    project has become an extended exercise to learn React and
                    Next.js as well as continue learning Javascript.
                </p>

                <p>
                    I am not a developer or engineer. I&apos;ve only been
                    programming with Javascript since 2022, and this is my first
                    large web project developed from scratch. As such, this
                    project is sloppy and will most likely present bugs. I will
                    continue to attempt to improve the site and add new
                    features, but I don&apos;t intend to spend as much time
                    working on it in the future as I did in the first year. Feel
                    free to view the source code on{" "}
                    <TextLink
                        href={`https://github.com/awkjacobs/tiertogether`}
                        newTab={true}
                    >
                        GitHub
                    </TextLink>
                    , clone the project, or submit issues or pull requests!
                </p>
                <p>
                    More features are planned for the future, check out the{" "}
                    <TextLink newTab={false}>Changelog/Roadmap</TextLink> for
                    details.
                </p>
                <p>Have fun!</p>
            </TextBlock>
        </div>
    )
}
