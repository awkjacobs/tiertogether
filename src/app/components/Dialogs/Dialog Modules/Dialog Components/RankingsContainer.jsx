import { ScrollArea } from "@/app/components/ui/scroll-area"
import { RankGroup, RankOverall } from "@/components/Utility/RankGroup"
import RankChart from "@/app/components/Utility/RankingChart"
import { AppDataContext } from "@/app/components/_providers/appDataProvider"
import { useContext, useState } from "react"
import { ItemRankContext } from "@/app/components/_providers/itemRankProvider"
import { useGetServerAverages } from "@/app/hooks/use-get-serverAverage"
import { userRanksArray } from "../Dialog Functions/userRanksArray"

export default function RankingsContainer({ item }) {
    const appData = useContext(AppDataContext)
    const userRank = useContext(ItemRankContext)

    const { board } = appData

    const serverRanks = useGetServerAverages(board.id)

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
            className={`flex h-full flex-col overflow-hidden md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-4 md:h-72`}
        >
            <h4
                className={`pb-3 font-bold text-purple-800 dark:text-purple-400`}
            >
                BOARD RANKINGS
            </h4>
            <ScrollArea className={`pr-3`}>
                <div className={`space-y-2`}>
                    <RankChart ranks={ranks.userRanks} />
                    <RankOverall
                        averageRank={ranks.averageRank}
                        className={`border-b border-emerald-500 pb-2`}
                    />
                    <RankGroup rank={userRank} />

                    {boardRanksMinusUser.map((rank, index) => {
                        return <RankGroup key={index} rank={rank} />
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
