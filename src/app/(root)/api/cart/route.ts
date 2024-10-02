import { db } from "@/db";
import { cartTable, productTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    errorResponse("user not authenticated", false, 500);
  }

  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    errorResponse("all fields are required", false, 400);
  }
  if (isUser !== userId) {
    errorResponse("you are not authorized for this request", false, 403);
  }
  try {
    const carts = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, userId as unknown as number));

    if (carts.length === 0) {
      errorResponse("carts not found", false, 404);
    }

    successResponse("Cart fetched successfully", true, 200);
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

  const {
    cartId,
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
    !cartId ||
    !productStock
  ) {
    errorResponse("all fields are required", false, 400);
  }
  if (isUser !== userId) {
    errorResponse("you are not authorized for this request", false, 403);
  }
  try {
    const isCart = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.id, cartId));
    if (isCart.length > 0) {
      if (isCart[0].quantity >= productStock) {
        const newQuantity = (isCart[0].quantity += 1);
        if (isCart[0].productSalePrice) {
          const newSaleprice = (isCart[0].productSalePrice +=
            productSalePrice / isCart[0].quantity);
          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productSalePrice: newSaleprice,
            })
            .where(eq(cartTable.id, cartId));
        } else {
          const newPrice = (isCart[0].productPrice +=
            productPrice / isCart[0].quantity);
          await db
            .update(cartTable)
            .set({
              quantity: newQuantity,
              productSalePrice: newPrice,
            })
            .where(eq(cartTable.id, cartId));
        }
      } else {
        return errorResponse("Product is out of stock", false, 500);
      }
    } else {
      const newCart = await db
        .insert(cartTable)
        .values({
          id: cartId,
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
        errorResponse("Error adding new cart in db", false, 500);
      }
      successResponse("Product added to cart", true, 200);
    }
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    errorResponse("user not authenticated", false, 500);
  }

  const {
    reqType,
    cartId,
    productPrice,
    productSalePrice,
    productStock,
    userId,
  } = await req.json();

  if (!userId || !productPrice || !cartId || !productStock) {
    errorResponse("all fields are required", false, 400);
  }

  if (isUser !== userId) {
    errorResponse("you are not authorized for this request", false, 403);
  }

  try {
    const isCart = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.id, cartId));
    if (isCart.length === 0) {
      errorResponse("Cart product not found", false, 404);
    }

    if (reqType === "increment") {
      if (isCart[0].quantity >= productStock) {
        errorResponse("Product out of stock", false, 500);
      } else {
        if (isCart[0].productSalePrice) {
          isCart[0].quantity += 1;
          isCart[0].productSalePrice += productSalePrice / isCart[0].quantity;
        } else {
          isCart[0].quantity += 1;
          isCart[0].productPrice += productPrice / isCart[0].quantity;
        }
      }

      successResponse("product incremented successfully", true, 200);
    } else {
      if (isCart[0].quantity > 1) {
        if (isCart[0].productSalePrice) {
          isCart[0].quantity -= 1;
          isCart[0].productSalePrice -= productSalePrice / isCart[0].quantity;
        } else {
          isCart[0].quantity -= 1;
          isCart[0].productPrice -= productPrice / isCart[0].quantity;
        }
      } else {
        errorResponse("no further decremented product", false, 500);
      }
      successResponse("product decremented successfully", true, 200);
    }
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  const { userId: isUser } = auth();
  if (!isUser) {
    errorResponse("user not authenticated", false, 500);
  }

  const userId = req.nextUrl.searchParams.get("userId");
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!userId || !cartId) {
    errorResponse("all fields are required", false, 400);
  }
  if (isUser !== userId) {
    errorResponse("you are not authorized for this request", false, 403);
  }
  try {
    const isCart = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.id, cartId as unknown as number));
    if (isCart.length === 0) {
      errorResponse("cart not found", false, 404);
    }
    const deletedCart = await db
      .delete(cartTable)
      .where(eq(cartTable.id, cartId as unknown as number))
      .returning();
    if (deletedCart.length === 0) {
      errorResponse("erro deleting cart", false, 500);
    }
    successResponse("Cart deleted successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    errorResponse(err.message, false, 500);
  }
};
