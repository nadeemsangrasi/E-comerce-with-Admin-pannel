"use client";
import ProductCard from "@/components/shared/ProductCard";
import React, { useEffect, useState } from "react";

export const ProductClient = ({ productsProp }: any) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productsProp);
  }, []);
  return (
    
  );
};
