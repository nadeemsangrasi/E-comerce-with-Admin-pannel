import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem as UiSelectItem, // Rename this import
} from "@/components/ui/select";

export function SelectItem({
  selectLabel,
  data,
  value,
  setValue,
}: {
  selectLabel: string;
  data: { label: string; value: string }[];
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {data.map((item) => (
            <UiSelectItem key={item.value} value={item.value}>
              {item.label}
            </UiSelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
