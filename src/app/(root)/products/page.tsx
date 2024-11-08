import ProductCard from "@/components/shared/ProductCard";
import Wrapper from "@/components/shared/Wrapper";
import { IProduct } from "@/types/types";
import axios from "axios";
import React from "react";
const ProductsPage = async () => {
  const res = await axios.get("http://localhost:3000/api/product");
  const products = await Promise.all(
    res.data.data.map(async (product: IProduct) => {
      const imgRes = await axios.get(
        "http://localhost:3000/api/product-images?productId=" + product.id
      );
      const images = imgRes.data.data || [];
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        brand: product.brand,
        price: product.price,
        totalStock: product.totalStock,
        salePrice: product.salePrice,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        images,
      };
    })
  );

  return (
    <Wrapper>
      <div>
        <h1 className="text-6xl font-bold text-center  mb-10  ">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 &&
            products.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
