import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@components/ui/resizable"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@components/ui/collapsible"
import { Button } from "@components/ui/button"

import AlertForm from "./AlertForm"
import AlertListItem from "./AlertListItem"
import { PRISMA_ADMIN_GET_ALERTS } from "@api/prismaFuncs"
import { ChevronsUpDown } from "lucide-react"

export default async function AdminPanel({ children }) {
    const alerts = await PRISMA_ADMIN_GET_ALERTS()
    return (
        <main
            className={`col-span-full row-start-2 row-end-3 h-full max-h-[calc(100svh-3.5rem)] py-2`}
        >
            <ResizablePanelGroup
                className="h-full w-full rounded-lg border border-zinc-800 dark:border-zinc-800"
                direction="horizontal"
            >
                <ResizablePanel
                    defaultSize={33}
                    className={`flex flex-col gap-6 p-6`}
                >
                    <h3 className="text-lg font-bold">Alerts</h3>
                    <Collapsible className="w-full">
                        <CollapsibleTrigger asChild>
                            <Button className={`w-full`} variant="ghost">
                                Create a new alert
                                <ChevronsUpDown className="ml-4 h-4 w-4" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent
                            className={`rounded-md border border-zinc-800`}
                        >
                            <AlertForm />
                        </CollapsibleContent>
                    </Collapsible>
                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 items-center justify-center space-y-2 overflow-y-scroll rounded-md border border-zinc-800 bg-zinc-900 p-2">
                            {alerts.map((alert) => (
                                <AlertListItem alert={alert} key={alert.id} />
                            ))}
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={67}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Two</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    )
}
