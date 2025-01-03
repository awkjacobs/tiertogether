import Backdrop from "@app/components/ui/backdrop"
import { Skeleton } from "@app/components/ui/skeleton"
import { useGetFranchiseQuery } from "@app/hooks/use-get-fetch-query"
import InfoCard from "../Cards/InfoCard"

export default function Franchise({ franchise }) {
    const items = useGetFranchiseQuery(franchise.id)

    if (items.isLoading) return <Skeleton className={`h-48 w-full`} />
    return (
        <div
            className={`relative flex h-auto min-h-48 w-full flex-1 flex-col justify-center gap-2 rounded-md bg-zinc-200 p-4 dark:bg-zinc-900`}
        >
            <h3 className="text-center text-lg font-bold">
                {franchise.name} Franchise Games
            </h3>

            <div className="flex h-auto flex-row flex-wrap justify-center gap-2">
                {items.data.games.map((game) => (
                    <InfoCard
                        key={game.id}
                        item={game}
                        itemType={"videoGame"}
                        size={{ height: 256, width: 170 }}
                        searchOrCollection="collection"
                    />
                ))}
            </div>
        </div>
    )
}
