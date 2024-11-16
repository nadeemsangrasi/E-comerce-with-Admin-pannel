import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import AllProductsClient from "./AllProductsClient";
import { fetchProducts } from "@/lib/fetchAllProducts";
const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <Wrapper>
      <AllProductsClient products={products} />
    </Wrapper>
  );
};

export default ProductsPage;
