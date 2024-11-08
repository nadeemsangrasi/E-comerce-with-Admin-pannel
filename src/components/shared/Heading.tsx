import Image from "next/image";
import React from "react";
import victor from "@/assets/logos/Vector 8.png";
const Heading = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div className="relative ">
      <h3 className={`${className} text-4xl font-extrabold z-20 absolute `}>
        {label}
      </h3>
      <Image
        src={victor}
        alt="victor"
        className="w-32 absolute top-4 left-32"
      />
    </div>
  );
};

export default Heading;
