"use client";
import { ICategoryBrand, IProduct } from "@/types/types";
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
  categories: ICategoryBrand[];
  setCategories: React.Dispatch<React.SetStateAction<ICategoryBrand[]>>;
  catLoading: boolean;
  brands: ICategoryBrand[];
  setBrands: React.Dispatch<React.SetStateAction<ICategoryBrand[]>>;
  brandLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductStore: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [catLoading, setCatLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<ICategoryBrand[]>([]);
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
  }, []);

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
