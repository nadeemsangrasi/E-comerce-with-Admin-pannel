import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { isAdmin } from "@/utils/isAdmin";
import { successResponse } from "@/utils/successResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const orders = await db.select().from(orderTable);
    if (orders.length === 0) {
      return errorResponse("orders not found", false, 404);
    }

    return successResponse("orders fetched successfully", true, 200, orders);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  isAdmin();
  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return errorResponse("orderId is required", false, 500);
  }
  try {
    const deletedorder = await db
      .delete(orderTable)
      .where(eq(orderTable.id, orderId as unknown as number))
      .returning();

    const deleteOrderItem = await db
      .delete(orderItemTable)
      .where(eq(orderItemTable.orderId, orderId as unknown as number))
      .returning();
    if (deletedorder.length === 0) {
      return errorResponse("order not found", false, 404);
    }
    if (deleteOrderItem.length === 0) {
      return errorResponse("order items not found", false, 404);
    }

    return successResponse("order deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
