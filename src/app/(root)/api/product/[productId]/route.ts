import { db } from "@/db";
import { productTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  const { productId } = params;
  try {
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId as unknown as number));
    if (product.length === 0) {
      errorResponse("product not found", false, 404);
    }

    return successResponse(
      "product fetched successfully",
      true,
      200,
      product[0]
    );
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
