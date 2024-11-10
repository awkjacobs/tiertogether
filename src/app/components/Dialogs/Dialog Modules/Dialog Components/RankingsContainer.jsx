import { ScrollArea } from "@/app/components/ui/scroll-area"
import { RankGroup, RankOverall } from "@/components/Utility/RankGroup"

export default function RankingsContainer({ ranks, appData }) {
    const boardRanksMinusUser = ranks.userRanks
        .filter((rank) => rank.id !== appData.user.id)
        .toSorted((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

    const userRank = ranks.userRanks.filter(
        (rank) => rank.id === appData.user.id,
    )

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
                    <RankOverall
                        averageRank={ranks.averageRank}
                        appData={appData}
                        className={`border-b border-emerald-500 pb-2`}
                    />
                    <RankGroup rank={userRank[0]} appData={appData} />

                    {boardRanksMinusUser.map((rank, index) => {
                        return (
                            <RankGroup
                                key={index}
                                rank={rank}
                                appData={appData}
                            />
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
