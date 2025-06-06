import "./globals.css"
import { Toaster } from "@components/ui/sonner"
import { ThemeProvider } from "@components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import QueryProvider from "./providers/QueryProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Head from "next/head"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactScan } from "./components/scan/ReactScan"
import { JotaiProvider } from "./providers/jotai-provider"

export const metadata = {
    title: "tiertogether",
    description: "Rank media together.",
}

/**
 * Defines the root layout for the application, setting up global providers, theming, and metadata.
 *
 * Wraps the app with authentication, state management, data fetching, theme, and notification providers, and sets up HTML metadata for SEO and social sharing.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to render within the layout.
 */
export default function RootLayout({ children }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                elements: {
                    socialButtonsIconButton: "w-auto",
                    formButtonPrimary: "w-auto",
                },
            }}
        >
            <html lang="en" suppressHydrationWarning>
                <Head>
                    <title>tiertogether</title>
                    <meta name="description" content="Rank media together." />
                    <meta
                        property="og:title"
                        content="tiertogether"
                        key="title"
                    />
                </Head>
                <ReactScan />
                <body>
                    <JotaiProvider>
                        <QueryProvider>
                            <ReactQueryDevtools />
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <NuqsAdapter>{children}</NuqsAdapter>
                                <Toaster />
                            </ThemeProvider>
                        </QueryProvider>
                    </JotaiProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
