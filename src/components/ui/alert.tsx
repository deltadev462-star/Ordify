import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

const alertVariants = {
  default: "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-800",
  destructive: "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200",
  warning: "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-200",
  success: "border-green-500 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200",
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        alertVariants[variant],
        className
      )}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Icon components for different alert types
const AlertIcon: React.FC<{ variant?: keyof typeof alertVariants }> = ({ variant = "default" }) => {
  const iconClass = "h-4 w-4 mr-2"
  
  switch (variant) {
    case "destructive":
      return <XCircle className={cn(iconClass, "text-red-600 dark:text-red-400")} />
    case "warning":
      return <AlertTriangle className={cn(iconClass, "text-orange-600 dark:text-orange-400")} />
    case "success":
      return <CheckCircle className={cn(iconClass, "text-green-600 dark:text-green-400")} />
    case "info":
      return <Info className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />
    default:
      return <Info className={cn(iconClass, "text-gray-600 dark:text-gray-400")} />
  }
}

export { Alert, AlertTitle, AlertDescription, AlertIcon }