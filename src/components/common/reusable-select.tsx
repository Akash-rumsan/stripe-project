import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/types/scraper";

interface ReusableSelectProps {
  options: SelectOption[]; // Array of options for the select dropdown
  onValueChange: (value: string) => void; // Callback for value change
  value?: string; // Current value of the select
  placeholder?: string; // Placeholder for the select input
  className?: string; // Additional class names for customization
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  options,
  onValueChange,
  value,
  placeholder,
  className,
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReusableSelect;
