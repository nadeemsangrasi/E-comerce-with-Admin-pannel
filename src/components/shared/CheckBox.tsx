"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckBox({
  label,
  value,
  setValue,
}: {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={value} onChange={() => setValue(!value)} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
