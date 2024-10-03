import { db } from "@/db";
import {
  orderItemTable,
  orderTable,
  productTable,
  reviewTable,
} from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return errorResponse("product id is required", false, 200);
  }

  try {
    const productReviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.productId, productId as unknown as number));

    if (productReviews.length === 0) {
      return errorResponse("reviews not found", false, 404);
    }

    return successResponse(
      "reviews fetched successfully",
      true,
      200,
      productReviews
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const POST = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    return errorResponse("user not authenticated", false, 500);
  }

  const { userId, productId, reviewMessage, reviewValue } = await req.json();
  if (!userId || !productId || !reviewMessage || !reviewValue) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const order = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.userId, userId));
    const isOrdered = await db
      .select()
      .from(orderItemTable)
      .where(
        and(
          eq(orderItemTable.orderId, order[0].id),
          eq(orderItemTable.productId, productId)
        )
      );
    if (isOrdered.length === 0 || order[0].isPaid === false) {
      return errorResponse(
        "you need to purchase product to review it.",
        false,
        403
      );
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
      return errorResponse("you already reviewed this product!.", false, 403);
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
      return errorResponse("error adding new review", false, 500);
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
      return errorResponse("error updating average product review", false, 400);
    }

    return successResponse("review added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
