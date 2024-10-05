import AddNewButton from "@/components/dashboard/AddNewButton";
import CategoryBrandCard from "@/components/dashboard/CategoryBrandCard";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import React from "react";

const BrandPage = () => {
  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings primaryText="Brands" items={12} />
        </div>
        <AddNewButton btnType="brand" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 ">
        <CategoryBrandCard cardType="s" date="a" title="a" />
        <CategoryBrandCard cardType="s" date="a" title="a" />
        <CategoryBrandCard cardType="s" date="a" title="a" />
        <CategoryBrandCard cardType="s" date="a" title="a" />
        <CategoryBrandCard cardType="s" date="a" title="a" />
      </div>
    </DashboardPagesWrapper>
  );
};

export default BrandPage;
