"use client";

import AddNewButton from "@/components/dashboard/AddNewButton";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import ProductCard from "@/components/shared/ProductCard";
import { useProductContext } from "@/contexts/productsStore/ProductStore";

import { IProduct } from "@/types/types";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import SortingSelect from "@/components/shared/SortingSelect";
const options: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "archive", label: "Archived" },
  { value: "combined", label: "Combined" },
];
const ProductPage = () => {
  const { products, loading } = useProductContext();
  const [sortOrder, setSortOrder] = useState("");
  const filteredProducts =
    sortOrder === "archive"
      ? products.filter((product) => product.isArchive)
      : sortOrder === "featured"
      ? products.filter((product) => product.isFeatured)
      : products;

  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings
            primaryText="Products"
            items={products?.length}
          />
        </div>
        <AddNewButton />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100%-100px)] w-[calc(100%-200px)]">
          {loading && <Loader text="Loading Products, please wait..." />}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="pt-4 pb-2 px-4">
            <SortingSelect options={options} onChange={setSortOrder} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
            {filteredProducts?.map((product: IProduct) => (
              <ProductCard
                key={product.id}
                product={product}
                isUserSide={false}
              />
            ))}
          </div>
        </div>
      )}
    </DashboardPagesWrapper>
  );
};

export default ProductPage;
