import CatAndBrandClient from "@/components/shared/CatAndBrandClient";
import Wrapper from "@/components/shared/Wrapper";
import { fetchProductsByBrand } from "@/lib/fetchProductsByBrand";
import { IProduct } from "@/types/types";

const ProductByBrand = async ({
  params,
}: {
  params: { brandSlug: string };
}) => {
  const { brandSlug } = params;
  const products = (await fetchProductsByBrand(brandSlug)) as IProduct[];
  return (
    <Wrapper>
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center  mb-10  ">
          Explore {products[0]?.brand}
        </h1>
        <CatAndBrandClient products={products} />
      </div>
    </Wrapper>
  );
};

export default ProductByBrand;
