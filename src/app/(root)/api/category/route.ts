import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    errorResponse("you are not authorize for this request", false, 200);
  }
  const { categoryName } = await req.json();
  if (!categoryName) {
    errorResponse("all fields are required", false, 400);
  }

  try {
    const newCategory = await db
      .insert(categoryTable)
      .values({
        categoryName,
      })
      .returning();
    if (newCategory.length === 0) {
      errorResponse("Error adding category", false, 500);
    }

    successResponse("category added successfully", true, 200);
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
  const { categoryId, categoryName } = await req.json();
  if (!categoryName || !categoryId) {
    errorResponse("all fields are required", false, 400);
  }

  try {
    const newCategory = await db
      .update(categoryTable)
      .set({
        categoryName,
      })
      .where(eq(categoryTable.id, categoryId))
      .returning();
    if (newCategory.length === 0) {
      errorResponse("category not found", false, 404);
    }

    successResponse("category added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
