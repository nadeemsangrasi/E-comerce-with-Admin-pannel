import { db } from "@/db";
import { productImageTable, productTable } from "@/db/schema";

import { errorResponse } from "@/utils/errorResponse";
import { isAdmin } from "@/utils/isAdmin";
import { successResponse } from "@/utils/successResponse";

import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
export const GET = async () => {
  try {
    const products = await db.select().from(productTable);

    if (products.length === 0) {
      return errorResponse("products not found", false, 404);
    }
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await db
          .select()
          .from(productImageTable)
          .where(
            eq(productImageTable.productId, product.id as unknown as number)
          );

        return {
          ...product,
          images,
        };
      })
    );

    return successResponse(
      "products fetched successfully",
      true,
      200,
      productsWithImages
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
    catSlug,
    brandSlug,
  } = await req.json();
  if (
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !totalStock ||
    !catSlug ||
    !brandSlug
  ) {
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
        catSlug,
        brandSlug,
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
    catSlug,
    brandSlug,
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
        catSlug,
        brandSlug,
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
