import { cn } from "@lib/utils"

export default function CardTitle({ title, className }) {
    return (
        <h3
            className={cn(
                `whitespace-break-spaces text-base font-bold md:h-32 md:text-2xl`,
                className,
            )}
        >
            {title}
        </h3>
    )
}
