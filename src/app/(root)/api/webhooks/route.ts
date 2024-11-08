import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { userTable } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred while verifying the webhook", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url, username } =
      evt.data;

    try {
      const newUser = await db
        .insert(userTable)
        .values({
          clerkId: id as string,
          firstName: first_name || "",
          lastName: last_name || "",
          imageUrl: image_url || "",
          username: username || "",
          email: email_addresses[0]?.email_address || "",
          role: "user",
        })
        .returning();

      if (newUser.length > 0) {
        const clerk = clerkClient();
        await clerk.users.updateUserMetadata(id as string, {
          publicMetadata: {
            userId: newUser[0].clerkId,
            role: newUser[0].role,
          },
        });
      }

      return new Response("User created successfully", { status: 200 });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return new Response("Error occurred while inserting the user", {
        status: 500,
      });
    }
  }

  return new Response("Webhook event type not handled", { status: 200 });
}
