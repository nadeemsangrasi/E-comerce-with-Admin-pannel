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
  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/product");
        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        const productWithImages = await Promise.all(
          res.data.data.map(async (product: IProduct) => {
            const imgRes = await axios.get(
              "/api/product-images?productId=" + product.id
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

        setProducts(productWithImages.sort((a, b) => a.id - b.id));
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
        toast.error(axiosError.message);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
    const fetchCategory = async () => {
      try {
        setCatLoading(true);
        const res = await axios.get("http://localhost:3000/api/category");
        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        setCategories(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
        toast.error(axiosError.message);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategory();
    const fetchBrands = async () => {
      try {
        setBrandLoading(true);
        const res = await axios.get("http://localhost:3000/api/brand");
        if (res.status !== 200) {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
        setBrands(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
        toast.error(axiosError.message);
      } finally {
        setBrandLoading(false);
      }
    };
    fetchBrands();
    // const fetchOrders = async () => {
    //   try {
    //     setOrderLoading(true);
    //     const res = await axios.get("http://localhost:3000/api/order");
    //     const updatedOrders = res.data.data.map((item: IOrder) => {
    //       const products = item.products.join(",");
    //       return {
    //         ...item,
    //         products: products,
    //       };
    //     });
    //     if (res.status !== 200) {
    //       console.error(res.data.message);
    //       toast.error(res.data.message);
    //     }
    //     setOrders(updatedOrders);
    //   } catch (error) {
    //     const axiosError = error as AxiosError;
    //     console.error(axiosError.message);
    //     toast.error(axiosError.message);
    //   } finally {
    //     setOrderLoading(false);
    //   }
    // };
    // fetchOrders();
  }, []);

  // carts
  const [cart, setCart] = useState<ICart[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { user } = useUser();
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

        // Early exit if user ID is undefined
        if (!user?.id) {
          console.log("User ID is not available yet.");
          return;
        }

        // Immediately load from localStorage
        const localCart = localStorage.getItem("cart");
        // Only set from localStorage if desired
        if (localCart) {
          // false condition for testing
          setCart(JSON.parse(localCart));
        }

        // Then fetch from backend and update if different
        const res = await axios.get(
          `http://localhost:3000/api/cart?userId=${user?.id}`
        );

        // Process backend response
        if (res.status === 200) {
          if (res.data.data && Array.isArray(res.data.data)) {
            setCart(res.data.data);
            if (res.data.data.length > 0) {
              localStorage.setItem("cart", JSON.stringify(res.data.data));
            } else {
              localStorage.removeItem("cart");
            }
          } else {
            setCart([]);
            localStorage.removeItem("cart");
          }
        } else {
          localStorage.removeItem("cart");
          setCart([]);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setIsCartLoading(false);
      }
    };

    loadCart();
  }, [user]);
  const addToCart = async (item: IProduct) => {
    try {
      const updatedCart = [
        ...cart.filter((c) => c.productId !== item.id),
        { ...item, quantity: 1 },
      ];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const res = await axios.post("http://localhost:3000/api/cart", {
        userId: user?.id,
        productId: item.id,
        productTitle: item.title,
        productImage: item.images[0].imageUrl,
        productPrice: item.price,
        productSalePrice: item.salePrice,
        quantity: 1,
        productStock: item.totalStock,
      });

      if (res.status !== 200) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.message == "Product is out of stock") {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);

      const newItem = res.data.data;
      const updatedCartWithRealData = cart.some(
        (c: ICart) => c.id === newItem.id
      )
        ? cart.map((c: ICart) => (c.id === newItem.id ? newItem : c))
        : [...cart, newItem];

      setCart(updatedCartWithRealData);
      localStorage.setItem("cart", JSON.stringify(updatedCartWithRealData));
    } catch (error) {
      const axiosError = error as AxiosError;

      setCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.error(axiosError.message);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const cartIndex = cart.findIndex((cart: ICart) => cart.id === itemId);

      if (cartIndex === -1) {
        console.log("Item not found in cart");
        return;
      }

      const updatedCart = cart.filter((item: ICart) => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const res = await axios.delete(
        `http://localhost:3000/api/cart?userId=${user?.id}&cartId=${itemId}`
      );

      if (res.status !== 200) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
  };

  const handleCartDecrement = async (id: string) => {
    const cartIndex = cart.findIndex((cart: ICart) => cart.id === id);
    if (cartIndex === -1) {
      console.error("cart not found for decrement");
      return;
    }

    const cartItem = cart[cartIndex];

    if (cartItem.quantity <= 1) {
      toast.error("Minimum quantity reached");
      return; // Prevent decrement if quantity is 1
    }

    // Optimistically update the frontend cart
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
      const res = await axios.patch("/api/cart", {
        reqType: "decrement",
        cartId: id,
        userId: user?.id,
      });
      if (res.status !== 200) {
        // Revert changes if API call fails
        const revertCart = cart.map((cart: ICart) =>
          cart.id === id
            ? {
                ...cart,
                quantity: cart.quantity + 1, // Revert the decrement
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
      console.error("Error decrementing cart quantity", error);
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

    // Optimistically update the frontend cart
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
      const res = await axios.patch("/api/cart", {
        reqType: "increment",
        cartId: id,
        userId: user?.id,
      });
      if (res.status !== 200) {
        // Revert changes if API call fails
        const revertCart = cart.map((cart: ICart) =>
          cart.id === id
            ? {
                ...cart,
                quantity: cart.quantity - 1, // Revert the increment
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
      console.error("Error incrementing cart quantity", error);
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
