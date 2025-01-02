import { useMediaQuery } from "@app/hooks/use-media-query"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { Button } from "./button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer"

export function ResponsiveDialog({
    title,
    trigger,
    triggerSize,
    triggerVariant,
    triggerClasses,
    dialogFit,
    dialogClasses,
    component,
    description,
    hideDescription,
    footer,
    tooltip,
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button
                                    size={triggerSize}
                                    variant={
                                        triggerVariant
                                            ? triggerVariant
                                            : "ghost"
                                    }
                                    className={
                                        triggerClasses
                                            ? `${triggerClasses}`
                                            : ""
                                    }
                                >
                                    {trigger}
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>{tooltip}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DialogContent
                    onOpenAutoFocus={(event) => {
                        event.preventDefault()
                    }}
                    className={`${
                        dialogFit
                            ? "max-w-fit"
                            : "flex max-w-screen-lg flex-col overflow-hidden"
                    } ${dialogClasses}`}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {hideDescription && (
                            <VisuallyHidden.Root>
                                <DialogDescription>{`${title} Information`}</DialogDescription>
                            </VisuallyHidden.Root>
                        )}
                        {!hideDescription && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {component}
                    <DialogFooter>{footer}</DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    if (!isDesktop) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        size={triggerSize}
                        variant={triggerVariant ? triggerVariant : "ghost"}
                        className={triggerClasses}
                    >
                        {trigger}
                    </Button>
                </DrawerTrigger>
                <DrawerContent
                    className={`fixed bottom-0 h-[100svh] max-h-[100svh]`}
                >
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{title}</DrawerTitle>
                        {hideDescription && (
                            <VisuallyHidden.Root>
                                <DrawerDescription>{`${title} Information`}</DrawerDescription>
                            </VisuallyHidden.Root>
                        )}
                        {!hideDescription && (
                            <DrawerDescription>{`${title} Information`}</DrawerDescription>
                        )}
                    </DrawerHeader>
                    {component}
                    <DrawerFooter className="bottom-0 pt-2">
                        {footer}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
}
