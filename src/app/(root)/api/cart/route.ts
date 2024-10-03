import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    return errorResponse("user not authenticated", false, 500);
  }

  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return errorResponse("all fields are required", false, 400);
  }
  if (isUser !== userId) {
    return errorResponse("you are not authorized for this request", false, 403);
  }
  try {
    const carts = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, userId));

    if (carts.length === 0) {
      return errorResponse("carts not found", false, 404);
    }

    return successResponse("Cart fetched successfully", true, 200, carts);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
export const POST = async (req: NextRequest) => {
  // const { userId: isUser } = auth();
  // if (!isUser) {
  //   return errorResponse("user not authenticated", false, 500);
  // }

  const {
    userId,
    productId,
    productTitle,
    productImage,
    productPrice,
    productSalePrice,
    quantity,
    productStock,
  } = await req.json();

  if (
    !userId ||
    !productId ||
    !productTitle ||
    !productImage ||
    !productPrice ||
    !quantity ||
    !productStock
  ) {
    return errorResponse("all fields are required", false, 400);
  }
  // if (isUser !== userId) {
  //   return errorResponse("you are not authorized for this request", false, 403);
  // }
  try {
    const existingCart = await db
      .select()
      .from(cartTable)
      .where(
        and(eq(cartTable.productId, productId), eq(cartTable.userId, userId))
      );
    if (existingCart.length > 0) {
      if (existingCart[0].quantity < productStock) {
        const newQuantity = existingCart[0].quantity + 1;
        if (existingCart[0].productSalePrice) {
          const newSalePrice = parseFloat(
            (
              existingCart[0].productSalePrice +
              existingCart[0].productSalePrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productSalePrice: newSalePrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));
        } else {
          const newPrice = parseFloat(
            (
              existingCart[0].productPrice +
              existingCart[0].productPrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productPrice: newPrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));
        }
        return successResponse("Product incremented successfully", true, 200);
      } else {
        return errorResponse("Product is out of stock", false, 500);
      }
    } else {
      const newCart = await db
        .insert(cartTable)
        .values({
          userId,
          productId,
          productTitle,
          productImage,
          productPrice,
          productSalePrice,
          quantity,
          productStock,
        })
        .returning();

      if (newCart.length === 0) {
        return errorResponse("Error adding new cart in db", false, 500);
      }
      return successResponse("Product added to cart", true, 200);
    }
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  // const { userId: isUser } = auth();
  // if (!isUser) {
  //   return errorResponse("user not authenticated", false, 500);
  // }

  const { reqType, cartId, userId } = await req.json();

  if (!userId || !cartId) {
    return errorResponse("all fields are required", false, 400);
  }

  // if (isUser !== userId) {
  //   return errorResponse("you are not authorized for this request", false, 403);
  // }

  try {
    const existingCart = await db
      .select()
      .from(cartTable)
      .where(and(eq(cartTable.id, cartId), eq(cartTable.userId, userId)));
    if (existingCart.length === 0) {
      return errorResponse("Cart product not found", false, 404);
    }

    if (reqType === "increment") {
      if (existingCart[0].quantity >= existingCart[0].productStock) {
        return errorResponse("Product out of stock", false, 500);
      } else {
        const newQuantity = existingCart[0].quantity + 1;
        if (existingCart[0].productSalePrice) {
          const newSalePrice = parseFloat(
            (
              existingCart[0].productSalePrice +
              existingCart[0].productSalePrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productSalePrice: newSalePrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));
        } else {
          const newPrice = parseFloat(
            (
              existingCart[0].productPrice +
              existingCart[0].productPrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productPrice: newPrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));
        }
        return successResponse("Product incremented successfully", true, 200);
      }
    } else if (reqType === "decrement") {
      if (existingCart[0].quantity > 1) {
        const newQuantity = existingCart[0].quantity - 1;

        if (existingCart[0].productSalePrice) {
          const newSalePrice = parseFloat(
            (
              existingCart[0].productSalePrice -
              existingCart[0].productSalePrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productSalePrice: newSalePrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));

          return successResponse("Product decremented successfully", true, 200);
        } else {
          const newPrice = parseFloat(
            (
              existingCart[0].productPrice -
              existingCart[0].productPrice / existingCart[0].quantity
            ).toFixed(2)
          );

          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productPrice: newPrice,
            })
            .where(eq(cartTable.id, existingCart[0].id));

          return successResponse("Product decremented successfully", true, 200);
        }
      } else {
        return errorResponse("Cannot decrement product below 1", false, 500);
      }
    }
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

  const userId = req.nextUrl.searchParams.get("userId");
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!userId || !cartId) {
    return errorResponse("all fields are required", false, 400);
  }
  if (isUser !== userId) {
    return errorResponse("you are not authorized for this request", false, 403);
  }
  try {
    const deletedCart = await db
      .delete(cartTable)
      .where(eq(cartTable.id, cartId as unknown as number))
      .returning();
    if (deletedCart.length === 0) {
      return errorResponse("cart not found", false, 404);
    }
    return successResponse("Cart deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
