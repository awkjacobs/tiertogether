"use client"
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@lib/utils"
import { toggleVariants } from "src/app/components/ui/toggle"

const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
})

const ToggleGroup = React.forwardRef(
    ({ className, variant, size, groupColor, children, ...props }, ref) => (
        <ToggleGroupPrimitive.Root
            ref={ref}
            className={cn("flex items-center justify-center gap-1", className)}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ variant, size, groupColor }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    ),
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(
    ({ className, children, variant, size, color, ...props }, ref) => {
        const context = React.useContext(ToggleGroupContext)

        return (
            <ToggleGroupPrimitive.Item
                ref={ref}
                className={cn(
                    toggleVariants({
                        variant: context.variant || variant,
                        size: context.size || size,
                        color: context.groupColor || color,
                    }),
                    className,
                )}
                {...props}
            >
                {children}
            </ToggleGroupPrimitive.Item>
        )
    },
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
