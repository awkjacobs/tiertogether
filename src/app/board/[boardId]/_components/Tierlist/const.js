export const STYLE_SWITCH = (tier) => {
    const styles = {
        sRank: "sRank rounded-tl-lg",
        aRank: "bg-teal-500/20",
        bRank: "bg-green-500/20",
        cRank: "bg-yellow-500/20",
        dRank: "bg-orange-500/20",
        fRank: "bg-red-500/20",
        bleachers: "bg-zinc-600/10",
        dugout: "bg-zinc-600/10",
    }
    return styles[tier] || ""
}
