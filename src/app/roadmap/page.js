import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@app/components/Utility/PageContainer"
import TextBlock from "@app/components/Utility/TextBlock"
import { GRID_TEMP_COLUMNS } from "@lib/const"
import ROADMAP from "@content/ROADMAP.mdx"

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
                className={`z-0 col-span-full row-start-2 row-end-3 grid max-h-[calc(100svh-3.5rem)] grid-cols-subgrid overflow-x-clip overflow-y-scroll`}
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
                        <ROADMAP />
                    </TextBlock>
                </div>
            </main>
        </PageContainer>
    )
}
