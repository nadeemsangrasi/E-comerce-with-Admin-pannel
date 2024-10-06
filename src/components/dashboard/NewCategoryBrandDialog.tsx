"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export function NewCategoryBrandDialog({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const handleCreateCategory = async () => {
    console.log(value);
    setValue("");
    setOpen(false);
  };
  const handleCreateBrand = async () => {
    console.log(value);
    setValue("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New {label}</DialogTitle>
          <DialogDescription>Create a new {label}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right ">
              Name
            </Label>
            <Input
              id="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="col-span-3"
              placeholder={`Enter ${label} Name`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={
              label.toLowerCase() === "category"
                ? () => handleCreateCategory()
                : label.toLowerCase() === "brand"
                ? () => handleCreateBrand()
                : (): void => {}
            }
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
