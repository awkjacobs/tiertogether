import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@components/Utility/PageContainer"
import H2 from "@components/Utility/H2"
import TextBlock from "@components/Utility/TextBlock"
import { GRID_TEMP_COLUMNS } from "@lib/const"

export async function generateMetadata() {
    return {
        title: `Roadmap | tiertogether`,
    }
}

export default async function RoadmapPage() {
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
                className={`col-span-full row-start-2 row-end-3 grid max-h-[calc(100svh-3.5rem)] grid-cols-subgrid overflow-x-clip overflow-y-scroll`}
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
                        className={`relative col-span-full grid grid-cols-subgrid grid-rows-subgrid items-start justify-start py-8 md:py-32`}
                    >
                        <TextBlock>
                            <H2>Roadmap</H2>
                            <p>
                                tiertogether is a work in progress. Some
                                features planned for the future are:
                            </p>
                            <ul className={`list-inside list-disc pl-8`}>
                                <li>Add list view</li>
                                <li>Add more types of boards</li>
                                <li>Add more search options</li>
                                <li>Add board description</li>
                                <li>Add comments</li>
                            </ul>
                        </TextBlock>
                    </div>
                </section>
            </main>
        </PageContainer>
    )
}
