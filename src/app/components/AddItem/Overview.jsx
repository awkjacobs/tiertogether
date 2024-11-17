import { Button } from "@/components/ui/button"
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog"
import SearchInfoContent from "./SearchInfoContent"
import { Check, Plus } from "lucide-react"

export default function Overview({
    isDesktop,
    item,
    type,
    queryType,
    alreadyIncluded,
    handleAdd,
    loading,
}) {
    return (
        <ResponsiveDialog
            trigger={"Details"}
            triggerSize={"sm"}
            triggerClasses={`text-purple-200 ${isDesktop ? "" : "text-xs"}`}
            component={
                <SearchInfoContent
                    item={item}
                    type={type}
                    queryType={queryType}
                />
            }
            dialogClasses={`md:max-w-screen-sm`}
            footer={
                <Button
                    variant="outline"
                    className={`col-start-1 mx-auto flex flex-row items-center transition-colors md:col-end-4 ${
                        !alreadyIncluded
                            ? ""
                            : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    } `}
                    disabled={loading}
                    onClick={handleAdd}
                >
                    {!alreadyIncluded ? (
                        <Plus className={`mr-2`} />
                    ) : (
                        <Check className={`mr-2`} />
                    )}
                    <p>
                        {!alreadyIncluded
                            ? "Add this Item to the Board"
                            : "Item is already on the Board"}
                    </p>
                </Button>
            }
            title={item.name}
            backdrop={item.backdrop_path}
            hideDescription={true}
            hideTitle={true}
        />
    )
}
