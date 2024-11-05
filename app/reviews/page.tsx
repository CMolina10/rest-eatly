"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import Link from "next/link";

// Types for our data
interface Restaurant {
  id: number;
  name: string;
  yelpUrl: string;
}

interface Review {
  id: number;
  restaurantId: number;
  rating: number;
  address: string;
}

// Helper function to safely get the Yelp URL
const getYelpUrl = (
  restaurantId: number,
  restaurants: Restaurant[]
): string => {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  return restaurant?.yelpUrl || "#";
};

export default function Reviews() {
  // Sample data - this would come from your backend
  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Raising Cane's Chicken Fingers",
      yelpUrl:
        "https://www.yelp.com/biz/raising-canes-chicken-fingers-lexington-4?osq=Canes",
    },
    {
      id: 2,
      name: "McDonald's",
      yelpUrl: "https://www.yelp.com/biz/mcdonalds-lexington-38?osq=McDonalds",
    },
    {
      id: 3,
      name: "Chipotle",
      yelpUrl:
        "https://www.yelp.com/biz/chipotle-mexican-grill-lexington-4?osq=Chipotle",
    },
    // Add more sample restaurants as needed
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      restaurantId: 1,
      rating: 3.8,
      address: "544 S Upper St, Lexington, KY 40508",
    },
    {
      id: 2,
      restaurantId: 2,
      rating: 1.6,
      address: "357 S Limestone, Lexington, KY 40508",
    },
    {
      id: 3,
      restaurantId: 3,
      rating: 2.2,
      address: "345 S Limestone, Lexington, KY 40508",
    },
    // Add more sample reviews as needed
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter reviews based on search query
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = restaurants
      .find((r) => r.id === review.restaurantId)
      ?.name.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Reviews
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Browse reviews for local restaurants
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Review Cards */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  {/* Restaurant Name Header */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {
                      restaurants.find((r) => r.id === review.restaurantId)
                        ?.name
                    }
                  </h3>

                  {/* Rating and Address */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {review.rating} ★
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{review.address}</p>
                  </div>

                  {/* Yelp Link */}
                  <Link
                    href={getYelpUrl(review.restaurantId, restaurants)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    View on Yelp
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
