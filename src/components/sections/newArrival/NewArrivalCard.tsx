import { MoveRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

const NewArrivalCard = ({
  img,
  title,
}: {
  img: StaticImageData;
  title: string;
}) => {
  return (
    <div className="w-[400px] mx-auto">
      <div>
        <Image src={img} alt="image" />
      </div>
      <Link href="/products">
        <div className="flex justify-between items-center mt-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium">{title}</h3>
            <span className="text-sm sm:text-lg  text-medium text-gray-600 dark:text-gray-400">
              Explore Now!
            </span>
          </div>
          <MoveRight size={36} color="#808080" strokeWidth={1.5} />
        </div>
      </Link>
    </div>
  );
};

export default NewArrivalCard;
