"use client";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewButton = () => {
  const router = useRouter();
  const handleAddProduct = () => {
    router.push("/new-product");
  };

  return (
    <Button onClick={handleAddProduct}>
      <Plus />
      Add New
    </Button>
  );
};

export default AddNewButton;
