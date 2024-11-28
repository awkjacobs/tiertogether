import DescriptionGroupSearch from "./DescriptionsGroupSearch"
import { convertDate } from "@/lib/utils"

export default function DescriptionDetailsSearch(props) {
    const { itemInfo } = props

    return (
        <div
            className={`grid flex-1 grid-cols-[auto_1fr] gap-2 rounded-md bg-black/50 p-2 text-xs outline outline-1 outline-zinc-900`}
        >
            {/* {itemInfo.release_date && (
                <DescriptionGroupSearch
                    section={"Release:"}
                    content={convertDate(itemInfo.release_date)}
                    loading={props.loading}
                />
            )} */}
            {itemInfo.first_air_date && (
                <DescriptionGroupSearch
                    section={"Air Dates:"}
                    content={
                        convertDate(itemInfo.first_air_date) +
                        " - " +
                        convertDate(itemInfo.last_air_date)
                    }
                    loading={props.loading}
                />
            )}
            {itemInfo.directors?.length > 0 && (
                <DescriptionGroupSearch
                    section={
                        itemInfo?.directors?.length > 1
                            ? "Directors:"
                            : "Director:"
                    }
                    content={itemInfo}
                    loading={props.loading}
                />
            )}
            {itemInfo.cast?.length > 0 && (
                <DescriptionGroupSearch
                    section={"Starring:"}
                    content={itemInfo}
                    loading={props.loading}
                />
            )}
            {itemInfo.seasons && (
                <DescriptionGroupSearch
                    section={"Length:"}
                    content={`
                        ${itemInfo.seasons.toString()} ${
                            itemInfo.seasons > 1 ? "Seasons / " : "Season / "
                        } ${itemInfo.episodes.toString()} Eps`}
                    loading={props.loading}
                />
            )}
            {itemInfo.status && (
                <DescriptionGroupSearch
                    section={"Status:"}
                    content={`
                        ${itemInfo.status}`}
                    loading={props.loading}
                />
            )}

            {itemInfo.release_date == "" &&
                itemInfo.directors?.length == 0 &&
                itemInfo.cast?.length == 0 && (
                    <p className={`col-start-1 col-end-3`}>
                        No details available
                    </p>
                )}
        </div>
    )
}
