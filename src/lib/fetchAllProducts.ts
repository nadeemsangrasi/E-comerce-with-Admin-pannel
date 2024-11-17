import axios, { AxiosError } from "axios";

export const fetchProducts = async () => {
  try {
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
    }
    return res.data.data.sort(
      (a: { id: number }, b: { id: number }) => a.id - b.id
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError);
    return [];
  }
};
