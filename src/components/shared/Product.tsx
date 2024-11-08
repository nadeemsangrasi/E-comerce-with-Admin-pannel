"use client";

import ProductButton from "./ProductButton";
import Image from "next/image";
import { ExpandIcon, ShoppingBag } from "lucide-react";
import { IProduct } from "@/types/types";

const ProductCard = ({ product }: { product: IProduct }) => {
  const handleAddToCart = () => {};
  return (
    <div className="w-[280px] border dark:border-gray-300 rounded-lg p-3 mx-auto h-fit">
      {/* Image Container */}
      <div className="overflow-hidden relative group">
        <Image
          src={product.images[0].imageUrl || ""}
          alt="product image"
          width={1000}
          height={1000}
          className="w-full hover:scale-110 duration-150 hover:duration-150 "
        />
        {/* ExpandIcon (hidden by default, shown on hover) */}
        <ExpandIcon
          className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer group-hover:duration-300 top-1/2 "
          size={32}
        />
      </div>

      {/* Product Information */}
      <div className="space-y-1">
        <div className="flex gap-4 justify-between items-center  ">
          <h1
            className="mt-2 text-[1.4rem] leading-[2rem] tracking-tight font-semibold "
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {product?.title}
          </h1>
          <span className="flex items-center gap-1 ">
            <ShoppingBag size={20} />

            {product?.totalStock}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {product?.category}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {product.brand}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="line-through text-lg font-medium text-red-600">
            {product.price}
          </p>
          <p className="text-lg font-medium text-green-600">
            {product.salePrice || ""}
          </p>
        </div>
      </div>

      <ProductButton
        label="Add to cart"
        onClick={handleAddToCart}
        className="w-full"
      />
    </div>
  );
};

export default ProductCard;
