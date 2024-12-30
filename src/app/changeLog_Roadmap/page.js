import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@components/Utility/PageContainer"
import Roadmap from "./roadmap"
import Changelog from "./changeLog"

export async function generateMetadata() {
    return {
        title: `Change Log/Roadmap | tiertogether`,
    }
}

export default async function ChangeLogRoadmapPage() {
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
                    <Roadmap />
                    <Changelog />
                </section>
            </main>
        </PageContainer>
    )
}
