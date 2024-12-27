export default function CardTitle({ title }) {
    return (
        <h3
            className={`whitespace-break-spaces text-base font-bold md:h-32 md:text-2xl`}
        >
            {title}
        </h3>
    )
}
