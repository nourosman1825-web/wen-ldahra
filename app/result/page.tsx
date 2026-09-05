"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { axiosPost } from '@/app/lib/axios';

interface Place {
  id: string;
  name: string;
  description?: string;
  category: string;
  rating: number;
  reviewCount?: number;
  distance?: number;
  image?: string;
  tags?: string[];
}

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

// Main component with Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-brown font-medium">Loading results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}

// Actual component that uses useSearchParams
function ResultsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get query params on mount
  useEffect(() => {
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    if (query) setSearchQuery(query);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  // جلب الأماكن بالاعتماد على الـ AI Search API
  const {
    data: placesData,
    isLoading,
    error,
  } = useQuery<{ places: Place[] }>({
    queryKey: ["ai-search", searchQuery],
    queryFn: async () => {
      const response = await axiosPost<{ query: string }, { places: Place[] }>("search/", {
        query: searchQuery,
      });
      return response.data || { places: [] };
    },
    enabled: true//
  });

  const allPlaces = placesData?.places ?? [];

  // Filter by category if selected
  const filteredPlaces = allPlaces.filter(place => {
    const matchesCategory = !selectedCategory || selectedCategory === 'More' ||
                           place.category === selectedCategory;
    return matchesCategory;
  });

  // Sort the filtered results
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    switch(selectedSort) {
      case 'Rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'Distance':
        return (a.distance ?? Infinity) - (b.distance ?? Infinity);
      case 'Relevance':
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-cream text-gray-800">
      

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">

        {/* Left Side: Results & Cards */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Filter Display */}
          {selectedCategory && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtering by:</span>
              <span className="bg-brown text-cream text-xs px-3 py-1 rounded-full">
                {selectedCategory}
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-gray-500 hover:text-red-500"
              >
                ✕ Clear
              </button>
            </div>
          )}

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            AI found <span className="text-brown">{sortedPlaces.length} places</span> for you
          </h1>

          {/* Quick Sort Options */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
            {['Relevance', 'Rating', 'Distance'].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSort(option)}
                className={`px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap transition ${
                  selectedSort === option
                    ? 'bg-zinc-900 text-white'
                    : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 text-gray-500 text-sm animate-pulse">
              <p>AI is finding the best places for you...</p>
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 text-red-500 text-sm">
              <p>{errorMessage(error) ?? "Couldn't load places right now."}</p>
            </div>
          )}

          {/* Places List */}
          {!isLoading && !error && (
            <div className="space-y-4">
              {sortedPlaces.length > 0 ? (
                sortedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {place.image ? (
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full sm:w-24 h-40 sm:h-24 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">{place.name}</h3>
                        <div className="text-xs text-gray-500 flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-amber-500 font-semibold">★ {place.rating ? place.rating.toFixed(1) : "N/A"}</span>
                          <span>({place.reviewCount ?? 0})</span>
                          <span>•</span>
                          <span>{place.distance != null ? `${place.distance} km` : "—"}</span>
                          <span>•</span>
                          <span className="bg-brown/10 text-brown px-2 py-0.5 rounded-full">
                            {place.category}
                          </span>
                        </div>
                        {place.description && (
                          <p className="text-xs text-gray-600 line-clamp-1 mt-1">{place.description}</p>
                        )}
                        <div className="flex gap-1.5 pt-2 flex-wrap">
                          {place.tags?.map((tag, index) => (
                            <span key={index} className="bg-cream text-brown border border-dark-brown text-[10px] px-2 py-0.5 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 gap-3">
                      <button className="text-gray-400 hover:text-red-500 text-xl p-1">♡</button>
                      <Link href={`/details?id=${place.id}`} className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-brown text-white text-xs px-4 py-2.5 rounded-xl font-medium hover:bg-dark-brown transition text-center">
                          View Place
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 text-gray-500 text-sm">
                  <p className="mb-2">No places found matching your search.</p>
                  <p className="text-xs">Try searching for different keywords or clear the filters.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Visual Section */}
        <div className="hidden lg:flex lg:col-span-5 bg-blue-50/60 rounded-3xl h-[550px] sticky top-6 border border-blue-100/80 flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="text-5xl mb-4">🤖✨</div>
          <h3 className="font-bold text-brown text-xl mb-2">AI Recommendation Engine</h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Sort your recommendations by Relevance, Rating, or Distance to find the perfect place.
          </p>
        </div>

      </div>
    </main>
  );
}