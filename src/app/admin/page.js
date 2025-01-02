import AdminPanel from "./_components/AdminPanel"
import { PRISMA_GET_USER } from "@api/prismaFuncs"
import PageContainer from "@app/components/Utility/PageContainer"
import { auth } from "@clerk/nextjs/server"
import AppBar from "@components/AppBar/AppBar"

export const metadata = {
    title: "Admin | tiertogether",
    description: "tiertogether Admin Page.",
}
export default async function AdminPage() {
    const { userId } = await auth()
    const userDB = await PRISMA_GET_USER(userId)

    const appData = {
        user: userDB,
    }

    return (
        <PageContainer>
            <AppBar appData={appData} />
            <AdminPanel />
        </PageContainer>
    )
}
