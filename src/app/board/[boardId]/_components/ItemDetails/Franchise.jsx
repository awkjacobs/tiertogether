import Backdrop from "@app/components/ui/backdrop"
import { Skeleton } from "@app/components/ui/skeleton"
import { useGetFranchiseQuery } from "@app/hooks/use-get-fetch-query"
import InfoCard from "../Cards/InfoCard"

export default function Franchise({ franchise }) {
    const items = useGetFranchiseQuery(franchise.id)

    if (items.isLoading) return <Skeleton className={`h-48 w-full`} />
    return (
        <div
            className={`relative mt-4 flex min-h-48 w-full flex-col justify-center gap-2 overflow-auto rounded-md`}
        >
            <Backdrop backdrop={null} fill={true} />

            <h3 className="text-center text-lg font-bold">
                {franchise.name} Franchise Games
            </h3>

            <div className="flex flex-row flex-wrap justify-center gap-2">
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
