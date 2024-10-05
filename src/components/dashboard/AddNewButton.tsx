"use client";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const AddNewButton = ({ btnType }: { btnType: string }) => {
  const handleAddProduct = () => {};

  const handleAddCategory = () => {};

  const handleAddBrand = () => {};
  return (
    <Button
      onClick={() =>
        btnType == "product"
          ? handleAddProduct
          : btnType == "category"
          ? handleAddCategory
          : btnType == "brand"
          ? handleAddBrand
          : ""
      }
    >
      <Plus />
      Add New
    </Button>
  );
};

export default AddNewButton;
