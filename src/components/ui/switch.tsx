import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state - vibrant green with good contrast
        "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600",
        "dark:data-[state=checked]:bg-green-400 dark:data-[state=checked]:border-green-500",
        "data-[state=checked]:shadow-[0_0_20px_rgba(34,197,94,0.5)]",
        // Unchecked state - clearly visible gray
        "data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-300",
        "dark:data-[state=unchecked]:bg-gray-700 dark:data-[state=unchecked]:border-gray-600",
        // Focus ring in green
        "focus-visible:ring-green-500 dark:focus-visible:ring-green-400",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-xl ring-0 transition-all duration-300",
          // Thumb color and position
          "bg-white dark:bg-gray-100",
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5",
          "rtl:data-[state=checked]:-translate-x-7 rtl:data-[state=unchecked]:-translate-x-0.5",
          // Enhanced shadow for better visibility
          "data-[state=checked]:shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
          "data-[state=unchecked]:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        )}
      />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
