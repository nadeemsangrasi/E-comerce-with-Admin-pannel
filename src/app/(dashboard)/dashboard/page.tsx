import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import React from "react";

const AdminDashboard = () => {
  return (
    <DashboardPagesWrapper>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Dashboard
      </h1>
      <p className="text-gray-500 text-base font-medium">manage your store</p>
    </DashboardPagesWrapper>
  );
};

export default AdminDashboard;
