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
import { Edit } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function EditCategoryOrBrandCardDialog({
  label,
  id,
  initialValue,
}: {
  label: string;
  id: string;
  initialValue: string;
}) {
  const { brands, setBrands, categories, setCategories } = useProductContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const handleEditBrandORCategory = async (label: string, id: string) => {
    try {
      setLoading(true);
      const res =
        label === "brand"
          ? await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/brand`, {
              brandId: id,
              name: value,
              slug: slugify(value),
            })
          : await axios.patch(
              `${process.env.NEXT_PUBLIC_DOMAIN}/api/category`,
              {
                categoryId: id,
                name: value,
                slug: slugify(value),
              }
            );
      if (res.status !== 200) {
        console.error(res.data.message);
        toast.error(res.data.message);
      }
      if (label === "brand") {
        setBrands(
          brands.map((brand) => (brand.id === id ? res.data.data : brand))
        );
        toast.success(res.data.message);
        return;
      }
      setCategories(
        categories.map((category) =>
          category.id === id ? res.data.data : category
        )
      );
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
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
        <Edit className="text-green-600 font-semibold cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
          <DialogDescription>Edit and save changes</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right ">
              New Name
            </Label>
            <Input
              id="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="col-span-3"
              placeholder={`Enter new ${label} Name`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => handleEditBrandORCategory(label.toLowerCase(), id)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
