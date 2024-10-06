"use client";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewButton = ({ btnType }: { btnType: string }) => {
  const router = useRouter();
  const handleAddProduct = () => {
    router.push("/new-product");
  };

  const handleAddCategory = () => {};

  const handleAddBrand = () => {};
  return (
    <Button
      onClick={() =>
        btnType == "product"
          ? handleAddProduct()
          : btnType == "category"
          ? handleAddCategory()
          : btnType == "brand"
          ? handleAddBrand()
          : ""
      }
    >
      <Plus />
      Add New
    </Button>
  );
};

export default AddNewButton;
