import Backdrop from "@app/components/ui/backdrop"
import { Skeleton } from "@app/components/ui/skeleton"
import { useGetCollectionQuery } from "@app/hooks/use-get-fetch-query"
import InfoCard from "../Cards/InfoCard"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@app/components/ui/tooltip"

export default function Collection({ collection }) {
    const items = useGetCollectionQuery(collection.id)

    if (items.isLoading) return <Skeleton className={`h-48 w-full`} />
    return (
        <div
            className={`relative mt-4 flex min-h-48 w-full flex-col justify-center gap-2 overflow-auto rounded-md p-4`}
        >
            <Backdrop backdrop={collection.backdrop_path} fill={true} />
            <h3 className="text-center text-lg font-bold">{collection.name}</h3>

            <div className="flex flex-row flex-wrap justify-center gap-2">
                {items.data.parts.map((part) => (
                    <InfoCard
                        key={part.id}
                        item={part}
                        itemType={part.media_type}
                        size={{ height: 256, width: 170 }}
                        searchOrCollection="collection"
                    />
                ))}
            </div>
        </div>
    )
}
