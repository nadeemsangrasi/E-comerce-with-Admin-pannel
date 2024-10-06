import React from "react";

const DashboardCard = ({
  title,
  quantinty,
}: {
  title: string;
  quantinty: number;
}) => {
  return (
    <div className="w-[250px] border dark:border-gray-300 rounded-lg p-4 mx-auto sm:mx-0 space-y-2">
      <div>
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          {title}
        </span>
        <h1 className=" text-2xl tracking-tight font-semibold">${quantinty}</h1>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          9/10/2022
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
