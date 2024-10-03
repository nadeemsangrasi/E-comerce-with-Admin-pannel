import { db } from "@/db";
import { productImageTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { eq } from "drizzle-orm";

import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");

  try {
    const productImages = await db
      .select()
      .from(productImageTable)
      .where(eq(productImageTable.productId, productId as unknown as number));

    if (productImages.length === 0) {
      return errorResponse("product images not found", false, 404);
    }

    return successResponse(
      "product images fetched successfully",
      true,
      200,
      productImages
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
