import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-y-auto overflow-x-hidden",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
          "scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea }