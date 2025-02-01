import AddDialogContent from "./AddDialogContent"
import { Plus } from "lucide-react"
import { useMediaQuery } from "@app/hooks/use-media-query"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"

export default function AddButton() {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                size={isDesktop ? "" : "icon"}
                                variant={"ghost"}
                                className={`z-10 bg-emerald-500 hover:bg-emerald-400 md:h-12 dark:bg-emerald-500 hover:dark:bg-emerald-400`}
                            >
                                <Plus className={`h-4 w-4 text-white`} />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Add a New Title</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent
                className={
                    "top-[2.5%] flex max-h-[95vh] max-w-screen-lg translate-y-0 flex-col overflow-hidden md:max-w-screen-md"
                }
            >
                <DialogHeader>
                    <DialogTitle>Add a New Title</DialogTitle>
                    <VisuallyHidden.Root>
                        <DialogDescription>{`Add a New Title`}</DialogDescription>
                    </VisuallyHidden.Root>
                </DialogHeader>
                <AddDialogContent />
            </DialogContent>
        </Dialog>
    )
}
