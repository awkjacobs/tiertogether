import H3 from "../components/Utility/H3"

export default function ChangelogItem({ changelogItem }) {
    const { version, date, description, added, changed, fixed } = changelogItem
    return (
        <div className={`flex flex-col gap-4 py-8 first:pt-0 last:pb-0`}>
            <H3 className={`text-purple-500`}>
                {version} - {date}
            </H3>
            <p>{description}</p>
            {added.length > 0 && (
                <div>
                    <h4 className={`font-bold`}>Added</h4>
                    <ul className={`list-inside list-disc pl-4`}>
                        {added.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
            {changed.length > 0 && (
                <div>
                    <h4 className={`font-bold`}>Changed</h4>
                    <ul className={`list-inside list-disc pl-4`}>
                        {changed.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
            {fixed.length > 0 && (
                <div>
                    <h4 className={`font-bold`}>Fixed</h4>
                    <ul className={`list-inside list-disc pl-4`}>
                        {fixed.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
