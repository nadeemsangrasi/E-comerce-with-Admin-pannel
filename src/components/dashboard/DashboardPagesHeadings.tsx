import React from "react";

const DashboardPagesHeadings = ({
  primaryText,

  items,
}: {
  primaryText: string;

  items: number;
}) => {
  return (
    <>
      {" "}
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        {primaryText}({items || "0"})
      </h1>
      <p className="text-gray-500 text-base font-medium dark:text-gray-400 ">
        manage your store {primaryText.toLowerCase()}
      </p>
    </>
  );
};

export default DashboardPagesHeadings;
