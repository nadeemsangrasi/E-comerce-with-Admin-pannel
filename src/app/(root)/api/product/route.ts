import { db } from "@/db";
import { productTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
export const GET = async () => {
  try {
    const products = await db.select().from(productTable);
    if (products.length === 0) {
      errorResponse("no products found", false, 404);
    }

    return successResponse(
      "products fetched successfully",
      true,
      200,
      products
    );
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
export const POST = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    errorResponse("you are not authorize for this request", false, 200);
  }
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = await req.json();
  if (
    !image ||
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !totalStock
  ) {
    errorResponse("All fields are required", false, 500);
  }
  try {
    const product = await db
      .insert(productTable)
      .values({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      })
      .returning();

    if (product.length === 0) {
      errorResponse("products not found", false, 404);
    }

    return successResponse("product added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    errorResponse("you are not authorize for this request", false, 200);
  }
  const {
    productId,
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = await req.json();

  if (!productId || !title) {
    errorResponse("Product id and title is required ", false, 500);
  }
  try {
    const updatedProduct = await db
      .update(productTable)
      .set({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      })
      .where(eq(productTable.id, productId))
      .returning();
    if (updatedProduct.length === 0) {
      errorResponse("product not found", false, 404);
    }
    return successResponse("Product updated successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    errorResponse("you are not authorize for this request", false, 200);
  }

  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    errorResponse("productId is required", false, 500);
  }
  try {
    const deletedProduct = await db
      .delete(productTable)
      .where(eq(productTable.id, productId as unknown as number))
      .returning();

    if (deletedProduct.length === 0) {
      errorResponse("product not found", false, 404);
    } else {
      return successResponse("product deleted successfully", true, 200);
    }
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
