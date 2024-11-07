// app/restaurants/page.tsx
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";
import { Search, X } from "lucide-react";
import Link from "next/link";

// Types for our data
interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  cuisine: string;
  allergenInfo: string[];
  allergenLink: string;
  displayLink: string | null;
  menuLink: string;
  menuDisplayLink: string | null;
  yelpUrl: string;
}

interface FilterTag {
  id: string;
  label: string;
}

// Add Review interface
interface Review {
  id: number;
  restaurantId: number;
  rating: number;
  reviewText: string;
}

export default function Restaurants() {
  // Add this to your existing state management
  const [reviews, setReviews] = useState<Review[]>([]);

  // Sample data - this would come from your backend
  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Raising Cane's Chicken Fingers",
      description:
        "Fast-food chain specializing in fried chicken fingers, crinkle-cut fries & Texas toast.",
      address: "544 S Upper St, Lexington, KY 40508",
      cuisine: "Southern",
      allergenInfo: ["shellfish-free", "treenut-free", "peanut-free"],
      menuLink: "https://www.raisingcanes.com/full-menu/",
      menuDisplayLink: "Raising Cane's Menu",
      allergenLink: "https://www.raisingcanes.com/allergens/",
      displayLink: "Raising Cane's Allergen Menu",
      yelpUrl:
        "https://www.yelp.com/biz/raising-canes-chicken-fingers-lexington",
    },
    {
      id: 2,
      name: "McDonald's",
      description:
        "Classic, long-running fast-food chain known for its burgers & fries.",
      address: "357 S Limestone, Lexington, KY 40508",
      cuisine: "American",
      allergenInfo: ["shellfish-free", "treenut-free", "peanut-free"],
      menuLink: "https://www.mcdonalds.com/us/en-us/full-menu.html",
      menuDisplayLink: "McDonald's Menu",
      allergenLink:
        "https://www.mcdonalds.com/content/dam/sites/uk/nfl/pdf/nutrition/allergen-booklet-16102024.pdf",
      displayLink: "McDonald's Allergen Menu",
      yelpUrl: "https://www.yelp.com/biz/mcdonalds-lexington-3",
    },
    {
      id: 3,
      name: "Chipotle",
      description:
        "Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.",
      address: "345 S Limestone, Lexington, KY 40508",
      cuisine: "Mexican",
      allergenInfo: [
        "egg-free",
        "fish-free",
        "shellfish-free",
        "treenut-free",
        "peanut-free",
      ],
      menuLink: "https://www.chipotle.com/#menu",
      menuDisplayLink: "Chipotle's Menu",
      allergenLink: "https://www.chipotle.com/allergens",
      displayLink: "Chipotle's Allergen Menu",
      yelpUrl: "https://www.yelp.com/biz/chipotle-mexican-grill-lexington-7",
    },
    // Add more sample restaurants as needed
  ]);

  // Common allergens for filtering
  const allergenTags: FilterTag[] = [
    { id: "dairy-free", label: "Dairy Free" },
    { id: "egg-free", label: "Egg Free" },
    { id: "fish-free", label: "Fish Free" },
    { id: "shellfish-free", label: "Shellfish Free" },
    { id: "treenut-free", label: "Tree Nut Free" },
    { id: "peanut-free", label: "Peanut Free" },
    { id: "wheat-free", label: "Wheat Free" },
    { id: "soy-free", label: "Soy Free" },
  ];

  // Add this handler
  const handleSubmitReview = (review: {
    restaurantId: number;
    rating: number;
    reviewText: string;
  }) => {
    const newReview = {
      ...review,
      id: reviews.length + 1,
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter restaurants based on selected tags and search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => restaurant.allergenInfo.includes(tag));
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Restaurants
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Find restaurants that match your dietary needs
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-8">
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
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

            {/* Filter Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {allergenTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${
                      selectedTags.includes(tag.id)
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {tag.label}
                  {selectedTags.includes(tag.id) && (
                    <X className="ml-1 h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-gray-500">{restaurant.description}</p>
                  <Link
                    href={restaurant.menuLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-decoration: underline"
                  >
                    {restaurant.menuDisplayLink}
                  </Link>
                  <br></br>
                  <Link
                    href={restaurant.allergenLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-decoration: underline"
                  >
                    {restaurant.displayLink}
                  </Link>
                  <p className="mt-2 text-sm text-gray-500">
                    {restaurant.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.allergenInfo.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
