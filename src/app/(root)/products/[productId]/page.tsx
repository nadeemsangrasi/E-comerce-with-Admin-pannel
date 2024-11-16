import Wrapper from "@/components/shared/Wrapper";
import ReviewSection from "../ReviewSection";
import { fetchSingleProduct } from "@/lib/fetchSingleProduct";
import ProductClient from "../ProductClient";
import { IProduct } from "@/types/types";
import { fetchProductsByCategory } from "@/lib/fetchProductByCategory";
import ExploreMoreCard from "../ExploreMoreCard";

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = params;

  const product = (await fetchSingleProduct(productId)) as IProduct;
  const suggestedProducts = await fetchProductsByCategory(product?.catSlug);

  return (
    <Wrapper>
      <ProductClient product={product} />
      <div className="py-8 flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-[70%]">
          <ReviewSection productId={productId} />
        </div>

        <div className="w-full lg:w-[30%] space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left mt-8 lg:mt-12 pb-6">
            Similar Items
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {suggestedProducts?.map(
              (p: IProduct) =>
                !product.isArchive && (
                  <ExploreMoreCard key={p?.id} product={p} />
                )
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProductPage;
