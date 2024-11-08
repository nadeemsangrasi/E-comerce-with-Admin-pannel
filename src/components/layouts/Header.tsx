"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logos/Vector.png";
import { ModeToggle } from "../shared/ModeToggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ClerkLoading, ClerkLoaded, useUser, UserButton } from "@clerk/nextjs";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
const Header = () => {
  const router = useRouter();
  const { cart } = useProductContext();
  const { user, isLoaded } = useUser();
  return (
    <div className=" bg-white dark:bg-primary-black dark:text-white max-w-screen-2xl z-50 flex justify-between items-center bg-secondary-black text-black px-2 md:px-10 lg:px-16 py-4   w-full    fixed left-1/2 -translate-x-1/2 flex-wrap  top-0">
      <h1 className="font-bold text-xl sm:text-2xl mx-auto sm:mx-0">
        <Link href={"/"} className="flex gap-2 ">
          <Image src={logo} alt="logo" className="dark:invert" />
          FASHION
        </Link>
      </h1>
      <div className="mx-auto sm:mx-0">
        <ul className="flex gap-2 sm:gap-12 items-center">
          <li className="font-medium text-sm sm:text-xl tracking-wider ">
            <Link href={"/products"}>PRODUCTS</Link>
          </li>
          <li className="font-medium text-xl sm:text-2xl 0">
            <ModeToggle />
          </li>
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
              {user ? (
                <>
                  <UserButton />
                  {/* <Link href="/user-profile">profile</Link> */}
                </>
              ) : (
                <>
                  <Button onClick={() => router.push("/sign-in")}>
                    Sign in
                  </Button>
                  <Button onClick={() => router.push("/sign-up")}>
                    Sign up
                  </Button>
                </>
              )}
            </ClerkLoaded>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
