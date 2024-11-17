"use client";
import {
  ICart,
  ICategoryBrand,
  IOrder,
  IProduct,
  ProductContextType,
} from "@/types/types";
import { useUser } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductStore: FC<{ children: React.ReactNode }> = ({ children }) => {
  // product
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [catLoading, setCatLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<ICategoryBrand[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();
  useEffect(() => {
    const fetcher = async () => {
      if (role !== "admin") {
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/product`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );

        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }

        setProducts(
          res.data.data.sort(
            (a: { id: number }, b: { id: number }) => a.id - b.id
          )
        );
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
    const fetchCategory = async () => {
      if (role !== "admin") {
        return;
      }
      try {
        setCatLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN!}/api/category`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );

        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        setCategories(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategory();
    const fetchBrands = async () => {
      if (role !== "admin") {
        return;
      }
      try {
        setBrandLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/brand`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        setBrands(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
      } finally {
        setBrandLoading(false);
      }
    };
    fetchBrands();
    const fetchOrders = async () => {
      if (role !== "admin") {
        return;
      }
      try {
        setOrderLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/order`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
        const updatedOrders = res.data.data.map((item: IOrder) => {
          const products = item.products.join(",");
          return {
            ...item,
            products: products,
          };
        });
        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        setOrders(updatedOrders);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
      } finally {
        setOrderLoading(false);
      }
    };
    fetchOrders();
  }, [role]);

  // carts
  const [cart, setCart] = useState<ICart[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);

  useEffect(() => {
    const total = cart?.reduce(
      (acc, c: ICart) =>
        acc + (c?.productSalePrice ? c?.productSalePrice : c?.productPrice),
      0
    );

    setTotalAmount(total ? parseFloat(total.toFixed(2)) : 0);
  }, [cart]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsCartLoading(true);

        if (!user?.id) {
          console.log("User ID is not available yet. Emptying cart.");
          setCart([]);
          localStorage.removeItem(`cart_${user?.id}`);
          setIsCartLoading(false);
          return;
        }

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart?userId=${user?.id}`,
            {
              headers: {
                "Cache-Control": "no-store",
              },
            }
          );

          if (res.status === 200 && res.data.data && res.data.data.length > 0) {
            console.log("Backend cart loaded:", res.data.data);
            setCart(res.data.data);
            localStorage.setItem(
              `cart_${user?.id}`,
              JSON.stringify(res.data.data)
            );
          } else {
            console.log("No cart in backend, removing from localStorage.");
            setCart([]);
            localStorage.removeItem(`cart_${user?.id}`);
          }
        } catch (backendError) {
          console.error("Backend fetch failed:", backendError);
          console.log("Clearing cart due to backend error");
          setCart([]);
          localStorage.removeItem(`cart_${user?.id}`);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
        localStorage.removeItem(`cart_${user?.id}`);
      } finally {
        setIsCartLoading(false);
      }
    };

    loadCart();
  }, [user?.id]);
  const addToCart = async (item: IProduct) => {
    try {
      if (!user?.id) {
        router.replace("/sign-in");
        toast.error("Please login to add items to cart");
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`,
        {
          userId: user?.id,
          productId: item.id,
          productTitle: item.title,
          productImage: item.images[0].imageUrl,
          productPrice: item.price,
          productSalePrice: item.salePrice > 0 ? item.salePrice : 0,
          quantity: 1,
          productStock: item.totalStock,
        }
      );

      if (res.status !== 200) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.message === "Product is out of stock") {
        toast.error(res.data.message);
        return;
      }

      const newItem = res.data.data;
      const updatedCartWithRealData = cart.some(
        (c: ICart) => c.id === newItem.id
      )
        ? cart.map((c: ICart) => (c.id === newItem.id ? newItem : c))
        : [...cart, newItem];

      setCart(updatedCartWithRealData);
      localStorage.setItem(
        `cart_${user?.id}`,
        JSON.stringify(updatedCartWithRealData)
      );
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      if (!user?.id) {
        toast.error("Please login to remove items from cart");
        return;
      }

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart?userId=${user?.id}&cartId=${itemId}`
      );

      if (res.status !== 200) {
        toast.error(res.data.message);
        return;
      }

      const updatedCart = cart.filter((item: ICart) => item.id !== itemId);
      setCart(updatedCart);

      if (updatedCart.length > 0) {
        localStorage.setItem(`cart_${user?.id}`, JSON.stringify(updatedCart));
      } else {
        localStorage.removeItem(`cart_${user?.id}`);
      }

      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };

  useEffect(() => {
    return () => {
      if (!user?.id) {
        setCart([]);
        localStorage.removeItem(`cart_${user?.id}`);
      }
    };
  }, [user?.id]);

  const handleCartDecrement = async (id: string) => {
    const cartIndex = cart.findIndex((cart: ICart) => cart.id === id);
    if (cartIndex === -1) {
      console.error("cart not found for decrement");
      return;
    }

    const cartItem = cart[cartIndex];

    if (cartItem.quantity <= 1) {
      toast.error("Minimum quantity reached");
      return;
    }

    const updatedCart = cart.map((cart: ICart) =>
      cart.id === id
        ? {
            ...cart,
            quantity: cart.quantity - 1,
            productSalePrice: cart.productSalePrice
              ? parseFloat(
                  (
                    cart.productSalePrice -
                    cart.productSalePrice / cart.quantity
                  ).toFixed(2)
                )
              : cart.productSalePrice,
            productPrice: cart.productSalePrice
              ? cart.productPrice
              : parseFloat(
                  (
                    cart.productPrice -
                    cart.productPrice / cart.quantity
                  ).toFixed(2)
                ),
          }
        : cart
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`,
        {
          reqType: "decrement",
          cartId: id,
          userId: user?.id,
        }
      );
      if (res.status !== 200) {
        const revertCart = cart.map((cart: ICart) =>
          cart.id === id
            ? {
                ...cart,
                quantity: cart.quantity + 1,
                productSalePrice: cart.productSalePrice
                  ? parseFloat(
                      (
                        cart.productSalePrice +
                        cart.productSalePrice / cart.quantity
                      ).toFixed(2)
                    )
                  : cart.productSalePrice,
                productPrice: cart.productSalePrice
                  ? cart.productPrice
                  : parseFloat(
                      (
                        cart.productPrice +
                        cart.productPrice / cart.quantity
                      ).toFixed(2)
                    ),
              }
            : cart
        );
        setCart(revertCart);
        localStorage.setItem("cart", JSON.stringify(revertCart));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };

  const handleCartIncrement = async (id: string) => {
    const cartIndex = cart.findIndex((cart: ICart) => cart.id === id);
    if (cartIndex === -1) {
      console.error("cart not found for increment");
      return;
    }

    const cartItem = cart[cartIndex];
    if (cartItem.productStock <= cartItem.quantity) {
      toast.error("Product is out of stock");
      return;
    }

    const updatedCart = cart.map((cart: ICart) =>
      cart.id === id
        ? {
            ...cart,
            quantity: cart.quantity + 1,
            productSalePrice: cart.productSalePrice
              ? parseFloat(
                  (
                    cart.productSalePrice +
                    cart.productSalePrice / cart.quantity
                  ).toFixed(2)
                )
              : cart.productSalePrice,
            productPrice: cart.productSalePrice
              ? cart.productPrice
              : parseFloat(
                  (
                    cart.productPrice +
                    cart.productPrice / cart.quantity
                  ).toFixed(2)
                ),
          }
        : cart
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`,
        {
          reqType: "increment",
          cartId: id,
          userId: user?.id,
        }
      );
      if (res.status !== 200) {
        const revertCart = cart.map((cart: ICart) =>
          cart.id === id
            ? {
                ...cart,
                quantity: cart.quantity - 1,
                productSalePrice: cart.productSalePrice
                  ? parseFloat(
                      (
                        cart.productSalePrice -
                        cart.productSalePrice / cart.quantity
                      ).toFixed(2)
                    )
                  : cart.productSalePrice,
                productPrice: cart.productSalePrice
                  ? cart.productPrice
                  : parseFloat(
                      (
                        cart.productPrice -
                        cart.productPrice / cart.quantity
                      ).toFixed(2)
                    ),
              }
            : cart
        );
        setCart(revertCart);
        localStorage.setItem("cart", JSON.stringify(revertCart));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        categories,
        setCategories,
        catLoading,
        brands,
        setBrands,
        brandLoading,
        orders,
        setOrders,
        orderLoading,
        cart,
        addToCart,
        removeFromCart,
        totalAmount,
        isCartLoading,
        handleCartIncrement,
        handleCartDecrement,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductStore;

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductStore");
  }
  return context;
};
