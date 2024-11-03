import { db } from "@/db";
import { productImageTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { isAdmin } from "@/utils/isAdmin";
import { successResponse } from "@/utils/successResponse";

import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return errorResponse("product id required", false, 403);
  }

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

export const POST = async (req: NextRequest) => {
  isAdmin();

  const { images } = await req.json();
  if (!images || !Array.isArray(images)) {
    throw new Error("Invalid data format");
  }

  try {
    const productImages = await Promise.all(
      images.map(async (image: any) => {
        const productImage = await db
          .insert(productImageTable)
          .values({
            productId: image.productId,
            imageUrl: image.imageUrl,
          })
          .returning();
        return productImage[0];
      })
    );

    if (productImages.length === 0) {
      console.error("Error adding product images");
      return errorResponse("Error adding product images", false, 500);
    }

    return successResponse("Product images added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  isAdmin();
  const { images } = await req.json();
  if (!images || !Array.isArray(images)) {
    throw new Error("Invalid data format");
  }

  try {
    await db
      .delete(productImageTable)
      .where(eq(productImageTable.productId, images[0].productId));

    const updateImage = await Promise.all(
      images.map(async (image: any) => {
        const img = await db
          .insert(productImageTable)
          .values({
            productId: image.productId,
            imageUrl: image.imageUrl,
          })
          .returning();
        return img[0];
      })
    );
    if (updateImage.length === 0) {
      return errorResponse("Error updating images", false, 500);
    }

    return successResponse(
      "Images updated successfully",
      false,
      200,
      updateImage
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
