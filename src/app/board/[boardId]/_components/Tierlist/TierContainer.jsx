import { AppDataContext } from "@app/components/_providers/appDataProvider"
import { Tier } from "./Tier"
import { useContext } from "react"
import { useGetServerAverages } from "@app/hooks/use-get-serverAverage"

export function TierContainer(props) {
    const { appData, userEntries } = useContext(AppDataContext)
    const serverRanks = useGetServerAverages(appData.board.id)
    const { board } = appData
    const tierLabels = JSON.parse(board.tierLabels)

    const showServerRanks = userEntries === "overall"

    return (
        <section className={`flex w-full flex-col gap-2 self-start md:gap-4`}>
            {board.bleachers && (
                <div>
                    <Tier
                        tier="bleachers"
                        label={board.bleachersLabel}
                        entries={
                            showServerRanks && serverRanks.data
                                ? serverRanks.data.bleachers
                                : props.ranks.bleachers
                        }
                        {...props}
                    />
                </div>
            )}
            <div className={`flex flex-col gap-1`}>
                {board.special && (
                    <Tier
                        tier="sRank"
                        label={tierLabels[0]}
                        entries={
                            showServerRanks && serverRanks.data
                                ? serverRanks.data.sRank
                                : props.ranks.sRank
                        }
                        {...props}
                    />
                )}
                <Tier
                    tier="aRank"
                    label={tierLabels[1]}
                    entries={
                        showServerRanks && serverRanks.data
                            ? serverRanks.data.aRank
                            : props.ranks.aRank
                    }
                    {...props}
                />
                <Tier
                    tier="bRank"
                    label={tierLabels[2]}
                    entries={
                        showServerRanks && serverRanks.data
                            ? serverRanks.data.bRank
                            : props.ranks.bRank
                    }
                    {...props}
                />
                <Tier
                    tier="cRank"
                    label={tierLabels[3]}
                    entries={
                        showServerRanks && serverRanks.data
                            ? serverRanks.data.cRank
                            : props.ranks.cRank
                    }
                    {...props}
                />
                <Tier
                    tier="dRank"
                    label={tierLabels[4]}
                    entries={
                        showServerRanks && serverRanks.data
                            ? serverRanks.data.dRank
                            : props.ranks.dRank
                    }
                    {...props}
                />
                <Tier
                    tier="fRank"
                    label={tierLabels[5]}
                    entries={
                        showServerRanks && serverRanks.data
                            ? serverRanks.data.fRank
                            : props.ranks.fRank
                    }
                    {...props}
                />
            </div>
            {board.dugout && (
                <div>
                    <Tier
                        tier="dugout"
                        label={board.dugoutLabel}
                        entries={
                            showServerRanks && serverRanks.data
                                ? serverRanks.data.dugout
                                : props.ranks.dugout
                        }
                        {...props}
                    />
                </div>
            )}
        </section>
    )
}
