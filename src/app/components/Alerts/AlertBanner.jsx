"use client"

import {
    Alert,
    AlertClose,
    AlertDescription,
    AlertTitle,
} from "@components/ui/alert"
import { Megaphone, TriangleAlert, X } from "lucide-react"
import { useGetAlert } from "@app/hooks/use-get-alerts"
import { useEffect, useState } from "react"

const saveAlertLocalStorage = (viewedIdArray) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("alertsViewed", JSON.stringify(viewedIdArray))
    }
}
// Alert types: warn, info
export default function AlertBanner() {
    const alert = useGetAlert()

    if (alert.isError || alert.isLoading || !alert.data) return null

    return <AlertContent alert={alert} />
}

function AlertContent({ alert }) {
    let viewedAlerts = null

    const [hidden, setHidden] = useState(false)

    if (typeof window !== "undefined") {
        viewedAlerts = JSON.parse(localStorage.getItem("alertsViewed"))
    }

    const handleClick = () => {
        if (Array.isArray(viewedAlerts)) {
            viewedAlerts.push(alert?.data[0].id)
            saveAlertLocalStorage(viewedAlerts)
        } else {
            saveAlertLocalStorage([alert?.data[0].id])
        }
        setHidden(true)
    }

    if (viewedAlerts !== null && viewedAlerts.includes(alert?.data[0]?.id))
        return null

    return (
        <div className={`col-span-full mb-2`} hidden={hidden}>
            <Alert
                variant={
                    alert.data[0].type == "warn" ? "destructive" : "default"
                }
            >
                {alert.data[0].type == "info" && (
                    <Megaphone className="h-4 w-4" />
                )}
                {alert.data[0].type == "warn" && (
                    <TriangleAlert className="h-4 w-4" />
                )}
                <AlertTitle>{alert.data[0].title}</AlertTitle>
                <AlertDescription>{alert.data[0].content}</AlertDescription>
                <AlertClose onClick={handleClick} />
            </Alert>
        </div>
    )
}
