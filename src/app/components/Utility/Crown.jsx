export default function Crown({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            className={className}
        >
            <defs>
                <linearGradient id="goldGradient">
                    <stop offset="5%" stopColor="#fedb37" />
                    <stop offset="35%" stopColor="#fdb931" />
                    <stop offset="65%" stopColor="#9f7928" />
                    <stop offset="95%" stopColor="#8a6e2f" />
                </linearGradient>
            </defs>
            <path
                fill="url(#goldGradient)"
                d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"
            />
        </svg>
    )
}
