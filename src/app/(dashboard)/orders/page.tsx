import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { OrderTable } from "@/components/shared/OrderTable";
import React from "react";

const OrdersPage = () => {
  return (
    <DashboardPagesWrapper>
      <DashboardPagesHeadings primaryText="Orders" items={12} />
      <div className="mt-5">
        <OrderTable />
      </div>
    </DashboardPagesWrapper>
  );
};

export default OrdersPage;
