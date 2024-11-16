"use client";
import ProductButton from "@/components/shared/ProductButton";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { IProduct } from "@/types/types";
import { RotateCcw, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProductClient = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useProductContext();
  return (
    <div className="-mt-3 grid grid-cols-1 md:grid-cols-2 gap-12   w-[80%] ">
      <div className="space-y-4 ">
        <div className="aspect-square w-full relative bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={product?.images[selectedImage].imageUrl || ""}
            alt="Navy suit main view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            height={1000}
            width={1000}
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product?.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                selectedImage === index
                  ? "border-primary-yellow border-4 shadow-md"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={`Navy suit view ${index + 1}`}
                className="w-full h-full object-cover"
                height={1000}
                width={1000}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {/* Product Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {product?.totalStock > 0 ? "In Stock" : "Out Of Stock"}
            </span>
          </div>
          <h1 className="text-4xl font-bold dark:text-white text-gray-900">
            {product?.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <Star
                  key={i}
                  className={` w-5 h-5  ${
                    star <= Number(product?.averageReview)
                      ? "text-yellow-400 fill-current"
                      : "fill-black dark:fill-white"
                  } `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            {product?.salePrice ? (
              <>
                <p className="text-3xl font-bold text-green-600">
                  ${product?.salePrice}
                </p>
                <p className="text-xl line-through text-red-500">
                  ${product?.price}
                </p>
              </>
            ) : (
              <p className="text-3xl font-bold text-green-600">
                ${product?.price}
              </p>
            )}
            {product?.salePrice ? (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
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
          </div>
          <p className="text-sm text-gray-500">{product?.description}</p>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">
              Product Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-500">Brand</p>
                <p className="font-medium">{product?.brand}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{product?.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">Stock</p>
                <p className="font-medium">{product?.totalStock} pieces</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-gray-600" />
            <p className="text-sm">Free Shipping</p>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <p className="text-sm">2 Year Warranty</p>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <p className="text-sm">30-Day Returns</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <ProductButton
            label="Add To Cart"
            onClick={() => addToCart(product)}
            className="w-full py-4 text-lg font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
