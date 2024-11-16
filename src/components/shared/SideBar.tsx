import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import HeaderClient from "./HeaderClient";
import { ModeToggle } from "./ModeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICategoryBrand } from "@/types/types";
import Link from "next/link";

export function SideBar({
  categories,
  brands,
}: {
  categories: ICategoryBrand[];
  brands: ICategoryBrand[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mx-auto sm:mx-0">
          <ul className="sm:gap-12 items-center" role="menu">
            <li className="font-medium text-base sm:text-lg md:text-xl tracking-wide py-2">
              <Link href={"/"}>HOME</Link>
            </li>
            <li className="font-medium text-base sm:text-lg md:text-xl tracking-wider">
              <Link href={"/products"}>PRODUCTS</Link>
            </li>
            <li className="font-medium text-lg sm:text-xl md:text-2xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-medium text-base sm:text-lg md:text-xl tracking-wider">
                    CATEGORIES
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm sm:text-base md:text-lg">
                      {categories?.map((cat) => (
                        <li key={cat.id} className="py-1">
                          <Link href={"/category/" + cat.slug}>{cat.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-medium text-base sm:text-lg md:text-xl tracking-wider">
                    BRANDS
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm sm:text-base md:text-lg">
                      {brands?.map((brand) => (
                        <li key={brand.id} className="py-1">
                          <Link href={"/brand/" + brand.slug}>
                            {brand.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li className="font-medium text-lg sm:text-xl md:text-2xl my-4">
              <ModeToggle />
            </li>
            <div className="space-y-2">
              <HeaderClient />
            </div>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
