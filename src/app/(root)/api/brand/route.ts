import { db } from "@/db";
import { brandTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async () => {
  const { userId, role }: any = auth();
  if (!userId) {
    errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    errorResponse("you are not authorize for this request", false, 200);
  }

  try {
    const brands = await db.select().from(brandTable);

    if (brands.length === 0) {
      errorResponse("brands not found", false, 404);
    }
    successResponse("brands fetched successfully", true, 200, brands);
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
  const { brandName } = await req.json();
  if (!brandName) {
    errorResponse("all fields are required", false, 400);
  }

  try {
    const newbrand = await db
      .insert(brandTable)
      .values({
        brandName,
      })
      .returning();
    if (newbrand.length === 0) {
      errorResponse("Error adding brand", false, 500);
    }

    successResponse("brand added successfully", true, 200);
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
  const { brandId, brandName } = await req.json();
  if (!brandName || !brandId) {
    errorResponse("all fields are required", false, 400);
  }

  try {
    const updatedBrand = await db
      .update(brandTable)
      .set({
        brandName,
      })
      .where(eq(brandTable.id, brandId))
      .returning();
    if (updatedBrand.length === 0) {
      errorResponse("brand not found", false, 404);
    }

    successResponse("brand added successfully", true, 200);
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

  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) {
    errorResponse("all fields are required", false, 400);
  }
  try {
    const deletedbrand = await db
      .delete(brandTable)
      .where(eq(brandTable.id, brandId as unknown as number))
      .returning();
    if (deletedbrand.length === 0) {
      errorResponse("brand not found", false, 404);
    }
    successResponse("brand deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
