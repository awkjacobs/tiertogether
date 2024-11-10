import { Star } from "lucide-react"

export function BleachersIcon() {
    return (
        <div
            className={`w-10 h-10 md:w-20 md:h-20 flex flex-col gap-1 md:gap-2 p-2 md:p-4`}
        >
            <div className={`rounded-sm flex-1 bg-zinc-200 `}></div>
            <div className={`rounded-sm flex-[3] border border-zinc-400`}></div>
        </div>
    )
}
export function DugoutIcon() {
    return (
        <div
            className={`w-10 h-10 md:w-20 md:h-20 flex flex-col gap-1 md:gap-2 p-2 md:p-4`}
        >
            <div className={`rounded-sm flex-[3] border border-zinc-400`}></div>
            <div className={`rounded-sm flex-1 bg-zinc-200 `}></div>
        </div>
    )
}
export function SpecialIcon() {
    return (
        <div className={`w-10 h-10 md:w-20 md:h-20 flex p-2 md:p-4`}>
            <Star className={`text-zinc-200 h-6 w-6 md:h-12 md:w-12`} />
        </div>
    )
}
