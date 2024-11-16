import Image from "next/image";
import React from "react";
import { Edit3, Star, Trash } from "lucide-react";
import { IReview, IReviewCard } from "@/types/types";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const ReviewCard = ({
  user,

  setReview,
  reviews,
  setReviews,
  reviewObj,
  setIsEdditing,
  isEditing,
}: IReviewCard): JSX.Element => {
  const handleEditReview = async () => {
    setIsEdditing(!isEditing);
    setReview({
      message: reviewObj.reviewMessage,
      reviewValue: Number(reviewObj.reviewValue),
      id: reviewObj.id,
    });
    setReviews(
      reviews.filter((myReview: IReview) => myReview.id !== reviewObj.id)
    );
  };

  const handleDeleteReview = async () => {
    try {
      const res = await axios.delete(`/api/review?reviewId=${reviewObj.id}`);
      if (res.status !== 200) {
        console.error(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      setReviews(
        reviews.filter((myReview: IReview) => myReview.id !== reviewObj.id)
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    }
  };
  return (
    <div className="mb-4 p-3 space-y-2 rounded-lg text-white">
      <div className="flex items-center gap-2 ">
        <Image
          src={reviewObj?.imageUrl}
          alt="image"
          className="w-[40px] h-[40px] rounded-full"
          height={1000}
          width={1000}
        />
        <div>
          <p className="font-semibold text-black dark:text-white">
            {reviewObj?.userId === user?.id ? "you" : reviewObj?.username}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400  ]">
            {dayjs(reviewObj?.createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <Star
              key={i}
              className={` w-5 h-5  ${
                star <= Number(reviewObj?.reviewValue)
                  ? "text-yellow-400 fill-current"
                  : "fill-black dark:fill-white"
              } `}
            />
          ))}
        </div>
        <p className="mt-1 text-[15px] leading-1 text-black dark:text-white">
          {reviewObj?.reviewMessage}
        </p>
      </div>

      {user?.id === reviewObj.userId && (
        <div className="flex  gap-2 mt-2">
          <Edit3
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="cursor-pointer text-green-600"
            onClick={handleEditReview}
          />
          <Trash
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="cursor-pointer text-red-600"
            onClick={handleDeleteReview}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
