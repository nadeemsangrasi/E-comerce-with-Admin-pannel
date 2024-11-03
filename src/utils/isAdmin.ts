import { auth, clerkClient } from "@clerk/nextjs/server";
import { errorResponse } from "./errorResponse";

export const isAdmin = async () => {
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
};
