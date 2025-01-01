import { GRID_TEMP_COLUMNS } from "@lib/const"
import { cn } from "@lib/utils"

export default function PageContainer({ children, className }) {
    return (
        <section
            className={cn(
                `mx-auto my-0 h-[100svh] max-h-[100svh] w-full items-center justify-start bg-surface-200 p-2 pb-0 dark:bg-surface-950`,
                className,
            )}
            style={{
                display: `grid`,
                gridTemplateColumns: GRID_TEMP_COLUMNS,
                gridTemplateRows: `min-content 1fr`,
            }}
        >
            {children}
        </section>
    )
}
