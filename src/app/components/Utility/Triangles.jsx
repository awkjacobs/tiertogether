export function UpTriangle({ className, fill }) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill={fill}
        >
            <polygon points="12 5 5.07 17 18.93 17 12 5" />
        </svg>
    )
}
export function DownTriangle({ className, fill }) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill={fill}
        >
            <polygon points="12 19 18.93 7 5.07 7 12 19" />
        </svg>
    )
}
