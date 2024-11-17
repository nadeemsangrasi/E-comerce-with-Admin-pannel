import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem as UiSelectItem, 
} from "@/components/ui/select";

export function SelectItem({
  selectLabel,
  data,
  value,
  setValue,
}: {
  selectLabel: string;
  data: { name: string }[];
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
            <UiSelectItem key={item.name} value={item.name}>
              {item.name}
            </UiSelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
