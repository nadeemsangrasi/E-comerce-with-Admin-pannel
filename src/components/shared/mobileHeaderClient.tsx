"use client";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import React from "react";

import Link from "next/link";

import { useProductContext } from "@/contexts/productsStore/ProductStore";

const MobileHeaderClient = () => {
  const { cart } = useProductContext();
  const { user } = useUser();
  return (
    <>
      <li className="font-medium text-xl sm:text-2xl 0">
        <Link href={"/carts"} className="flex gap-1 items-center">
          <ShoppingCart fontSizeAdjust={20} /> {cart.length}
        </Link>
      </li>
      <li className="font-medium text-sm sm:text-xl flex gap-2">
        <ClerkLoading>
          {user && (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
          )}
        </ClerkLoading>
        <ClerkLoaded>
          {user && (
            <>
              <UserButton />
            </>
          )}
        </ClerkLoaded>
      </li>
    </>
  );
};

export default MobileHeaderClient;
