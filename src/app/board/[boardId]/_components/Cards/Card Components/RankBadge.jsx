import { Circle, Equal } from "lucide-react"
import { DownTriangle, UpTriangle } from "@components/Utility/Triangles"

export default function RankBadge({ difference }) {
    return (
        <div className={`absolute right-0 top-0 h-6 w-6 text-white`}>
            <div
                data-score={difference}
                className={`relative h-20 w-20 -translate-y-1/2 rotate-45 opacity-75 shadow-md data-[score="equals"]:bg-sky-500 data-[score="higher"]:bg-emerald-500 data-[score="lower"]:bg-rose-500 data-[score="u"]:bg-zinc-500`}
            />
            {difference === "higher" && (
                <UpTriangle fill="currentColor" className={`absolute top-0`} />
            )}
            {difference === "equals" && (
                <Equal fill="currentColor" className={`absolute top-0 p-1`} />
            )}
            {difference === "lower" && (
                <DownTriangle
                    fill="currentColor"
                    className={`absolute top-0`}
                />
            )}
            {difference === "u" && <Circle className={`absolute top-0 p-1`} />}
        </div>
    )
}
