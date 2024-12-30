"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@lib/utils"

const ResizablePanelGroup = ({ className, ...props }) => (
    <ResizablePrimitive.PanelGroup
        className={cn(
            "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
            className,
        )}
        {...props}
    />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({ withHandle, className, ...props }) => (
    <ResizablePrimitive.PanelResizeHandle
        className={cn(
            "relative flex w-px items-center justify-center bg-zinc-200 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 dark:bg-zinc-800 dark:focus-visible:ring-zinc-300 [&[data-panel-group-direction=vertical]>div]:rotate-90",
            className,
        )}
        {...props}
    >
        {withHandle && (
            <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
                <GripVertical className="h-2.5 w-2.5" />
            </div>
        )}
    </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
