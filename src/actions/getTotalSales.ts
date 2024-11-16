"use server";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTotalSales = async () => {
  try {
    const paidOrders = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    let totalSales = 0;

    for (const order of paidOrders) {
      const orderItems = await db
        .select()
        .from(orderItemTable)
        .where(eq(orderItemTable.orderId, order.id));

      for (const item of orderItems) {
        totalSales += item.salePrice
          ? item.salePrice * item.quantity
          : item.price * item.quantity;
      }
    }

    return totalSales;
  } catch (error) {
    console.error("Error fetching total sales data:", error);
    return 0;
  }
};
