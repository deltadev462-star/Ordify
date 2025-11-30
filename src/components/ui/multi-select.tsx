import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  label,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter(v => v !== optionValue);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "min-h-[48px] px-4 py-2 bg-white dark:bg-gray-900/50 border-2 rounded-lg cursor-pointer",
          "flex flex-wrap gap-2 items-center transition-all duration-200",
          isOpen 
            ? "border-green-500 dark:border-green-400" 
            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
        )}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          selectedOptions.map(option => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-sm"
            >
              {option.label}
              <X
                className="w-3 h-3 cursor-pointer hover:text-green-600"
                onClick={(e) => handleRemove(option.value, e)}
              />
            </span>
          ))
        )}
        
        <ChevronDown 
          className={cn(
            "w-4 h-4 ml-auto text-gray-400 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-4 py-2 cursor-pointer transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                selectedValues.includes(option.value) && "bg-green-50 dark:bg-green-900/20"
              )}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => {}}
                  className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};