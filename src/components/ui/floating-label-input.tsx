import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ label, icon: Icon, error, className, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const isFloating = isFocused || hasValue || props.placeholder;

  return (
    <div className="relative w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={props.placeholder || ""}
          className={cn(
            "peer w-full px-4 py-3 bg-white dark:bg-gray-900/50 border-2 rounded-lg",
            "transition-all duration-200 ease-in-out outline-none",
            "focus:border-green-500 dark:focus:border-green-400",
            "text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-700",
            Icon && "pr-12",
            className
          )}
        />
        <label
          className={cn(
            "absolute transition-all duration-200 ease-in-out pointer-events-none",
            Icon ? "right-8" : "right-3",
            "px-2 text-gray-600 dark:text-gray-400",
            isFloating
              ? "text-xs -top-2.5 bg-gradient-to-b from-transparent via-white dark:via-gray-900 to-white dark:to-gray-900"
              : "text-base top-1/2 -translate-y-1/2",
            isFocused && !error && "text-green-500 dark:text-green-400",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

interface FloatingLabelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(({ label, error, className, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const isFloating = isFocused || hasValue || props.placeholder;

  return (
    <div className="relative w-full">
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={props.placeholder || ""}
          className={cn(
            "peer w-full px-4 py-3 bg-white dark:bg-gray-900/50 border-2 rounded-lg",
            "transition-all duration-200 ease-in-out outline-none resize-none",
            "focus:border-green-500 dark:focus:border-green-400",
            "text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-700",
            className
          )}
        />
        <label
          className={cn(
            "absolute right-3 transition-all duration-200 ease-in-out pointer-events-none",
            "px-2 text-gray-600 dark:text-gray-400",
            isFloating
              ? "text-xs -top-2.5 bg-gradient-to-b from-transparent via-white dark:via-gray-900 to-white dark:to-gray-900"
              : "text-base top-3",
            isFocused && !error && "text-green-500 dark:text-green-400",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";