import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  className?: string;
  thumbColor?: string;
  checkedColor?: string;
  uncheckedColor?: string;
};

function Switch({
  className,
  thumbColor = "bg-white",
  checkedColor = "bg-green-500",
  uncheckedColor = "bg-gray-300",
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        `
        peer inline-flex h-[1.2rem] w-10 items-center rounded-full 
        transition-all cursor-pointer border border-red-400
        data-[state=checked]:${checkedColor} 
        data-[state=unchecked]:${uncheckedColor}
      `,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          `
          ${thumbColor}
          pointer-events-none block size-5 rounded-full shadow 
          transition-transform
          data-[state=checked]:translate-x-[calc(100%-3px)]
          data-[state=unchecked]:translate-x-0
        `
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

