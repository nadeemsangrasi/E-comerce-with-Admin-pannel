import { Trash } from "lucide-react";
import React from "react";
import dayjs from "dayjs";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ICategoryBrand } from "@/types/types";
import { EditCategoryOrBrandCardDialog } from "./EditCategoryOrBrandCardDialog";
const CategoryBrandCard = ({
  data,
  cardType,
}: {
  data: ICategoryBrand;
  cardType: string;
}) => {
  const { brands, setBrands, categories, setCategories } = useProductContext();

  const handleDeleteCategoryBrand = async (cardType: string, id: string) => {
    const previousBrands = [...brands];
    const previousCategories = [...categories];

    if (cardType === "brand") {
      setBrands(brands.filter((brand: ICategoryBrand) => brand.id !== id));
    } else {
      setCategories(
        categories.filter((category: ICategoryBrand) => category.id !== id)
      );
    }

    try {
      const response =
        cardType === "brand"
          ? await axios.delete(
              `${process.env.NEXT_PUBLIC_DOMAIN}/api/brand?brandId=${id}`
            )
          : await axios.delete(
              `${process.env.NEXT_PUBLIC_DOMAIN}/api/category?categoryId=${id}`
            );

      if (response.status !== 200) {
        const errorMessage = response.data.message;
        console.error(errorMessage);
        toast.error(errorMessage);

        if (cardType === "brand") {
          setBrands(previousBrands);
        } else {
          setCategories(previousCategories);
        }
        return;
      }

      toast.success(response.data.message);
    } catch (error) {
      if (cardType === "brand") {
        setBrands(previousBrands);
      } else {
        setCategories(previousCategories);
      }

      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage =
        (axiosError?.response?.data as { message: string })?.message ||
        "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-[250px] border dark:border-gray-300 rounded-lg p-4 mx-auto sm:mx-0 space-y-2">
      <div>
        <h1 className=" text-2xl tracking-tight font-semibold">{data?.name}</h1>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          Date
        </span>
        <span className="text-gray-500 font-medium text-lg dark:text-gray-400 ">
          {dayjs(data?.createdAt).format("DD/MM/YYYY")}
        </span>
      </div>
      <div className="flex justify-between mt-2 ">
        <EditCategoryOrBrandCardDialog
          label={cardType}
          id={data.id}
          initialValue={data.name}
        />

        <Trash
          className="text-red-600 font-semibold cursor-pointer"
          onClick={() =>
            handleDeleteCategoryBrand(cardType.toLowerCase(), data?.id)
          }
        />
      </div>
    </div>
  );
};

export default CategoryBrandCard;
