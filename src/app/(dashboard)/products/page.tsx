"use client";
import AddNewButton from "@/components/dashboard/AddNewButton";
import DashboardPagesHeadings from "@/components/dashboard/DashboardPagesHeadings";
import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";

import ProductCard from "@/components/shared/ProductCard";
import { useProductContext } from "@/contexts/productsStore/ProductStore";

import { IProduct } from "@/types/types";

const ProductPage = () => {
  const { products, loading } = useProductContext();

  return (
    <DashboardPagesWrapper>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-2">
        <div>
          <DashboardPagesHeadings
            primaryText="Products"
            items={products?.length}
          />
        </div>
        <AddNewButton btnType="product" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 ">
        {loading ? (
          <div>loading....</div>
        ) : (
          products?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </DashboardPagesWrapper>
  );
};

export default ProductPage;
