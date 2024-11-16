import { db } from "@/db";
import { productImageTable, productTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  const { productId } = params;
  if (!productId) {
    return errorResponse("productid is required not found", false, 500);
  }
  try {
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId as unknown as number));
    if (product.length === 0) {
      return errorResponse("product not found", false, 404);
    }

    const productImages = await db
      .select()
      .from(productImageTable)
      .where(eq(productImageTable.productId, productId as unknown as number));
    const productWithImages = { ...product[0], images: productImages };
    return successResponse(
      "product fetched successfully",
      true,
      200,
      productWithImages
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
