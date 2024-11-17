import CatAndBrandClient from "@/components/shared/CatAndBrandClient";

import Wrapper from "@/components/shared/Wrapper";
import { fetchProductsByCategory } from "@/lib/fetchProductByCategory";

import { IProduct } from "@/types/types";
export const dynamic = "force-dynamic";
const ProductByCategory = async ({
  params,
}: {
  params: { catSlug: string };
}) => {
  const { catSlug } = params;
  const products = (await fetchProductsByCategory(catSlug)) as IProduct[];
  return (
    <Wrapper>
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold text-center  mb-10  ">
          Explore {products[0]?.category}
        </h1>
        <CatAndBrandClient products={products} />
      </div>
    </Wrapper>
  );
};

export default ProductByCategory;
