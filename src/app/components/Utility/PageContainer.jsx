import { GRID_TEMP_COLUMNS } from "@lib/const"
import { cn } from "@lib/utils"
import { SidebarProvider } from "@components/ui/sidebar"
import AppSidebar from "@components/Sidebar/AppSidebar"

export default function PageContainer({ children, className, appData }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <section
                className={cn(
                    `mx-auto my-0 h-[100svh] max-h-[100svh] w-full items-center justify-start bg-zinc-200 p-2 pb-0 dark:bg-zinc-950`,
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
            <AppSidebar appData={appData} />
        </SidebarProvider>
    )
}
