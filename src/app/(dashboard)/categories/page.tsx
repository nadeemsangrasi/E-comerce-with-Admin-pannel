"use client";
import CategoryBrandCard from "@/components/dashboard/CategoryBrandCard";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { NewCategoryBrandDialog } from "@/components/dashboard/NewCategoryBrandDialog";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { ICategoryBrand } from "@/types/types";
import React from "react";

const CategoriesPage = () => {
  const { categories, catLoading } = useProductContext();
  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings
            primaryText="Categories"
            items={categories?.length}
          />
        </div>
        <NewCategoryBrandDialog label="Category" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 ">
        {catLoading ? (
          <div>loading....</div>
        ) : (
          categories?.map((cat: ICategoryBrand) => (
            <CategoryBrandCard cardType="category" data={cat} key={cat?.id} />
          ))
        )}
      </div>
    </DashboardPagesWrapper>
  );
};

export default CategoriesPage;
