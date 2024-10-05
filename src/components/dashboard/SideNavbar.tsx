/** @format */
"use client";

import { useState } from "react";
import { Nav } from "@/components/ui/nav";

import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  LogOut,
  Settings,
  BadgeCheck,
  UserRound,
  ShoppingBag,
  LayoutList,
} from "lucide-react";
import { Button } from "../ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px]  border-r px-3  pb-10 pt-24 z-50">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Products",
            href: "/products",
            icon: ShoppingBag,
            variant: "ghost",
          },
          {
            title: "Categories",
            href: "/categories",
            icon: LayoutList,
            variant: "ghost",
          },
          {
            title: "Brands",
            href: "/brands",
            icon: LayoutList,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/orders",
            icon: BadgeCheck,
            variant: "ghost",
          },
          {
            title: "Accounts",
            href: "/accounts",
            icon: UserRound,
            variant: "ghost",
          },
          {
            title: "Logout",
            href: "/",
            icon: LogOut,
            variant: "default",
          },
        ]}
      />
    </div>
  );
}
