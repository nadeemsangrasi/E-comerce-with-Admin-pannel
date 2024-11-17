"use client";

import ProductButton from "./ProductButton";
import Image from "next/image";
import { ExpandIcon, ShoppingBag, Star } from "lucide-react";
import { IProduct } from "@/types/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ProductCard = ({
  product,
  isUserSide,
}: {
  product: IProduct;
  isUserSide: boolean;
}) => {
  const { products, setProducts, addToCart } = useProductContext();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();

  const handleDeleteProduct = async () => {
    const previousProducts = [...products];

    setProducts(products.filter((p: IProduct) => p.id !== product.id));

    try {
      const response = await axios.delete(
        `/api/product?productId=${product.id}`
      );

      if (response.status !== 200) {
        const errorMessage = response.data.message;
        console.error(errorMessage);
        toast.error(errorMessage);
        setProducts(previousProducts);
        return;
      }

      toast.success(response.data.message);
    } catch (error) {
      setProducts(previousProducts);

      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage =
        (axiosError?.response?.data as { message: string })?.message ||
        "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleEditProduct = () => {
    router.push("/create-product?productId=" + product.id);
  };

  return (
    <div className="w-[280px] border dark:border-gray-300 rounded-lg p-3 mx-auto h-fit">
      <Link href={"/products/" + product?.id}>
        <div className="overflow-hidden relative group">
          <Image
            src={product.images[0]?.imageUrl || ""}
            alt="product image"
            width={1000}
            height={1000}
            className="w-full hover:scale-110 duration-150 hover:duration-150 "
          />

          <ExpandIcon
            className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer group-hover:duration-300 top-1/2 "
            size={32}
          />
          <span className="absolute  right-1 top-1">
            {product?.salePrice ? (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-[12px] font-medium">
                {Math.floor(
                  ((Number(product?.price) - Number(product?.salePrice)) /
                    Number(product?.price)) *
                    100
                )}
                % OFF
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
      </Link>
      {/* Image Container */}

      {/* Product Information */}
      <div className="space-y-2">
        <div className="flex gap-4 justify-between items-center  ">
          <h1
            className="mt-2 text-[1.4rem] leading-[2rem] tracking-tight font-semibold "
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {product?.title}
          </h1>

          <span className="flex items-center gap-1 ">
            <ShoppingBag size={20} />

            {product?.totalStock}
          </span>
        </div>
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                star <= Number(product.averageReview)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {product?.category}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {product.brand}
          </p>
        </div>
        <div className="flex justify-between py-1">
          {product.salePrice ? (
            <>
              <p className="line-through text-lg font-medium text-red-600">
                ${product.price}
              </p>
              <p className="text-lg font-medium text-green-600">
                ${product.salePrice}
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-green-600">
                ${product.price}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-2 gap-4">
        {role === "admin" && !isUserSide ? (
          <>
            <ProductButton
              label="Delete"
              onClick={handleDeleteProduct}
              className="w-full"
            />
            <ProductButton
              label="Edit"
              onClick={handleEditProduct}
              className="w-full"
            />
          </>
        ) : (
          <ProductButton
            label="Add to cart"
            onClick={() => {
              addToCart(product);
            }}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
