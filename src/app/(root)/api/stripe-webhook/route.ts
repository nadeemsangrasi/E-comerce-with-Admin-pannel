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

import { eq } from "drizzle-orm";
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

  // Handle the event
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

        if (isNaN(orderId)) {
          return errorResponse("Invalid order ID", false, 400);
        }

        // Proceed with the rest of the logic using `orderId`
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
              .where(eq(cartTable.productId, item.productId));
          })
        );

        console.log("✅ Order processed successfully.");
        break;

      // Handle other event types if necessary
      // case 'payment_intent.succeeded':
      //   // Implement logic if needed
      //   break;

      default:
        // Unexpected event type
        console.warn(`⚠️ Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return successResponse("Webhook received.", true, 200);
  } catch (processingError) {
    console.error("❌ Error processing webhook event:", processingError);
    return errorResponse("Error processing webhook event.", false, 500);
  }
};
