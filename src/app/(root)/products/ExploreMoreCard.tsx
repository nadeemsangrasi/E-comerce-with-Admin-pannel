import { IProduct } from "@/types/types";
import dayjs from "dayjs";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ExploreMoreCard = ({ product }: { product: IProduct }): JSX.Element => {
  return (
    <aside className="flex w-full max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-auto">
      <Link href={`/products/${product.id}`} className="flex items-start gap-4">
        {product.images[0] && (
          <Image
            src={product.images[0].imageUrl}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-md"
            height={1000}
            width={1000}
          />
        )}

        <div className="flex-1 space-y-2">
          <h1 className="text-md font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {product.title}
          </h1>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-red-500">{product.category}</span>
            <span className="ml-2">
              | {dayjs(product.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>

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

          <div className="flex items-center text-sm font-medium">
            {product.salePrice ? (
              <>
                <span className="text-green-600 dark:text-green-400">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-red-600 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default ExploreMoreCard;
