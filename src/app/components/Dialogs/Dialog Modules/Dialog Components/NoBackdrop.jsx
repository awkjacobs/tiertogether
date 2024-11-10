export default function NoBackdrop() {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: 250,
                zIndex: -1,
                backgroundImage: `linear-gradient(to bottom, rgb(var(--surface800) / 100%), rgb(var(--surface900)/ 100%))`,
            }}
            className={`w-full h-64 -z-20 absolute bg-gradient-to-b from-surface-800/60 to-surface-900/70`}
        ></div>
    )
}
