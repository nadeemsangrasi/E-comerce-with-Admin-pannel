import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-screen-2xl mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-20 ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
