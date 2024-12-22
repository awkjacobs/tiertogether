import { Skeleton } from "@components/ui/skeleton"
import { useEffect, useState } from "react"

export default function DescriptionGroupSearch(props) {
    const [descriptionContent, setDescriptionContent] = useState("")
    //! revisit, not sure why i used useEffect
    useEffect(() => {
        if (typeof props.content == "string")
            setDescriptionContent(props.content)
        if (!props.content?.cast && !props.content?.directors) return
        if (typeof props.content == "object") {
            if (props.section == "Starring:")
                setDescriptionContent(
                    props.content?.cast.length > 1
                        ? props.content?.cast.join(", ")
                        : props.content?.cast,
                )
            else
                setDescriptionContent(
                    props.content?.directors.length > 1
                        ? props.content?.directors.join(", ")
                        : props.content?.directors,
                )
        }
    }, [props.loading])

    return (
        <div className={`col-start-1 col-end-3 grid grid-cols-subgrid`}>
            <p className={`col-start-1 pr-2 opacity-60`}>{props.section}</p>
            {props.loading ? (
                <Skeleton className={`h-4`} />
            ) : (
                <p className={`col-start-2 line-clamp-1`}>
                    {descriptionContent}
                </p>
            )}
        </div>
    )
}
