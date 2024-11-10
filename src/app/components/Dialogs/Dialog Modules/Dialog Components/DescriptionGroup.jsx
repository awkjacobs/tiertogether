export default function DescriptionGroup({ content, section }) {
    if (section === "Starring:")
        return (
            <div className={`col-start-1 col-end-3 grid grid-cols-subgrid`}>
                <p className={`col-start-1 pr-2 opacity-60`}>{section}</p>
                <p className={`col-start-2`}>{content}</p>
            </div>
        )

    return (
        <div className={`col-start-1 col-end-3 grid grid-cols-subgrid`}>
            <p className={`col-start-1 pr-2 opacity-60`}>{section}</p>
            <p className={`col-start-2 line-clamp-1`}>{content}</p>
        </div>
    )
}
