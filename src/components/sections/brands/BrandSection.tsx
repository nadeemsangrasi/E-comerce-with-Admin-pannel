import React from "react";
import brand1 from "@/assets/logos/Rectangle 36.png";
import brand2 from "@/assets/logos/Rectangle 38.png";
import brand3 from "@/assets/logos/Rectangle 41.png";
import brand4 from "@/assets/logos/Rectangle 43.png";
import brand5 from "@/assets/logos/Rectangle 44.png";
import brand6 from "@/assets/logos/Rectangle 45.png";
import Image, { StaticImageData } from "next/image";
const brands: StaticImageData[] = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
];
const BrandSection = () => {
  return (
    <div
      className="px-4  sm:px-20 py-8 bg-secondary-yellow max-w-screen-2xl mx-auto"
      id="brands"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4 items-center ">
        {brands.map((brand: StaticImageData) => (
          <Image
            key={brand.src}
            src={brand}
            alt="brand logo"
            width={1000}
            height={1000}
            className="w-1/2 mix-blend-multiply mx-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
