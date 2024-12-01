import { Info } from "lucide-react"
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

export function InfoTooltip({ side, component }) {
    return (
        <TooltipProvider open={true}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className={`h-4 w-4`} />
                </TooltipTrigger>
                <TooltipContent side={side} className={`w-80 p-6`} open={true}>
                    {component}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export function InfoPopover({ side, component }) {
    return (
        <Popover>
            <PopoverTrigger>
                <Info className={`h-4 w-4`} />
            </PopoverTrigger>
            <PopoverContent side={side} className={`m-2 w-[95svw] p-6`}>
                {component}
            </PopoverContent>
        </Popover>
    )
}

export function ExtraRowTooltip() {
    return (
        <div className={`flex flex-col gap-3 text-sm`}>
            <h6 className={`font-bold text-purple-800 dark:text-purple-400`}>
                Special
            </h6>
            <p className={`font-normal`}>
                The best of the best. A tier at the top of the rankings.
            </p>
            <h6
                className={`mt-2 font-bold text-purple-800 dark:text-purple-400`}
            >
                Bleachers
            </h6>
            <p className={`font-normal`}>
                An unranked tier that floats above the main rankings.
            </p>
            <h6
                className={`mt-2 font-bold text-purple-800 dark:text-purple-400`}
            >
                Dugout
            </h6>
            <p className={`font-normal`}>
                An unranked tier that floats below the main rankings.
            </p>
        </div>
    )
}
