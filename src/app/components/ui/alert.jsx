import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@lib/utils"
import { X } from "lucide-react"
import { Button } from "./button"

const alertVariants = cva(
    "relative w-full rounded-lg border border-zinc-200 p-4 [&>svg~*]:pl-7 [&>button>svg~*]:pl-0 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-950 dark:border-zinc-800 dark:[&>svg]:text-zinc-50",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
                destructive:
                    "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            "mb-1 pr-24 font-medium leading-none tracking-tight",
            className,
        )}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("pr-24 text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

const AlertClose = React.forwardRef(({ className, onClick, ...props }, ref) => (
    <Button
        onClick={onClick}
        ref={ref}
        className={cn("absolute right-4 top-4 px-7", className)}
        {...props}
    >
        <X className="h-4 w-4" />
    </Button>
))
AlertClose.displayName = "AlertClose"

export { Alert, AlertTitle, AlertDescription, AlertClose }
