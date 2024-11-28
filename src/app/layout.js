import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import QueryProvider from "./providers/QueryProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Head from "next/head"

export const metadata = {
    title: "tiertogether",
    description: "Rank media together.",
}

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
                <body>
                    <QueryProvider>
                        <ReactQueryDevtools />
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </QueryProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
