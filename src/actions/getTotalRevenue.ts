"use server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTotalRevenue = async (): Promise<number> => {
  try {
    const paidOrders = await db
      .select({ totalPrice: orderTable.totalPrice })
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    const totalRevenue = paidOrders.reduce(
      (acc, order) => acc + Number(order.totalPrice),
      0
    );

    return totalRevenue;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return 0;
  }
};
