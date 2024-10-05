import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import React from "react";

const OrdersPage = () => {
  return (
    <DashboardPagesWrapper>
      <DashboardPagesHeadings primaryText="Orders" items={12} />
    </DashboardPagesWrapper>
  );
};

export default OrdersPage;
