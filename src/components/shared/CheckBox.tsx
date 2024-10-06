import { Checkbox as ShadCheckbox } from "../ui/checkbox"; // Assuming you're using this custom Checkbox

export function CheckBox({
  label,
  value,
  setValue,
}: {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <ShadCheckbox
        id={label}
        checked={value}
        onCheckedChange={() => setValue(!value)}
      />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
