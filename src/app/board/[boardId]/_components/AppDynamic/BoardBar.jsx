import EditBoardButton from "@/components/Buttons/EditBoardButton"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import RankingsToggle from "./RankingsToggle"

export default function BoardBar({
    title,
    showServerRanks,
    setShowServerRanks,
    queueIsOpen,
    setQueueIsOpen,
    board,
    appData,
}) {
    const isOwner = appData.user.id === appData.board.owner.id

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentCardSize = searchParams.get("cardSize")
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    const handleZoomIn = () => {
        switch (currentCardSize) {
            case "2":
                router.push(pathname + "?" + createQueryString("cardSize", "3"))
                break
            default:
                router.push(pathname + "?" + createQueryString("cardSize", "2"))
                break
        }
    }
    const handleZoomOut = () => {
        switch (currentCardSize) {
            case "2":
                router.push(pathname + "?" + createQueryString("cardSize", "1"))
                break
            case "3":
                router.push(pathname + "?" + createQueryString("cardSize", "2"))
                break
            default:
                break
        }
    }

    return (
        <div className={`my-2 flex h-10 w-full items-center justify-end`}>
            <h1
                className={`flex-1 text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
            >
                {title}
            </h1>
            <div className={`flex flex-row gap-1 px-1 md:gap-2 md:px-2`}>
                <Button
                    variant="outline"
                    className={`h-8 w-8 px-2 md:h-10 md:w-10`}
                    onClick={handleZoomIn}
                    disabled={currentCardSize === "3"}
                >
                    <ZoomIn className={`h-4 w-4`} />
                </Button>
                <Button
                    variant="outline"
                    className={`h-8 w-8 px-2 md:h-10 md:w-10`}
                    onClick={handleZoomOut}
                    disabled={
                        currentCardSize === "1" || currentCardSize === null
                    }
                >
                    <ZoomOut className={`h-4 w-4`} />
                </Button>
            </div>
            <RankingsToggle
                showServerRanks={showServerRanks}
                setShowServerRanks={setShowServerRanks}
                queueIsOpen={queueIsOpen}
                setQueueIsOpen={setQueueIsOpen}
            />
            <EditBoardButton
                triggerClasses={`ml-1 cursor-pointer`}
                appData={appData}
                board={board}
                isOwner={isOwner}
            />
        </div>
    )
}
