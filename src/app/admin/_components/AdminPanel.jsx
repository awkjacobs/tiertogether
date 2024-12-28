import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@components/ui/resizable"
import AlertForm from "./AlertForm"

export default function AdminPanel({ children }) {
    return (
        <section className={`col-span-full row-start-2 row-end-3 h-full p-2`}>
            <ResizablePanelGroup
                className="h-full w-full rounded-lg border border-zinc-800 dark:border-zinc-800"
                direction="horizontal"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex items-center justify-center p-6">
                        <AlertForm />
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
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
        </section>
    )
}
