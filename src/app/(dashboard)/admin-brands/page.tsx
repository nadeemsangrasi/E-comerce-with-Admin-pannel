"use client";
import CategoryBrandCard from "@/components/dashboard/CategoryBrandCard";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { NewCategoryBrandDialog } from "@/components/dashboard/NewCategoryBrandDialog";
import React from "react";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { ICategoryBrand } from "@/types/types";
import Loader from "@/components/shared/Loader";
const BrandPage = () => {
  const { brands, brandLoading } = useProductContext();
  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings primaryText="Brands" items={brands?.length} />
        </div>
        <NewCategoryBrandDialog label="Brand" />
      </div>
      {brandLoading ? (
        <div className="flex justify-center items-center h-[calc(100%-100px)] w-[calc(100%-200px)]">
          <Loader
            loading={brandLoading}
            text="Loading Brands, please wait..."
          />
          ;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 ">
          {brands?.map((brand: ICategoryBrand) => (
            <CategoryBrandCard cardType="brand" data={brand} key={brand?.id} />
          ))}
        </div>
      )}
    </DashboardPagesWrapper>
  );
};

export default BrandPage;
