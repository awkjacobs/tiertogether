export default function Spacing({ size, vertical, horizontal }) {
    return (
        <div
            style={{
                height: vertical ? size : "auto",
                width: horizontal ? size : "auto",
            }}
        ></div>
    )
}
