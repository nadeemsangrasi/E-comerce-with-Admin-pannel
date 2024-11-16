"use client";
import ProductCard from "@/components/shared/ProductCard";
import SortingSelect from "@/components/shared/SortingSelect";
import { selectOptions } from "@/data/data";
import { IProduct } from "@/types/types";
import React, { useState } from "react";

const AllProductsClient = ({ products }: { products: IProduct[] }) => {
  const [sortOrder, setSortOrder] = useState("");
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOrder) {
      case "aToZ":
        return a.title.localeCompare(b.title);
      case "zToA":
        return b.title.localeCompare(a.title);
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "salePriceAsc":
        return a.salePrice - b.salePrice;
      case "salePriceDesc":
        return b.salePrice - a.salePrice;
      case "stockAsc":
        return a.totalStock - b.totalStock;
      case "stockDesc":
        return b.totalStock - a.totalStock;
      case "ratingAsc":
        return parseFloat(a.averageReview) - parseFloat(b.averageReview);
      case "ratingDesc":
        return parseFloat(b.averageReview) - parseFloat(a.averageReview);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "featured":
        return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
      default:
        return 0;
    }
  });
  return (
    <div className="max-w-screen-2xl">
      <h1 className="text-6xl font-bold text-center  mb-10  ">Our Products</h1>
      <div className="py-8 px-8">
        <SortingSelect options={selectOptions} onChange={setSortOrder} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.length > 0 &&
          sortedProducts.map(
            (product: IProduct) =>
              !product.isArchive && (
                <ProductCard
                  key={product.id}
                  product={product}
                  isUserSide={true}
                />
              )
          )}
      </div>
    </div>
  );
};

export default AllProductsClient;
