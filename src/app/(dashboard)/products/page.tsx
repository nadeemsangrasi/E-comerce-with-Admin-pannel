import AddNewButton from "@/components/dashboard/AddNewButton";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import ProductCard from "@/components/shared/ProductCard";

import React from "react";

const ProductPage = () => {
  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings primaryText="Products" items={12} />
        </div>
        <AddNewButton btnType="product" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </DashboardPagesWrapper>
  );
};

export default ProductPage;
