import { Equal } from "lucide-react"
import { DownTriangle, UpTriangle } from "../../Utility/Triangles"

export default function RankBadge({ difference }) {
    return (
        <div className={`absolute right-0 top-0 h-6 w-6 text-white`}>
            <div
                data-score={difference}
                className={`relative h-20 w-20 -translate-y-1/2 rotate-45 shadow-md data-[score="equals"]:bg-sky-500 data-[score="higher"]:bg-emerald-500 data-[score="lower"]:bg-rose-500`}
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
        </div>
    )
}
