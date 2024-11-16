import { ICart } from "@/types/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartCard = ({
  cart,
  handleCartIncrement,
  handleCartDecrement,
  deleteCart,
}: {
  cart: ICart;
  handleCartIncrement: (id: string) => void;
  handleCartDecrement: (id: string) => void;
  deleteCart: (id: string) => void;
}) => {
  return (
    <div
      key={cart?.id}
      className="md:flex gap-6 w-full lg:w-full sm:w-3/4 mx-auto bg-primary-gray dark:bg-gray-800 my-4 rounded-md px-4 pb-4 lg:pb-0"
    >
      <div>
        <Link href={`/products/${cart?.id}`}>
          <Image
            src={cart?.productImage}
            alt={cart?.productTitle}
            width={300}
            height={300}
            className="w-[300px] h-[300px] object-cover"
          />
        </Link>
      </div>
      <div className="mt-20 space-y-3">
        <div className="space-y-2">
          <Link href={`/products/${cart?.id}`}></Link>
          <h1 className="text-2xl sm:text-3xl font-bold ">
            {cart?.productTitle}
          </h1>

          <h1 className="text-xl sm:text-2xl text-red-500 ">
            $
            {cart?.productSalePrice
              ? cart?.productSalePrice
              : cart?.productPrice}
          </h1>
        </div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2">
            <Minus
              className="cursor-pointer"
              onClick={() => handleCartDecrement(cart?.id)}
            />
            {cart?.quantity}
            <Plus
              className="cursor-pointer"
              onClick={() => handleCartIncrement(cart?.id)}
            />
          </div>
          <h1>
            <Trash2
              onClick={() => deleteCart(cart?.id)}
              className="cursor-pointer"
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
