import { db } from "@/db";
import { orderItemTable, orderTable, cartTable } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { errorResponse } from "@/utils/errorResponse";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

export const POST = async (req: NextRequest) => {
  // const { userId }: any = auth();

  // if (!userId) {
  //   return errorResponse("user not authenticated", false, 500);
  // }

  const { cartIds } = await req.json();
  if (!cartIds || cartIds.length === 0) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    // Fetch carts in parallel
    const carts = await Promise.all(
      cartIds.map(async (id: any) => {
        const cart = await db
          .select()
          .from(cartTable)
          .where(eq(cartTable.id, id));

        return cart[0];
      })
    );

    // Prepare line items for Stripe Checkout
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      carts.map((cart: any) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          cart_data: {
            name: cart?.title,
          },
          unit_amount: cart?.salePrice
            ? cart?.salePrice * 100
            : cart?.price * 100,
        },
      }));

    // Insert order into database
    const order = await db
      .insert(orderTable)
      .values({
        userId: "1",
        isPaid: false,
      })
      .returning();

    // Insert order items
    await Promise.all(
      carts.map(async (cart: any) => {
        await db
          .insert(orderItemTable)
          .values({
            orderId: order[0]?.id,
            productId: cart?.productId,
            quantity: cart?.quantity,
          });
      })
    );

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.public_domain}/cart?success=1`,
      cancel_url: `${process.env.public_domain}/cart?cancel=1`,
      metadata: {
        order_id: order[0]?.id,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
