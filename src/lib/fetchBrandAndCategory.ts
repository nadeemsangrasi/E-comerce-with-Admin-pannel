import axios, { AxiosError } from "axios";

export const fetchBrands = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/brand`, {
      headers: {
        "Cache-Control": "public, max-age=30, stale-while-revalidate=30",
      },
    });
    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.message);
  }
};
export const fetchCategory = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/category`
    );
    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.message);
  }
};
