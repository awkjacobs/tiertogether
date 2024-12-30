"use client"

import LogoTriangles from "@components/Utility/LogoTriangles"
import LogoTrianglesBW from "@components/Utility/LogoTrianglesBW"
import GithubIcon from "@components/Utility/github"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu"
import { SquareChartGantt } from "lucide-react"
import Link from "next/link"

export default function LogoButton() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={`bg-transparent dark:bg-transparent`}
                    >
                        <div
                            className={`flex h-full flex-row items-center gap-2`}
                        >
                            <LogoTriangles className={`h-full w-auto`} />
                            <h1
                                className={`text-base font-medium text-purple-500 dark:text-purple-200`}
                            >
                                tier
                                <span
                                    className={`text-purple-800 dark:text-purple-500`}
                                >
                                    together
                                </span>
                            </h1>
                        </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={`p-2`}>
                        <Link href={`/`} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <LogoTrianglesBW className={`mr-2 h-6 w-6`} />
                                Landing Page
                            </NavigationMenuLink>
                        </Link>
                        <Link href={`/`} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <SquareChartGantt className={`mr-2 h-5 w-5`} />
                                Changelog/Roadmap
                            </NavigationMenuLink>
                        </Link>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            asChild
                        >
                            <a
                                href={`https://github.com/awkjacobs/tiertogether`}
                                target="_blank"
                            >
                                <GithubIcon className={`mr-2 h-5 w-5`} />
                                github
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
