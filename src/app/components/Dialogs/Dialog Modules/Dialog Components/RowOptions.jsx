import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ToggleButton from "../../../ui/ToggleButton"
import {
    BleachersIcon,
    DugoutIcon,
    SpecialIcon,
} from "../../../Utility/ExtraRowIcons"
import InputWithLabel from "@/app/components/Dialogs/Dialog Modules/Dialog Components/InputWithLabel"
import { cn } from "@/lib/utils"
import {
    InfoTooltip,
    InfoPopover,
    ExtraRowTooltip,
    SpecialThresholdTooltip,
} from "./RowTooltips"

export default function RowOptions({
    rowOptions,
    setRowOptions,
    isDesktop,
    isOwner,
    className,
}) {
    function handleOptionsChange(value) {
        let updatedOptions = { ...rowOptions }

        if (value.includes("Special")) updatedOptions.special = true
        else updatedOptions.special = false

        if (value.includes("Bleachers")) updatedOptions.bleachers = true
        else updatedOptions.bleachers = false

        if (value.includes("Dugout")) updatedOptions.dugout = true
        else updatedOptions.dugout = false

        setRowOptions(updatedOptions)
    }
    function handleThresholdChange(value) {
        setRowOptions({
            ...rowOptions,
            specialThreshold: value ? value : false,
        })
    }
    function handleBleacherChange(e) {
        setRowOptions({
            ...rowOptions,
            bleachersLabel: e.target.value,
        })
    }
    function handleDugoutChange(e) {
        setRowOptions({
            ...rowOptions,
            dugoutLabel: e.target.value,
        })
    }

    const boardRowOptions = () => {
        let options = []
        if (rowOptions?.special) options.push("Special")
        if (rowOptions?.bleachers) options.push("Bleachers")
        if (rowOptions?.dugout) options.push("Dugout")
        return options
    }

    return (
        <div
            className={cn(
                `row-start-2 row-end-3 md:col-span-1 md:col-start-1 md:min-w-96`,
                className,
            )}
        >
            <Label
                htmlFor="extraRows"
                className={`flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
            >
                Tier Options
                {isDesktop && (
                    <InfoTooltip
                        side={"right"}
                        component={<ExtraRowTooltip />}
                    />
                )}
                {!isDesktop && <InfoPopover component={<ExtraRowTooltip />} />}
            </Label>
            <ToggleGroup
                type="multiple"
                variant="outline"
                id="extraRows"
                groupColor="purple"
                className={`mt-2`}
                disabled={!isOwner}
                value={boardRowOptions()}
                onValueChange={(value) => handleOptionsChange(value)}
            >
                <ToggleButton
                    value={"Special"}
                    icon={<SpecialIcon />}
                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                />
                <ToggleButton
                    value={"Bleachers"}
                    icon={<BleachersIcon />}
                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                />
                <ToggleButton
                    value={"Dugout"}
                    icon={<DugoutIcon />}
                    className={`hover:bg-purple-600/50 dark:hover:bg-purple-600/50`}
                />
            </ToggleGroup>
            {rowOptions.special && (
                <>
                    <Label
                        htmlFor="specialThreshold"
                        className={`mb-2 mt-4 flex flex-row gap-4 text-purple-800 dark:text-purple-400`}
                    >
                        Special Threshold
                        {isDesktop && (
                            <InfoTooltip
                                side={"top"}
                                component={<SpecialThresholdTooltip />}
                            />
                        )}
                        {!isDesktop && (
                            <InfoPopover
                                component={<SpecialThresholdTooltip />}
                            />
                        )}
                    </Label>

                    <ToggleGroup
                        type="single"
                        variant="outline"
                        groupColor="purple"
                        id="specialThreshold"
                        className={`mt-2`}
                        disabled={!rowOptions.special}
                        value={rowOptions.specialThreshold}
                        onValueChange={(value) => handleThresholdChange(value)}
                    >
                        <ToggleGroupItem value={50} className={`flex-1`}>
                            50%
                        </ToggleGroupItem>
                        <ToggleGroupItem value={75} className={`flex-1`}>
                            75%
                        </ToggleGroupItem>
                        <ToggleGroupItem value={100} className={`flex-1`}>
                            100%
                        </ToggleGroupItem>
                    </ToggleGroup>
                </>
            )}
            {rowOptions.bleachers && (
                <InputWithLabel
                    label={"Bleachers Label"}
                    placeholder={rowOptions.bleachersLabel}
                    onChange={handleBleacherChange}
                    isOwner={isOwner}
                    className={`mt-4`}
                />
            )}
            {rowOptions.dugout && (
                <InputWithLabel
                    label={"Dugout Label"}
                    placeholder={rowOptions.dugoutLabel}
                    onChange={handleDugoutChange}
                    isOwner={isOwner}
                    className={`mt-4`}
                />
            )}
        </div>
    )
}
