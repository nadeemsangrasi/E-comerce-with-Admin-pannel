import axios, { AxiosError } from "axios";

export const fetchSingleProduct = async (productId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/${productId}`
    );
    if (res.status !== 200) {
      console.error(res.data.message);
    }
    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Failed to fetch reviews", axiosError);
  }
};
