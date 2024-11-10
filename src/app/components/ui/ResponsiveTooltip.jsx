import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useMediaQuery } from "@/app/hooks/use-media-query"

export default function ResponsiveTooltip({ trigger, content, side, classes }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop)
        return (
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                    <TooltipContent side={side} className={classes}>
                        {content}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    if (!isDesktop)
        return (
            <Popover>
                <PopoverTrigger>{trigger}</PopoverTrigger>
                <PopoverContent side={side} className={classes}>
                    {content}
                </PopoverContent>
            </Popover>
        )
}
