import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "./Alert"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

export type AlertType = "error" | "success" | "warning" | "info"

interface StatusAlertProps extends Omit<React.ComponentProps<typeof Alert>, "variant"> {
    type?: AlertType
    title?: string
    message: string
}

const iconMap = {
    error: AlertCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
}

const variantMap: Record<AlertType, "destructive" | "success" | "warning" | "default"> = {
    error: "destructive",
    success: "success",
    warning: "warning",
    info: "default",
}

export function StatusAlert({
    type = "info",
    title,
    message,
    className,
    ...props
}: StatusAlertProps) {
    const Icon = iconMap[type]
    const variant = variantMap[type]

    return (
        <Alert variant={variant} className={className} {...props}>
            <Icon className="h-4 w-4" />
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
