import ProductCard from "@/components/shared/ProductCard";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.length > 0 &&
            products?.map(
              (product: IProduct) =>
                !product.isArchive && (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isUserSide={true}
                  />
                )
            )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductByBrand;
