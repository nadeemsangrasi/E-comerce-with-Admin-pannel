import { db } from "@/db";
import { productImageTable } from "@/db/schema";
import { errorResponse } from "@/utils/errorResponse";
import { successResponse } from "@/utils/successResponse";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    return errorResponse("User not authenticated", false, 500);
  }

  const clerk = clerkClient();

  const user = await clerk.users.getUser(userId);
  const role = user.publicMetadata.role;
  if (role !== "admin") {
    return errorResponse(
      "Only admin is authorized for this request",
      false,
      403
    );
  }

  const { images } = await req.json();
  if (!images || !Array.isArray(images)) {
    throw new Error("Invalid data format");
  }

  try {
    const productImages = await Promise.all(
      images.map(async (image: any) => {
        const productImage = await db
          .insert(productImageTable)
          .values({
            productId: image.productId,
            imageUrl: image.imageUrl,
          })
          .returning();
        return productImage[0];
      })
    );

    if (productImages.length === 0) {
      console.error("Error adding product images");
      return errorResponse("Error adding product images", false, 500);
    }

    return successResponse("Product images added successfully", true, 200);
  } catch (error) {
    const err = error as Error;
    return errorResponse(err.message, false, 500);
  }
};
