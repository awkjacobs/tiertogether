"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority"

import { cn } from "@lib/utils"

const toggleVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-zinc-100 hover:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 dark:ring-offset-zinc-950  dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:data-[state=on]:text-zinc-50 cursor-pointer data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-800",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline:
                    "border border-solid border-zinc-300 bg-transparent hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
            },
            size: {
                default: "h-10 px-3",
                sm: "h-9 px-2.5",
                lg: "h-11 px-5",
            },
            color: {
                default:
                    "data-[state=on]:bg-zinc-800 dark:data-[state=on]:bg-zinc-800 dark:hover:bg-zinc-800",
                purple: "data-[state=on]:bg-purple-600 data-[state=on]:text-purple-200 dark:data-[state=on]:bg-purple-800 hover:bg-purple-600/50 dark:hover:bg-purple-600/50",
                amber: "dark:data-[state=on]:bg-amber-800 hover:bg-amber-600/50 dark:hover:bg-amber-600/50",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

const Toggle = React.forwardRef(
    ({ className, variant, size, color, ...props }, ref) => (
        <TogglePrimitive.Root
            ref={ref}
            className={cn(toggleVariants({ variant, size, className, color }))}
            {...props}
        />
    ),
)

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
