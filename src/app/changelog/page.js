import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@components/Utility/PageContainer"
import TextBlock from "@components/Utility/TextBlock"
import { GRID_TEMP_COLUMNS } from "@lib/const"
import CHANGELOG from "../../../CHANGELOG.mdx"

export async function generateMetadata() {
    return {
        title: `Change Log | tiertogether`,
    }
}

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
                    className={`relative col-span-full grid grid-cols-subgrid grid-rows-subgrid items-start justify-center py-8 md:py-32`}
                >
                    <TextBlock>
                        <CHANGELOG />
                    </TextBlock>
                </div>
            </main>
        </PageContainer>
    )
}
