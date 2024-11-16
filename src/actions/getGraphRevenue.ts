"use server";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getGraphRevenue = async () => {
  try {
    const paidOrders = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    const monthlyRevenue: { [key: string]: number } = {};

    for (const order of paidOrders) {
      const orderItems = await db
        .select()
        .from(orderItemTable)
        .where(eq(orderItemTable.orderId, order.id));

      const orderRevenue = orderItems.reduce((total, item) => {
        return (
          total + (item.salePrice ? Number(item.salePrice) : Number(item.price))
        );
      }, 0);

      const month = order.createdAt.toLocaleString("en-US", { month: "short" });

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + orderRevenue;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const graphData = months.map((month) => ({
      month,
      value: monthlyRevenue[month] || 0,
    }));

    return graphData;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return [];
  }
};
