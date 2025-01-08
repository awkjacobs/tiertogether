import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import H2 from "@components/Utility/H2"
import PageContainer from "@components/Utility/PageContainer"
import TextBlock from "@components/Utility/TextBlock"
import { GRID_TEMP_COLUMNS } from "@lib/const"
import ChangelogItem from "./ChangelogItem"

export async function generateMetadata() {
    return {
        title: `Change Log | tiertogether`,
    }
}

const changelog = [
    {
        version: "[1.0.2]",
        date: "2025-01-08",
        description: "Additional bug fixes and improvements.",
        added: ["Added more to README"],
        changed: ["Changed the favicon for better visibility"],
        fixed: [
            "Corrected Card Overlay showing incorrect size on mobile",
            "Corrected bug where deleting a board would not throw an error due to existing ranks and items tied to the board",
            "Corrected bug where removing a board on the would then show the wrong title on the following board cards",
        ],
    },
    {
        version: "[1.0.1]",
        date: "2025-01-07",
        description: "Several breaking bugs have been found and addressed.",
        added: [],
        changed: [
            "Changed the Add Item drawer to a dialog as the drawer was causing issues on mobile",
        ],
        fixed: [
            "Fixed typo in the Toggle Theme tooltip",
            "Corrected alert text being hidden by the alert close button",
            "Correct share invite link url",
            "Correct bug where deleting a board would not throw an error due to existing notifications tied to the board",
            "Correct bug where the search card would not change color based on theme",
        ],
    },
    {
        version: "[1.0.0]",
        date: "2024-12-31",
        description: "Initial release of the app.",
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
                        <H2>Changelog</H2>
                        <p>
                            All notable changes to this project will be
                            documented on this page.
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
