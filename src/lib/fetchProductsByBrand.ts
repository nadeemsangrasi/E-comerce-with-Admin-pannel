import { IProduct } from "@/types/types";
import axios, { AxiosError } from "axios";

export const fetchProductsByBrand = async (brandSlug: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/product`
    );
    const products = res.data.data.filter(
      (product: IProduct) => product.brandSlug == brandSlug
    );

    return products.sort(
      (a: { id: number }, b: { id: number }) => a!.id - b!.id
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.message);
  }
};
