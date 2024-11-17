import Heading from "@/components/shared/Heading";
import ProductCard from "@/components/shared/ProductCard";
import Wrapper from "@/components/shared/Wrapper";
import { fetchProducts } from "@/lib/fetchAllProducts";
import { IProduct } from "@/types/types";
export const dynamic = "force-dynamic";
import React from "react";

const FeaturedSection = async () => {
  const products = await fetchProducts();

  return (
    <Wrapper>
      <Heading label="Featured Products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-16">
        {products.length > 0 &&
          products.map(
            (product: IProduct) =>
              product.isFeatured &&
              !product.isArchive && (
                <ProductCard
                  key={product.id}
                  product={product}
                  isUserSide={true}
                />
              )
          )}
      </div>
    </Wrapper>
  );
};

export default FeaturedSection;
