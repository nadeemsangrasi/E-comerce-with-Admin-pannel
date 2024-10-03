import { db } from "@/db";
import { orderItemTable, orderTable, productTable } from "@/db/schema";
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

  const { productIds } = await req.json();
  if (!productIds || productIds.length === 0) {
    return errorResponse("all fields are required", false, 400);
  }

  try {
    // Fetch products in parallel
    const products = await Promise.all(
      productIds.map(async (id: any) => {
        const product = await db
          .select()
          .from(productTable)
          .where(eq(productTable.id, id));

        return product[0];
      })
    );

    // Prepare line items for Stripe Checkout
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      products.map((product: any) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: product?.title,
          },
          unit_amount: product?.salePrice
            ? product?.salePrice * 100
            : product?.price * 100,
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
      products.map(async (product: any) => {
        await db
          .insert(orderItemTable)
          .values({ orderId: order[0]?.id, productId: product?.id });
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
