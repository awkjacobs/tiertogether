import EditBoardButton from "@components/Buttons/EditBoardButton"
import { Button } from "@components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext } from "react"
import RankingsToggle from "./RankingsToggle"
import { AppDataContext } from "../../../../components/_providers/appDataProvider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Separator } from "@components/ui/separator"
import { useGetServerAverages } from "@app/hooks/use-get-serverAverage"
import BoardTypeIcon from "@app/components/Utility/BoardTypeIcons"

export default function BoardBar({ setUserEntries }) {
    const { appData } = useContext(AppDataContext)
    const serverRanks = useGetServerAverages(appData.board.id)
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
        <div
            className={`my-2 grid w-full grid-cols-[1fr,auto] grid-rows-[auto,auto] items-center gap-2 md:grid-cols-[1fr,auto,auto] md:grid-rows-[auto]`}
        >
            <div
                className={`col-start-1 row-start-1 flex flex-1 flex-row items-center gap-2 md:gap-4`}
            >
                <BoardTypeIcon type={appData.board.type} />
                <h1
                    className={`text-base font-bold text-purple-700 md:text-2xl dark:text-purple-200`}
                >
                    {appData.board.boardName}
                </h1>
            </div>
            <div
                className={`col-start-1 col-end-3 row-start-2 flex w-full flex-row items-center gap-2 md:col-start-2 md:col-end-3 md:row-start-1`}
            >
                <div className={`flex flex-row`}>
                    <Button
                        variant="outline"
                        className={`h-8 w-8 rounded-e-none px-2 md:h-10 md:w-10`}
                        onClick={handleZoomIn}
                        disabled={currentCardSize === "3"}
                    >
                        <ZoomIn className={`h-4 w-4`} />
                    </Button>
                    <Button
                        variant="outline"
                        className={`h-8 w-8 rounded-s-none px-2 md:h-10 md:w-10`}
                        onClick={handleZoomOut}
                        disabled={
                            currentCardSize === "1" || currentCardSize === null
                        }
                    >
                        <ZoomOut className={`h-4 w-4`} />
                    </Button>
                </div>
                <Select
                    defaultValue={appData.user.id}
                    onValueChange={(value) => setUserEntries(value)}
                    disabled={!serverRanks.data}
                >
                    <SelectTrigger className="h-8 flex-1 md:h-10 md:w-52">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="overall">Overall Ranks</SelectItem>
                        <SelectItem value={appData.user.id}>
                            My Ranks
                        </SelectItem>
                        <Separator />
                        {appData.board.users
                            .filter((user) => user.id !== appData.user.id)
                            .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <EditBoardButton
                triggerClasses={`cursor-pointer row-start-1 col-start-2 md:col-start-3`}
                appData={appData}
                board={appData.board}
                isOwner={isOwner}
            />
        </div>
    )
}
