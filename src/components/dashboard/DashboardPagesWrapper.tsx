import React from "react";

const DashboardPagesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="my-10 mx-3 sm:mx-10 w-full">{children}</div>;
};

export default DashboardPagesWrapper;
