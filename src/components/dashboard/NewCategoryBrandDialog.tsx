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
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { slugify } from "@/utils/slugify";
import axios, { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function NewCategoryBrandDialog({ label }: { label: string }) {
  const { brands, setBrands, categories, setCategories } = useProductContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleCrateBrandORCategory = async (label: string) => {
    try {
      setLoading(true);
      const res =
        label === "brand"
          ? await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/brand`, {
              name: value,
              slug: slugify(value),
            })
          : await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/category`, {
              name: value,
              slug: slugify(value),
            });
      if (res.status !== 200) {
        console.error(res.data.message);
        toast.error(res.data.message);
      }
      if (label === "brand") {
        setBrands([...brands, res.data.data]);
        toast.success(res.data.message);
        return;
      }
      setCategories([...categories, res.data.data]);
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to submit review", axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
      setValue("");
    }
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
            onClick={() => handleCrateBrandORCategory(label.toLowerCase())}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
