"use client"

import { useContext, useState } from "react"
import { useParams } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../lib/error";
import { ReviewsContext } from "../context/ReviewsContext";
import { toast } from "react-hot-toast";

export const useReview = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const [ loading, setLoading ] = useState<boolean>(false);
  const { reviews, setReviews } = useContext(ReviewsContext)

  const postReview = async (data: FieldValues) => {
    if (!data.rating || !data.content) return toast.error("Please fill out all required fields!");


    try {
      setLoading(true);
      const postData = { ...data, userId, authorId: user?.id };
      const { data: review } = await axios.post(`/api/reviews/`, postData);
      toast.success("Review posted!")
      return review;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      const { data: deletedReview } = await axios.delete("/api/reviews", {
        params: { reviewId: reviewId },
      });
      setReviews(reviews.filter((review) => review.id !== deletedReview.id ))
      toast.success("Review deleted!")
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const canDeleteReview = (authorId: string): boolean => {
    return user?.id === authorId || userId === user?.id;
  };
  
  const canLeaveReview = (): boolean => {
    const isReviewingSelf = userId === user?.id;
    const hasReviewed = reviews.some((review) => review.authorId === user?.id);
  
    return !isReviewingSelf && !hasReviewed;
  };
  
  return {
      postReview,
      deleteReview,
      reviews,
      setReviews,
      canDeleteReview,
      canLeaveReview,
      loading,
  }
}

export default useReview;