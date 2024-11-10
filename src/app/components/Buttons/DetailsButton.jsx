import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../ui/button"

export default function DetailsButton({ isExpanded, handleDetails }) {
    return (
        <Button
            onClick={handleDetails}
            variant="ghost"
            size="sm"
            className={`text-purple-300`}
        >
            {isExpanded ? "Hide Details" : "Show Details"}
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
    )
}
