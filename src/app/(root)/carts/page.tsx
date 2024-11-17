"use client";

import Wrapper from "@/components/shared/Wrapper";
export const dynamic = "force-dynamic";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import { ICart, IProduct } from "@/types/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";
import CartCard from "./CartCard";
import ExploreMoreCard from "../products/ExploreMoreCard";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    totalAmount,
    isCartLoading,
    handleCartIncrement,
    handleCartDecrement,
    products,
  } = useProductContext();

  const handleCheckOut = async () => {
    try {
      const response = await axios.post("/api/checkout", {
        cartIds: cart.map((item: ICart) => item.id),
      });

      window.location = response.data.url;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to submit review", axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };

  return (
    <Wrapper>
      <div className="py-16 ">
        <div className="my-16">
          {isCartLoading ? (
            <div className="flex items-center justify-center py-24 gap-2 flex-wrap">
              <Loader text="Loading carts..." />
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold mt-8 text-black dark:text-white">
                Available cart
              </h1>
              <div className="grid lg:grid-cols-2 grid-cols-1 ">
                <div className="flex flex-col ">
                  {cart &&
                    cart?.map((cart: ICart) => (
                      <CartCard
                        key={cart?.id}
                        cart={cart}
                        handleCartIncrement={handleCartIncrement}
                        handleCartDecrement={handleCartDecrement}
                        deleteCart={removeFromCart}
                      />
                    ))}
                </div>
                <div>
                  <div className="checkout space-y-4 mt-12 w-fit mx-auto h-fit bg-primary-yellow px-8 py-8 rounded-md text-black">
                    <h1 className="text-2xl sm:text-3xl font-bold  ">
                      Order summary
                    </h1>
                    <div className="flex justify-between">
                      <h2 className="text-xl font-semibold">Quantity</h2>
                      <h2 className="text-xl font-semibold">
                        {cart.length} Product
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text-xl font-semibold">Subtotal</h2>
                      <h2 className="text-xl font-semibold">${totalAmount}</h2>
                    </div>
                    <button
                      className="bg-black text-white  font-bold py-2 px-4 rounded-md mx-auto block my-4"
                      onClick={handleCheckOut}
                    >
                      checkout now
                    </button>
                  </div>
                  <div className="w-full  space-y-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center t mt-8 lg:mt-12 pb-6">
                      Explore More
                    </h1>
                    <div className="grid grid-cols-1 gap-4">
                      {products
                        ?.slice(0, 5)
                        .map(
                          (p: IProduct) =>
                            p.isFeatured &&
                            !p.isArchive && (
                              <ExploreMoreCard key={p?.id} product={p} />
                            )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CartPage;
