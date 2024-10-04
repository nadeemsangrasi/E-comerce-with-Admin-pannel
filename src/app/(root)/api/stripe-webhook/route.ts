import { db } from "@/db";
import { orderItemTable, orderTable, productTable } from "@/db/schema";
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
    return errorResponse(err.message, false, 500);
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address as Stripe.Address;
  const addressComponents = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.country,
    address.postal_code,
  ];
  const addressString = addressComponents.filter((a) => a !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    await db
      .update(orderTable)
      .set({
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      })
      .where(
        eq(orderTable.id, session?.metadata?.orderId as unknown as number)
      );

    const orderItems = await db
      .select()
      .from(orderItemTable)
      .where(
        eq(
          orderItemTable.orderId,
          session?.metadata?.orderId as unknown as number
        )
      );

    await Promise.all(
      orderItems.map(async (item) => {
        const products = await db
          .select()
          .from(productTable)
          .where(eq(productTable.id, item.productId));
        if (products[0].totalStock >= item.quantity) {
          const newStock = products[0].totalStock - item.quantity;
          return db
            .update(productTable)
            .set({
              totalStock: newStock,
              isArchive: true,
            })
            .where(eq(productTable.id, item.productId));
        } else {
          const newStock = products[0].totalStock - item.quantity;
          return db
            .update(productTable)
            .set({
              totalStock: newStock,
            })
            .where(eq(productTable.id, item.productId));
        }
      })
    );
  }
  return successResponse("order paid successfully", true, 200);
};
