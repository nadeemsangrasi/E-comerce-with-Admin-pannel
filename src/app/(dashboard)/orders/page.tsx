import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { OrderTable } from "@/components/shared/OrderTable";
import React from "react";

const OrdersPage = () => {
  return (
    <DashboardPagesWrapper>
      <OrderTable />
    </DashboardPagesWrapper>
  );
};

export default OrdersPage;
