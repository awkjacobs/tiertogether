import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import H2 from "@components/Utility/H2"
import PageContainer from "@components/Utility/PageContainer"
import TextBlock from "@components/Utility/TextBlock"
import TextLink from "@components/Utility/textLink"
import { GRID_TEMP_COLUMNS } from "@lib/const"
import ChangelogItem from "./ChangelogItem"

export async function generateMetadata() {
    return {
        title: `Change Log | tiertogether`,
    }
}

const changelog = [
    {
        version: "[1.0.0]",
        date: "2025-01-01",
        description: "Full 1.0.0 tiertogether release.",
        added: [],
        changed: [],
        fixed: [],
    },
]

export default async function ChangelogPage() {
    const { userId } = await auth()
    let userDB
    if (userId) {
        userDB = await PRISMA_GET_USER(userId)
    } else {
        userDB = null
    }
    const appData = {
        user: userDB,
    }
    return (
        <PageContainer
            className={`h-[100svh] max-h-[100svh] items-start overflow-clip p-0`}
        >
            <AppBar appData={appData} className={`m-2`} />
            <main
                className={`z-10 col-span-full row-start-2 row-end-3 grid max-h-[calc(100svh-3.5rem)] grid-cols-subgrid overflow-x-clip overflow-y-scroll`}
                style={{
                    display: `grid`,
                    gridTemplateColumns: GRID_TEMP_COLUMNS,
                    gridAutoRows: `auto`,
                }}
            >
                <div
                    className={`relative col-span-full grid grid-cols-subgrid grid-rows-subgrid items-start justify-start py-8 md:py-32`}
                >
                    <TextBlock>
                        <H2>Changlog</H2>
                        <p>
                            All notable changes to this project will be
                            documented in this file. The format is based on{" "}
                            <TextLink
                                href="http://keepachangelog.com/"
                                newTab="true"
                            >
                                Keep a Changelog
                            </TextLink>{" "}
                            and this project adheres to{" "}
                            <TextLink href="http://semver.org/" newTab="true">
                                Semantic Versioning
                            </TextLink>
                            .
                        </p>
                        <div className="divide-y divide-purple-500 pt-4">
                            {changelog.map((changelogItem, index) => (
                                <ChangelogItem
                                    key={index}
                                    changelogItem={changelogItem}
                                />
                            ))}
                        </div>
                    </TextBlock>
                </div>
            </main>
        </PageContainer>
    )
}
