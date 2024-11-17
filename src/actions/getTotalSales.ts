"use server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTotalSales = async (): Promise<number> => {
  try {
    const paidOrders = await db
      .select({
        id: orderTable.id,
        totalPrice: orderTable.totalPrice,
      })
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    return paidOrders.length;
  } catch (error) {
    console.error("Error fetching total sales data:", error);
    return 0;
  }
};
