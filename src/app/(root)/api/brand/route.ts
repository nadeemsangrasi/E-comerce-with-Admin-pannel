import { db } from "@/db";
import { brandTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { isAdmin } from "@/utils/isAdmin";
import { successResponse } from "@/utils/successResponse";

import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const brands = await db.select().from(brandTable);

    if (brands.length === 0) {
      return errorResponse("brands not found", false, 404);
    }
    return successResponse("brands fetched successfully", true, 200, brands);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const POST = async (req: NextRequest) => {
  isAdmin();
  const { name } = await req.json();
  if (!name) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const newbrand = await db
      .insert(brandTable)
      .values({
        name,
      })
      .returning();
    if (newbrand.length === 0) {
      return errorResponse("Error adding brand", false, 500);
    }

    return successResponse("brand added successfully", true, 200, newbrand[0]);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const PATCH = async (req: NextRequest) => {
  isAdmin();
  const { brandId, name } = await req.json();
  if (!name || !brandId) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const updatedBrand = await db
      .update(brandTable)
      .set({
        name,
      })
      .where(eq(brandTable.id, brandId))
      .returning();

    if (updatedBrand.length === 0) {
      return errorResponse("brand not found", false, 404);
    }

    return successResponse(
      "brand updated successfully",
      true,
      200,
      updatedBrand[0]
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  isAdmin();

  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) {
    return errorResponse("all fields are required", false, 400);
  }
  try {
    const deletedbrand = await db
      .delete(brandTable)
      .where(eq(brandTable.id, brandId as unknown as number))
      .returning();
    if (deletedbrand.length === 0) {
      return errorResponse("brand not found", false, 404);
    }
    return successResponse("brand deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
