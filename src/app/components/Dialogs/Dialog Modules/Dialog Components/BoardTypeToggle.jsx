import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Clapperboard, Tv } from "lucide-react"
import AnimeCross from "@/components/Utility/animeCross"

export default function BoardTypeToggle({ setBoardType, className }) {
    return (
        <div className={className}>
            <Label
                htmlFor="toggleGroup"
                className={`text-purple-800 dark:text-purple-400`}
            >
                Board Type
            </Label>
            <ToggleGroup
                id="toggleGroup"
                type="single"
                variant="outline"
                groupColor="purple"
                className={`items-start justify-start py-2`}
                onValueChange={(value) => {
                    setBoardType(value)
                }}
            >
                <ToggleGroupItem
                    value="movie"
                    className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                >
                    <Clapperboard className={`mr-4`} />
                    Movie
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="tv"
                    className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                >
                    <Tv className={`mr-4`} />
                    TV
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="anime"
                    className={`flex-1 hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                >
                    <AnimeCross className={`mr-4 h-6 w-6`} />
                    Anime
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
