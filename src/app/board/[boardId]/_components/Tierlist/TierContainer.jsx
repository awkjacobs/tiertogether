import { AppDataContext } from "@/app/components/_providers/appDataProvider"
import { Tier } from "./Tier"
import { useContext } from "react"

export function TierContainer(props) {
    const appData = useContext(AppDataContext)
    return (
        <section
            className={`flex w-full flex-col gap-2 self-start md:gap-4 ${
                props.showServerRanks
                    ? "rounded-lg border-2 border-emerald-500"
                    : "border-2 border-transparent"
            }`}
        >
            {appData.board.bleachers && (
                <div>
                    <Tier
                        tier="bleachers"
                        label={appData.board.bleachersLabel}
                        entries={
                            props.showServerRanks
                                ? props.serverRanks.bleachers
                                : props.ranks.bleachers
                        }
                        {...props}
                    />
                </div>
            )}
            <div className={`flex flex-col gap-1`}>
                {appData.board.special && (
                    <Tier
                        tier="sRank"
                        label="S"
                        entries={
                            props.showServerRanks
                                ? props.serverRanks.sRank
                                : props.ranks.sRank
                        }
                        {...props}
                    />
                )}
                <Tier
                    tier="aRank"
                    label="A"
                    entries={
                        props.showServerRanks
                            ? props.serverRanks.aRank
                            : props.ranks.aRank
                    }
                    {...props}
                />
                <Tier
                    tier="bRank"
                    label="B"
                    entries={
                        props.showServerRanks
                            ? props.serverRanks.bRank
                            : props.ranks.bRank
                    }
                    {...props}
                />
                <Tier
                    tier="cRank"
                    label="C"
                    entries={
                        props.showServerRanks
                            ? props.serverRanks.cRank
                            : props.ranks.cRank
                    }
                    {...props}
                />
                <Tier
                    tier="dRank"
                    label="D"
                    entries={
                        props.showServerRanks
                            ? props.serverRanks.dRank
                            : props.ranks.dRank
                    }
                    {...props}
                />
                <Tier
                    tier="fRank"
                    label="F"
                    entries={
                        props.showServerRanks
                            ? props.serverRanks.fRank
                            : props.ranks.fRank
                    }
                    {...props}
                />
            </div>
            {appData.board.dugout && (
                <div>
                    <Tier
                        tier="dugout"
                        label={appData.board.dugoutLabel}
                        entries={
                            props.showServerRanks
                                ? props.serverRanks.dugout
                                : props.ranks.dugout
                        }
                        {...props}
                    />
                </div>
            )}
        </section>
    )
}
