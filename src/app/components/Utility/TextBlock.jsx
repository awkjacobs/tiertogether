import { cn } from "@lib/utils"

export default function TextBlock({ children, className }) {
    return (
        <div
            className={cn(
                `relative z-50 col-start-3 col-end-4 items-center justify-center gap-4 space-y-4 text-base leading-8 md:space-y-8 md:text-lg md:leading-9`,
                className,
            )}
        >
            {children}
        </div>
    )
}
