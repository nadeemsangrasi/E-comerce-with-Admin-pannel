import React from "react";
import ProductButton from "./ProductButton";
import Image from "next/image";
import img from "@/assets/home-4.jpg";
import { Edit, ExpandIcon, ShoppingBag, TrashIcon } from "lucide-react";

const ProductCard = () => {
  const role = "admin";

  return (
    <div className="w-[280px] border rounded-lg p-3 mx-auto">
      {/* Image Container */}
      <div className="overflow-hidden relative group">
        <Image
          src={img}
          alt="product image"
          className="w-full hover:scale-110 duration-150 hover:duration-150 "
        />
        {/* ExpandIcon (hidden by default, shown on hover) */}
        <ExpandIcon
          className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer group-hover:duration-300 top-1/2 "
          size={32}
        />
      </div>

      {/* Product Information */}
      <div>
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-2xl tracking-tight font-semibold">
            Product title
          </h1>
          <span className="flex items-center gap-1">
            <ShoppingBag size={16} />
            12
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-600 font-medium">category</p>
          <p className="text-gray-600 font-medium">brand</p>
        </div>
        <div className="flex justify-between">
          <p className="line-through text-lg font-medium text-red-600">$220</p>
          <p className="text-lg font-medium text-green-600">$120</p>
        </div>
      </div>

      {/* Buttons (based on role) */}
      <div className="flex justify-between mt-2 gap-4">
        {role === "admin" ? (
          <>
            <ProductButton label="Delete" btnType="delete" className="w-full" />
            <ProductButton label="Edit" btnType="edit" className="w-full" />
          </>
        ) : (
          <ProductButton
            label="Add to cart"
            btnType="addToCart"
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
