import { IProduct } from "@/types/types";
import axios, { AxiosError } from "axios";

export const fetchProductsByCategory = async (catSlug: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/product`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const products = res.data.data.filter(
      (product: IProduct) => product.catSlug == catSlug
    );

    return products.sort(
      (a: { id: number }, b: { id: number }) => a!.id - b!.id
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.message);
  }
};
