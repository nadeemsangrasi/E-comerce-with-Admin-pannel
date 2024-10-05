import AddNewButton from "@/components/dashboard/AddNewButton";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import React from "react";

const CategoriesPage = () => {
  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings primaryText="Categories" items={12} />
        </div>
        <AddNewButton btnType="category" />
      </div>
    </DashboardPagesWrapper>
  );
};

export default CategoriesPage;
