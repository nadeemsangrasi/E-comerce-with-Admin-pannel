import React from "react";

export interface IUploadImageProps {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  value: string[];
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  totalStock: number;
  salePrice: number;
  isFeatured: boolean;
  isArchived: boolean;
  images: { productId: string; imageUrl: string }[];
}
