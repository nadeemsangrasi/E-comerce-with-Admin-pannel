import * as React from "react";
import { ICategoryBrand } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import Link from "next/link";

export function NavSelect({
  label,
  data,
}: {
  label: string;
  data: ICategoryBrand[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="bg-transparent hover:bg-transparent p-0 -mt-2 sm:-mt-1 sm:text-xl font-medium hover:underline outline-none cursor-pointer">
          {label}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-primary-black text-primary-white z-[99]">
        <DropdownMenuRadioGroup>
          {data?.map((item: ICategoryBrand) => (
            <Link
              href={`${
                label.toLocaleLowerCase() === "brands"
                  ? "/brand/" + item.slug
                  : "/category/" + item.slug
              }`}
              key={item.id}
            >
              <DropdownMenuRadioItem
                value="bottom"
                className="hover:text-primary-black font-semibold cursor-pointer"
              >
                {item.name}
              </DropdownMenuRadioItem>
            </Link>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
