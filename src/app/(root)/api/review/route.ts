import { db } from "@/db";
import { productTable, reviewTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    errorResponse("product id is required", false, 200);
  }

  try {
    const productReviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.productId, productId as unknown as number));

    if (productReviews.length === 0) {
      errorResponse("reviews not found", false, 404);
    }

    successResponse("reviews fetched successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
export const POST = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    errorResponse("user not authenticated", false, 500);
  }

  const { userId, productId, reviewMessage, reviewValue } = await req.json();
  if (!userId || !productId || !reviewMessage || !reviewValue) {
    errorResponse("all fields are required", false, 400);
  }

  try {
    //todo check product is in orderd table or not

    const order = true;
    if (!order) {
      errorResponse("you need to purchase product to review it.", false, 403);
    }

    const isReviewed = await db
      .select()
      .from(reviewTable)
      .where(
        and(
          eq(reviewTable.productId, productId),
          eq(reviewTable.userId, userId)
        )
      );
    if (isReviewed.length > 0) {
      errorResponse("you already reviewed this product!.", false, 403);
    }

    const newReview = await db
      .insert(reviewTable)
      .values({
        userId,
        productId,
        reviewMessage,
        reviewValue,
      })
      .returning();
    if (newReview.length === 0) {
      errorResponse("error adding new review", false, 500);
    }

    const getProductReviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.productId, productId));
    const totalReviewsLength = getProductReviews.length;
    const averageReview =
      getProductReviews.reduce(
        (sum, reviewItem) => sum + reviewItem.reviewValue,
        0
      ) / totalReviewsLength;

    const updateProduct = await db
      .update(productTable)
      .set({
        averageReview,
      })
      .where(eq(productTable.id, productId))
      .returning();
    if (updateProduct.length === 0) {
      errorResponse("error updating average product review", false, 400);
    }

    successResponse("review added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
