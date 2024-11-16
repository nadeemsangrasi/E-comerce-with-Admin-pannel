"use server";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTotalRevenue = async () => {
  try {
    const paidOrders = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    const total = paidOrders.reduce(
      (a, item) => a + Number(item.totalPrice),
      0
    );

    return total || 0;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return 0;
  }
};
