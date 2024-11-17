import { db } from "@/db";
import {
  cartTable,
  orderItemTable,
  orderTable,
  productTable,
} from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";

import { and, eq } from "drizzle-orm";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = req.headers.get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const err = error as Error;
    console.error("❌ Webhook signature verification failed:", err.message);
    return errorResponse("Webhook signature verification failed.", false, 400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const address = session.customer_details?.address as Stripe.Address;
        const addressComponents = [
          address.line1,
          address.line2,
          address.city,
          address.state,
          address.country,
          address.postal_code,
        ];
        const addressString = addressComponents.filter((a) => a).join(", ");

        const orderId = Number(session?.metadata?.orderId);
        const userId = session?.metadata?.userId;

        if (isNaN(orderId)) {
          return errorResponse("Invalid order ID", false, 400);
        }
        if (!userId) {
          throw new Error("User ID is null or undefined");
        }
        await db
          .update(orderTable)
          .set({
            isPaid: true,
            address: addressString,
            phone: session?.customer_details?.phone || "",
          })
          .where(eq(orderTable.id, orderId));

        const orderItems = await db
          .select()
          .from(orderItemTable)
          .where(eq(orderItemTable.orderId, orderId));

        await Promise.all(
          orderItems.map(async (item) => {
            const products = await db
              .select()
              .from(productTable)
              .where(eq(productTable.id, item.productId));

            if (products.length === 0) {
              throw new Error(`Product with ID ${item.productId} not found.`);
            }

            const product = products[0];
            const newStock = product.totalStock - item.quantity;

            await db
              .update(productTable)
              .set({
                totalStock: newStock,
                isArchive: newStock <= 0,
              })
              .where(eq(productTable.id, item.productId));

            await db
              .delete(cartTable)
              .where(
                and(
                  eq(cartTable.productId, item.productId),
                  eq(cartTable.userId, userId)
                )
              );
          })
        );

        console.log("✅ Order processed successfully.");
        break;

      default:
        console.warn(`⚠️ Unhandled event type ${event.type}`);
    }

    return successResponse("Webhook received.", true, 200);
  } catch (processingError) {
    console.error("❌ Error processing webhook event:", processingError);
    return errorResponse("Error processing webhook event.", false, 500);
  }
};
