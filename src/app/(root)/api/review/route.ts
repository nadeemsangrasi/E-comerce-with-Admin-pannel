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

  const { userId, productId, reviewMessage, reviewValue, username, imageUrl } =
    await req.json();
  if (
    !userId ||
    !productId ||
    !reviewMessage ||
    !reviewValue ||
    !username ||
    !imageUrl
  ) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const paidOrders = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.isPaid, true));

    if (!paidOrders.length) {
      return errorResponse(
        "No paid orders found. You need to purchase a product to leave a review.",
        false,
        403
      );
    }

    const ordersWithItems = await Promise.all(
      paidOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItemTable)
          .where(
            and(
              eq(orderItemTable.orderId, order.id),
              eq(orderItemTable.productId, productId)
            )
          );
        return items;
      })
    );

    const orderedItems = ordersWithItems.flat();

    if (!orderedItems.length) {
      return errorResponse(
        "You can only review products you have purchased.",
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
        username,
        imageUrl,
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
        averageReview: averageReview as unknown as string,
      })
      .where(eq(productTable.id, productId))
      .returning();
    if (updateProduct.length === 0) {
      return errorResponse("error updating average product review", false, 400);
    }

    return successResponse(
      "review added successfully",
      true,
      200,
      newReview[0]
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const PATCH = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    return errorResponse("user not authenticated", false, 500);
  }

  const { userId, reviewId, reviewMessage, reviewValue } = await req.json();
  if (!userId || !reviewMessage || !reviewId || !reviewValue) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    const updatedReview = await db
      .update(reviewTable)
      .set({
        reviewMessage,
        reviewValue,
      })
      .where(and(eq(reviewTable.id, reviewId), eq(reviewTable.userId, userId)))
      .returning();
    if (updatedReview.length === 0) {
      return errorResponse("error editing review", false, 500);
    }

    const productId = updatedReview[0].productId;
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

    const updateProductReview = await db
      .update(productTable)
      .set({ averageReview: averageReview as unknown as string })
      .where(eq(productTable.id, productId))
      .returning();

    if (updateProductReview.length === 0) {
      return errorResponse("error updating average product review", false, 400);
    }

    return successResponse(
      "review updated successfully",
      true,
      200,
      updatedReview[0]
    );
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const DELETE = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    return errorResponse("user not authenticated", false, 500);
  }

  const reviewId = req.nextUrl.searchParams.get("reviewId");
  if (!reviewId) {
    return errorResponse("reviewId id is required", false, 200);
  }

  try {
    const deleteReview = await db
      .delete(reviewTable)
      .where(
        and(
          eq(reviewTable.id, Number(reviewId)),
          eq(reviewTable.userId, isUser)
        )
      )
      .returning();
    if (deleteReview.length === 0) {
      return errorResponse("error deleting Review", false, 500);
    }

    const productId = deleteReview[0].productId;
    const getProductReviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.productId, productId));
    const totalReviewsLength = getProductReviews.length;

    const averageReview =
      totalReviewsLength > 0
        ? getProductReviews.reduce(
            (sum, reviewItem) => sum + reviewItem.reviewValue,
            0
          ) / totalReviewsLength
        : null;

    const updateProductReview = await db
      .update(productTable)
      .set({ averageReview: averageReview as unknown as string })
      .where(eq(productTable.id, productId))
      .returning();

    if (updateProductReview.length === 0) {
      return errorResponse("Rrror updating average product review", false, 400);
    }

    return successResponse("review deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
