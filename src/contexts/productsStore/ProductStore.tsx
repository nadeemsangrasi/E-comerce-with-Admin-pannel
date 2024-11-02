"use client";
import { IProduct } from "@/types/types";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  loading: boolean;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductStore: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
              "/api/product-images/get?productId=" + product.id
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

        setProducts(productWithImages);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
        toast.error(axiosError.message);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, isUpdating, setIsUpdating }}
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
