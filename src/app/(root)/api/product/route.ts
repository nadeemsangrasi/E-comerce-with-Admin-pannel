import { db } from "@/db";
import { productTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { isAdmin } from "@/utils/isAdmin";
import { successResponse } from "@/utils/successResponse";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
export const GET = async () => {
  try {
    const products = await db.select().from(productTable);
    if (products.length === 0) {
      return errorResponse("products not found", false, 404);
    }

    return successResponse(
      "products fetched successfully",
      true,
      200,
      products
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const POST = async (req: NextRequest) => {
  isAdmin();
  const {
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    isArchive,
    isFeatured,
  } = await req.json();
  if (!title || !description || !category || !brand || !price || !totalStock) {
    return errorResponse("All fields are required", false, 500);
  }
  try {
    const product = await db
      .insert(productTable)
      .values({
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        isArchive,
        isFeatured,
      })
      .returning();

    if (product.length === 0) {
      return errorResponse("products not found", false, 404);
    }

    return successResponse("product added successfully", true, 200, product[0]);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  isAdmin();
  const {
    productId,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    isArchive,
    isFeatured,
  } = await req.json();

  if (!productId || !title) {
    return errorResponse("Product id and title is required ", false, 500);
  }
  try {
    const updatedProduct = await db
      .update(productTable)
      .set({
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        isArchive,
        isFeatured,
      })
      .where(eq(productTable.id, productId))
      .returning();
    if (updatedProduct.length === 0) {
      return errorResponse("product not found", false, 404);
    }
    return successResponse(
      "Product updated successfully",
      true,
      200,
      updatedProduct[0]
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  isAdmin();
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return errorResponse("productId is required", false, 500);
  }
  try {
    const deletedProduct = await db
      .delete(productTable)
      .where(eq(productTable.id, productId as unknown as number))
      .returning();

    if (deletedProduct.length === 0) {
      return errorResponse("product not found", false, 404);
    } else {
      return successResponse("product deleted successfully", true, 200);
    }
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
