import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const adminRoutes = [
  "/dashboard",
  "/accounts",
  "/admin-brands",
  "/admin-categories",
  "/admin-products",
  "/orders",
  "/new-product",
];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  if (
    !userId &&
    (currentUrl.pathname.startsWith("/carts") ||
      adminRoutes.some((route) => currentUrl.pathname.startsWith(route)))
  ) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  if (
    userId &&
    adminRoutes.some((route) => currentUrl.pathname.startsWith(route))
  ) {
    try {
      const clerkCl = clerkClient();

      const user = await clerkCl.users.getUser(userId!);
      const role = user?.publicMetadata?.role;

      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      const err = error as Error;
      console.log(err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/accounts/:path*",
    "/admin-brands/:path*",
    "/admin-categories/:path*",
    "/admin-products/:path*",
    "/orders/:path*",
    "/new-product/:path*",
    "/sign-in",
    "/sign-up",
    "/carts",
    "/api/((?!webhooks).)*",
  ],
};
