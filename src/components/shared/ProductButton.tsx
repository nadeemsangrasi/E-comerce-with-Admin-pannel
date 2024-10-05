import React from "react";
import { Button } from "../ui/button";

const ProductButton = ({
  label,
  btnType,
  className,
}: {
  label: string;
  btnType: string;
  className?: string;
}) => {
  return <Button className={"" + className}>{label}</Button>;
};

export default ProductButton;
