import { ToggleGroupItem } from "@components/ui/toggle-group"

export default function ToggleButton({ value, icon, className }) {
    return (
        <ToggleGroupItem
            className={`h-fit flex-1 flex-col p-2 ${className}`}
            value={value}
        >
            {value}
            {icon}
        </ToggleGroupItem>
    )
}
