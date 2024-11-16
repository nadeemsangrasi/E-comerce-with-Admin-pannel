"use client";
import { Button } from "@/components/ui/button";
import { CReview, IUser } from "@/types/types";

import React, { useState, FormEventHandler, useEffect } from "react";
import axios, { AxiosError } from "axios";

import StarRatingComponent from "@/components/shared/StarRating";
import Loader from "@/components/shared/Loader";
import ReviewCard from "./ReviewCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import toast from "react-hot-toast";
export interface IReview {
  id: string;
  productId: string;
  userId: string;
  username: string;
  imageUrl: string;
  reviewValue: string;
  reviewMessage: string;
  createdAt: string;
  updatedAt: string;
}

export const rev: IReview[] = [
  {
    id: "1",
    productId: "101",
    userId: "u001",
    username: "JohnDoe",
    imageUrl: "https://via.placeholder.com/150",
    reviewValue: "4.5",
    reviewMessage: "Great product, really enjoyed using it!",
    createdAt: "2024-10-01T12:34:56Z",
    updatedAt: "2024-10-02T14:23:12Z",
  },
  {
    id: "2",
    productId: "101",
    userId: "u002",
    username: "JaneSmith",
    imageUrl: "https://via.placeholder.com/150",
    reviewValue: "4.0",
    reviewMessage: "Good quality, met my expectations.",
    createdAt: "2024-10-03T15:45:01Z",
    updatedAt: "2024-10-04T10:12:34Z",
  },
  {
    id: "3",
    productId: "102",
    userId: "u003",
    username: "AlexBrown",
    imageUrl: "https://via.placeholder.com/150",
    reviewValue: "5.0",
    reviewMessage: "Excellent! Highly recommended.",
    createdAt: "2024-10-05T08:22:30Z",
    updatedAt: "2024-10-05T09:45:56Z",
  },
  {
    id: "4",
    productId: "103",
    userId: "u004",
    username: "SamGreen",
    imageUrl: "https://via.placeholder.com/150",
    reviewValue: "3.5",
    reviewMessage: "Decent product but could be improved.",
    createdAt: "2024-10-06T16:10:20Z",
    updatedAt: "2024-10-06T18:34:44Z",
  },
  {
    id: "5",
    productId: "104",
    userId: "u005",
    username: "ChrisLee",
    imageUrl: "https://via.placeholder.com/150",
    reviewValue: "4.8",
    reviewMessage: "Amazing experience, worth every penny!",
    createdAt: "2024-10-07T11:56:33Z",
    updatedAt: "2024-10-08T13:12:47Z",
  },
];

const ReviewSection = ({ productId }: { productId: string }): JSX.Element => {
  const [review, setReview] = useState<CReview>({
    id: "",
    message: "",
    reviewValue: 0,
  });
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { isSignedIn, user } = useUser();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);

  const handleRatingChange = (rating: number) => {
    setReview((prev) => ({ ...prev, reviewValue: rating }));
  };

  const handleSubmitReview: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = isEditingReview
        ? await axios.patch("/api/review", {
            userId: user?.id,
            reviewId: review.id,
            reviewMessage: review.message,
            reviewValue: review.reviewValue,
          })
        : await axios.post("/api/review", {
            userId: user?.id,
            productId: productId,
            reviewMessage: review.message,
            reviewValue: review.reviewValue,
            username: user?.username,
            imageUrl: user?.imageUrl,
          });

      if (res.status !== 200) {
        console.error(res.data.message);
        toast.error(res.data.message);
        return;
      }

      if (isEditingReview) {
        setReviews([...reviews, res.data.data]);
      } else {
        setReviews([...reviews, res.data.data]);
      }

      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to submit review", axiosError);
      const errorMessage = axiosError?.response?.data as { message: string };
      toast.error(errorMessage?.message || "An error occurred");
    } finally {
      resetReviewState();
      setIsSubmitting(false);
    }
  };

  const resetReviewState = () => {
    setIsEditingReview(false);
    setReview({
      id: "",
      message: "",
      reviewValue: 0,
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await axios.get(`/api/review?productId=${productId}`);
        if (res.status !== 200) {
          console.error(res.data.message);

          return;
        }

        setReviews(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Failed to fetch reviews", axiosError);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return (
    <div>
      <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left my-4 mt-12">
        Reviews
      </h1>
      {!isSignedIn ? (
        <Link
          href={"/sign-in"}
          className="sm:text-xl text-2xl font-medium border-b-2 border-white inline-block my-4 "
        >
          log in to write review
        </Link>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Rate Product
            </p>
            <StarRatingComponent
              rating={review.reviewValue}
              handleRatingChange={handleRatingChange}
            />
          </div>
          <form onSubmit={handleSubmitReview}>
            <div className="flex gap-2 w-full lg:w-1/2 items-center my-2">
              <input
                type="text"
                placeholder="Write a review..."
                id="review"
                className="py-3 px-2 rounded-lg text-black  w-full bg-gray-300 placeholder:text-black"
                value={review.message}
                onChange={(event) =>
                  setReview({ ...review, message: event.target.value })
                }
              />
              <Button
                className=" text-xl  font-bold"
                type="submit"
                disabled={
                  isSubmiting ||
                  review.message === "" ||
                  review.reviewValue == 0
                }
              >
                {isEditingReview ? (
                  <>{isSubmiting ? "saving..." : "save changes"}</>
                ) : (
                  <>{isSubmiting ? "submitting..." : "submit"}</>
                )}
              </Button>
            </div>
          </form>
        </>
      )}

      <div className="lg:flex justify-between">
        <div className="lg:w-3/4">
          {reviews?.length === 0 && !loadingReviews && <h2>No reviews</h2>}
          {loadingReviews && (
            <div className="flex  justify-start pt-6">
              <Loader text="loading reviews..." />
            </div>
          )}
          {reviews?.map((revObj: IReview) => (
            <ReviewCard
              key={revObj?.id}
              user={user as unknown as IUser}
              setReview={setReview}
              reviewObj={revObj}
              reviews={reviews}
              setReviews={setReviews}
              setIsEdditing={setIsEditingReview}
              isEditing={isEditingReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
