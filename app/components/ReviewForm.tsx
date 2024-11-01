// app/components/ReviewForm.tsx
"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  restaurants: Array<{
    id: number;
    name: string;
  }>;
  onSubmitReview: (review: {
    restaurantId: number;
    rating: number;
    reviewText: string;
  }) => void;
}

export default function ReviewForm({
  restaurants,
  onSubmitReview,
}: ReviewFormProps) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!selectedRestaurantId || rating === 0 || reviewText.trim() === "") {
      alert(
        "Please select a restaurant and provide both a rating and a review"
      );
      return;
    }

    onSubmitReview({
      restaurantId: parseInt(selectedRestaurantId),
      rating,
      reviewText,
    });

    // Reset form
    setSelectedRestaurantId("");
    setRating(0);
    setReviewText("");
    setIsReviewFormOpen(false);
  };

  const renderStarRating = () => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <Star
        key={starValue}
        className={`size-8 cursor-pointer ${
          (hoveredRating || rating) >= starValue
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
        onMouseEnter={() => setHoveredRating(starValue)}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => setRating(starValue)}
      />
    ));
  };

  return (
    <div className="mt-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Review</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          Share your dining experience with others!
        </p>

        {!isReviewFormOpen ? (
          <div className="mt-8">
            <button
              onClick={() => setIsReviewFormOpen(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="mt-8 max-w-xl mx-auto">
            {/* Restaurant Selection */}
            <div className="mb-6">
              <select
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select a Restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Rate your experience
              </h3>
              <div className="flex justify-center space-x-2">
                {renderStarRating()}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full p-4 border border-gray-300 rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsReviewFormOpen(false);
                  setSelectedRestaurantId("");
                  setRating(0);
                  setReviewText("");
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
