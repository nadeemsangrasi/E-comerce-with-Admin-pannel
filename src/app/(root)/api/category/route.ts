import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const categories = await db.select().from(categoryTable);

    if (categories.length === 0) {
      return errorResponse("categories not found", false, 404);
    }
    return successResponse(
      "Categories fetched successfully",
      true,
      200,
      categories
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const POST = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    return errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    return errorResponse("you are not authorize for this request", false, 200);
  }
  const { categoryName } = await req.json();
  if (!categoryName) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const newCategory = await db
      .insert(categoryTable)
      .values({
        categoryName,
      })
      .returning();
    if (newCategory.length === 0) {
      return errorResponse("Error adding category", false, 500);
    }

    return successResponse("category added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const PATCH = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    return errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    return errorResponse("you are not authorize for this request", false, 200);
  }
  const { categoryId, categoryName } = await req.json();
  if (!categoryName || !categoryId) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const updatedCategory = await db
      .update(categoryTable)
      .set({
        categoryName,
      })
      .where(eq(categoryTable.id, categoryId))
      .returning();
    if (updatedCategory.length === 0) {
      return errorResponse("category not found", false, 404);
    }

    return successResponse("category updated successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  const { userId, role }: any = auth();
  if (!userId) {
    return errorResponse("user not authenticated", false, 500);
  }
  if (role !== "admin") {
    return errorResponse("you are not authorize for this request", false, 200);
  }

  const categoryId = req.nextUrl.searchParams.get("categoryId");
  if (!categoryId) {
    return errorResponse("all fields are required", false, 400);
  }
  try {
    const deletedCategory = await db
      .delete(categoryTable)
      .where(eq(categoryTable.id, categoryId as unknown as number))
      .returning();
    if (deletedCategory.length === 0) {
      return errorResponse("category not found", false, 404);
    }
    return successResponse("Category deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
