import { Edit, Trash } from "lucide-react";
import React from "react";
import dayjs from "dayjs";
import { useProductContext } from "@/contexts/productsStore/ProductStore";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ICategoryBrand } from "@/types/types";
const CategoryBrandCard = ({
  data,
  cardType,
}: {
  data: ICategoryBrand;
  cardType: string;
}) => {
  const { brands, setBrands, categories, setCategories } = useProductContext();

  const handleDeleteCategoryBrand = async (cardType: string, id: string) => {
    try {
      const res =
        cardType === "brand"
          ? await axios.delete("http://localhost:3000/api/brand?brandId=" + id)
          : await axios.delete(
              "http://localhost:3000/api/category?categoryId=" + id
            );
      if (res.status !== 200) {
        console.error(res.data.message);
        toast.error(res.data.message);
      }
      if (cardType === "brand") {
        setBrands(brands.filter((brand: ICategoryBrand) => brand.id !== id));
        toast.success(res.data.message);
        return;
      }
      setCategories(
        categories.filter((category: ICategoryBrand) => category.id !== id)
      );
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
      toast.error(axiosError.message);
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
        <Edit className="text-green-600 font-semibold cursor-pointer" />
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
