import React from "react";
import Link from "next/link";

import Image from "next/image";
import logo from "@/assets/logos/Vector.png";
import { ModeToggle } from "../shared/ModeToggle";

import { NavSelect } from "../shared/NavSelect";
import HeaderClient from "../shared/HeaderClient";
import { fetchBrands, fetchCategory } from "@/lib/fetchBrandAndCategory";
import { SideBar } from "../shared/SideBar";
const Header = async () => {
  const categories = await fetchCategory();
  const brands = await fetchBrands();
  return (
    <div className=" bg-white dark:bg-primary-black dark:text-white max-w-screen-2xl z-50 flex justify-between items-center bg-secondary-black text-black px-2 md:px-10 lg:px-16 py-4   w-full    fixed left-1/2 -translate-x-1/2 flex-wrap  top-0">
      <h1 className="font-bold text-xl sm:text-2xl  sm:mx-0">
        <Link href={"/"} className="flex gap-2 ">
          <Image src={logo} alt="logo" className="dark:invert" />
          FASHION
        </Link>
      </h1>
      <div className="md:hidden flex gap-1">
        <div className="list-none flex gap-3 items-center">
          <HeaderClient />
        </div>
        <SideBar categories={categories} brands={brands} />
      </div>

      <div className="hidden md:block mx-auto sm:mx-0">
        <ul className="flex gap-2 sm:gap-12 items-center">
          <li className="font-medium text-sm sm:text-xl tracking-wider ">
            <Link href={"/"}>HOME</Link>
          </li>
          <li className="font-medium text-sm sm:text-xl tracking-wider ">
            <Link href={"/products"}>PRODUCTS</Link>
          </li>
          <li className="font-medium text-xl sm:text-2xl 0">
            <NavSelect data={categories} label="CATEGORIES" />
          </li>
          <li className="font-medium text-xl sm:text-2xl 0">
            <NavSelect data={brands} label="BRANDS" />
          </li>
          <li className="font-medium text-xl sm:text-2xl 0">
            <ModeToggle />
          </li>
          <HeaderClient />
        </ul>
      </div>
    </div>
  );
};

export default Header;
