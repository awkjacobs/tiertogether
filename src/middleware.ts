import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/home", "/board/(.*)"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(
    async (auth, req) => {
        const { userId, redirectToSignIn } = await auth()
        console.log(isProtectedRoute(req))
        if (!userId && isProtectedRoute(req)) {
            return redirectToSignIn()
        }

        if (
            isAdminRoute(req) &&
            (await auth()).sessionClaims?.metadata?.role !== "admin"
        ) {
            const url = new URL("/", req.url)
            return NextResponse.redirect(url)
        }
    },
    { debug: process.env.NODE_ENV === 'development' },
)

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
