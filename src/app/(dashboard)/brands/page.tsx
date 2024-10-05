import AddNewButton from "@/components/dashboard/AddNewButton";
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
    </DashboardPagesWrapper>
  );
};

export default BrandPage;
