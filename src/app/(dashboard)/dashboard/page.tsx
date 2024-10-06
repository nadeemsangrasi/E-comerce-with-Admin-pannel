import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { DollarSign, ShoppingBasket, SquareCheck } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <DashboardPagesWrapper>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Dashboard
      </h1>
      <p className="text-gray-500 text-base font-medium">manage your store</p>
      <div className="grid sm:grid-cols-[1fr] md:grid-cols-[1fr,1fr] xl:grid-cols-[1fr,1fr,1fr] gap-6 mt-5  ">
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2 ">
          <div className="flex justify-between items-center ">
            <span className=" font-semibold text-lg  ">Total Revenue</span>
            <span>
              <DollarSign />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">${1239}.00</h1>
        </div>
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className=" font-semibold text-lg  ">Total Sales</span>
            <span>
              <SquareCheck />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">+20</h1>
        </div>
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className=" font-semibold text-lg  ">Products in stock</span>
            <span>
              <ShoppingBasket />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">0</h1>
        </div>
      </div>
    </DashboardPagesWrapper>
  );
};

export default AdminDashboard;
