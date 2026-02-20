import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Review {
  id: string;
  productId: string;
  rating: number; // 1-5
  comment?: string;
  userName: string;
  createdAt: number;
}

const REVIEWS_KEY = "@doçuras_da_angel/reviews";

export function useReviews() {
  const [reviews, setReviews] = useState<Map<string, Review[]>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load reviews from storage
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const stored = await AsyncStorage.getItem(REVIEWS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const reviewsMap = new Map<string, Review[]>();
          parsed.forEach((item: [string, Review[]]) => {
            reviewsMap.set(item[0], item[1]);
          });
          setReviews(reviewsMap);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Save reviews to storage
  const saveReviews = useCallback(async (newReviews: Map<string, Review[]>) => {
    try {
      const serialized = Array.from(newReviews.entries());
      await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(serialized));
    } catch (error) {
      console.error("Failed to save reviews:", error);
    }
  }, []);

  const addReview = useCallback(
    (productId: string, rating: number, comment: string, userName: string) => {
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      setReviews((prev) => {
        const newReviews = new Map(prev);
        const productReviews = newReviews.get(productId) || [];

        const newReview: Review = {
          id: `${productId}-${Date.now()}`,
          productId,
          rating,
          comment: comment || undefined,
          userName,
          createdAt: Date.now(),
        };

        productReviews.push(newReview);
        newReviews.set(productId, productReviews);

        saveReviews(newReviews);
        return newReviews;
      });
    },
    [saveReviews]
  );

  const getProductReviews = useCallback(
    (productId: string) => {
      return reviews.get(productId) || [];
    },
    [reviews]
  );

  const getAverageRating = useCallback(
    (productId: string) => {
      const productReviews = reviews.get(productId) || [];
      if (productReviews.length === 0) return 0;

      const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / productReviews.length;
    },
    [reviews]
  );

  const getRatingDistribution = useCallback(
    (productId: string) => {
      const productReviews = reviews.get(productId) || [];
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      productReviews.forEach((review) => {
        distribution[review.rating as keyof typeof distribution]++;
      });

      return distribution;
    },
    [reviews]
  );

  return {
    reviews,
    loading,
    addReview,
    getProductReviews,
    getAverageRating,
    getRatingDistribution,
  };
}
