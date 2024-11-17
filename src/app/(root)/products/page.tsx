import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import AllProductsClient from "./AllProductsClient";
import { fetchProducts } from "@/lib/fetchAllProducts";
export const dynamic = "force-dynamic";
const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <Wrapper>
      <AllProductsClient products={products} />
    </Wrapper>
  );
};

export default ProductsPage;
