import RankChart from "./RankingChart"
import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { LoadingSpinner } from "@app/components/ui/LoadingSpinner"
import { ScrollArea } from "@app/components/ui/scroll-area"
import { useGetServerAverages } from "@app/hooks/use-get-serverAverage"
import { RankGroup, RankOverall } from "@components/Utility/RankGroup"
import { useContext } from "react"
import { userRanksArray } from "./userRanksArray"

export default function RankingsContainer({ item }) {
    const { appData } = useContext(AppDataContext)
    const userRank = {
        boardId: appData.board.id,
        id: appData.user.id,
        itemsId: item.id,
        name: appData.user.name,
        rank: item.rank.find((rank) => rank.userId === appData.user.id).rank,
        userId: appData.user.id,
    }

    const serverRanks = useGetServerAverages(appData.board.id)

    if (serverRanks.isLoading) return <p>Loading...</p>

    const ranks = {
        averageRank: serverRanks.data.allItems.find(
            (rank) => rank.id === item.id,
        )?.averageRank,
        userRanks: userRanksArray(item, userRank, appData),
    }

    const boardRanksMinusUser = ranks.userRanks
        .filter((rank) => rank.id !== appData.user.id)
        .toSorted((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

    return (
        <div
            className={`row-span-full flex h-full flex-col overflow-clip rounded p-4 md:h-full md:min-w-72 md:border md:border-zinc-300 md:bg-zinc-200/90 md:dark:border-zinc-800 md:dark:bg-zinc-900/90`}
        >
            <h4
                className={`pb-3 text-center font-bold text-purple-800 dark:text-purple-400`}
            >
                BOARD RANKINGS
            </h4>
            {!ranks?.averageRank && (
                <LoadingSpinner
                    size={96}
                    className={`mx-auto text-purple-500`}
                />
            )}
            {ranks?.averageRank && (
                <ScrollArea className={`pr-3`}>
                    <div className={`space-y-2`}>
                        <RankChart ranks={ranks.userRanks} />
                        <RankOverall
                            averageRank={ranks?.averageRank}
                            className={`border-b border-emerald-500 pb-2`}
                        />
                        <RankGroup rank={userRank} />

                        {boardRanksMinusUser.map((rank, index) => {
                            return <RankGroup key={index} rank={rank} />
                        })}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}
