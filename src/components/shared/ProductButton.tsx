import React from "react";
import { Button } from "../ui/button";

const ProductButton = ({
  label,
  className,
  onClick,
}: {
  label: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <Button className={"" + className} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ProductButton;
