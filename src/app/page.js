import { PRISMA_GET_USER } from "@api/prismaFuncs"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"
import PageContainer from "@components/Utility/PageContainer"
import DotsBackground from "@components/Utility/dotsBackground"
import LandingPageContent from "./landing_page/landingPageContent"
// TODO - clean up the landing page

export default async function LandingPage() {
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
            {/* <DotsBackground /> */}
            <LandingPageContent />
        </PageContainer>
    )
}
