import { Edit, Trash } from "lucide-react";
import React from "react";

const CategoryBrandCard = ({
  title,
  date,
  cardType,
}: {
  title: string;
  date: string;
  cardType: string;
}) => {
  return (
    <div className="w-[250px] border dark:border-gray-300 rounded-lg p-4 mx-auto sm:mx-0 space-y-2">
      <div>
        <h1 className=" text-2xl tracking-tight font-semibold">
          Category title
        </h1>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          Date
        </span>
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          9/10/2022
        </span>
      </div>
      <div className="flex justify-between mt-2 ">
        <Edit className="text-green-600 font-semibold" />
        <Trash className="text-red-600 font-semibold" />
      </div>
    </div>
  );
};

export default CategoryBrandCard;
