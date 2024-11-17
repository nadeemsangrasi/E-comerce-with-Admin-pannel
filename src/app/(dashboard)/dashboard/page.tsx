import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getTotalSales } from "@/actions/getTotalSales";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import SalesChart from "@/components/dashboard/SalesChart";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { DollarSign, ShoppingBasket, SquareCheck } from "lucide-react";
import React from "react";
export const dynamic = "force-dynamic";
const AdminDashboard = async () => {
  const graphData = await getGraphRevenue();
  const totalRevenue = await getTotalRevenue();
  const totalSales = await getTotalSales();
  const productsInStock = await db.select().from(productTable);
  return (
    <DashboardPagesWrapper>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Dashboard
      </h1>
      <p className="text-gray-500 text-base font-medium">manage your store</p>
      <div className="grid sm:grid-cols-[1fr] md:grid-cols-[1fr,1fr] xl:grid-cols-[1fr,1fr,1fr] gap-6 mt-5  ">
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2 dark:bg-[#020817]">
          <div className="flex justify-between items-center ">
            <span className=" font-semibold text-lg  ">Total Revenue</span>
            <span>
              <DollarSign />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">
            ${totalRevenue}
          </h1>
        </div>
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2 dark:bg-[#020817]">
          <div className="flex justify-between items-center">
            <span className=" font-semibold text-lg  ">Total Sales</span>
            <span>
              <SquareCheck />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">
            +{totalSales}
          </h1>
        </div>
        <div className=" border dark:border-gray-300 rounded-lg p-4 space-y-2 dark:bg-[#020817]">
          <div className="flex justify-between items-center">
            <span className=" font-semibold text-lg  ">Products in stock</span>
            <span>
              <ShoppingBasket />
            </span>
          </div>
          <h1 className=" text-2xl tracking-tight font-semibold">
            {productsInStock.length > 0 ? productsInStock.length : 0}
          </h1>
        </div>
      </div>
      <div className="pt-4">
        <SalesChart data={graphData} />
      </div>
    </DashboardPagesWrapper>
  );
};

export default AdminDashboard;
