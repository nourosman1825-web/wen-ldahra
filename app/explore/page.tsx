"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Place } from '@/app/generated/prisma/client';
import { axiosGet } from '@/app/lib/axios';

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const {
    data: allPlaces,
    isLoading,
    error,
  } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: async () => {
      const response = await axiosGet<Place[]>("/places");
      return response.data || [];
    },
  });

  const filteredPlaces = (allPlaces ?? []).filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === "All" || place.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-[#f3e9dd] text-gray-800 p-6">

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Results & Cards */}
        <div className="lg:col-span-7">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            AI found <span className="text-dark-brown">{filteredPlaces.length} places</span> for you
          </h1>

          {/* Quick Tag Filters */}
          <div className="flex flex-wrap gap-2 mb-6 text-sm">
            {["All", "Quiet", "Wi-Fi", "Café", "Restaurant"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full shadow-sm transition ${
                  selectedTag === tag ? 'bg-brown text-white' : 'bg-white border hover:brown'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="bg-white p-8 rounded-xl text-center border text-gray-500">
              <p>Loading places...</p>
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="bg-white p-8 rounded-xl text-center border text-red-500">
              <p>{errorMessage(error) ?? "Couldn't load places right now."}</p>
            </div>
          )}

          {/* Places List */}
          {!isLoading && !error && (
            <div className="space-y-4">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <div key={place.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between hover:scale-110 transition-transform">
                    <div className="flex items-center space-x-4">
                      {place.image ? (
                        <img src={place.image} alt={place.name} className="w-20 h-20 rounded-lg object-cover" />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] text-center px-1">
                          No image
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-800">{place.name}</h3>
                        <div className="text-xs text-gray-500 flex items-center space-x-2 my-1">
                          <span className="text-amber-500 font-semibold">★ {place.rating.toFixed(1)}</span>
                          <span>({place.reviewCount})</span>
                          <span>•</span>
                          <span>{place.distance != null ? `${place.distance} km` : "—"}</span>
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {place.tags.map((tag, index) => (
                            <span key={index} className="bg-cream text- border border-[#6b4e3d] text-[10px] px-2 py-0.5 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3">
                      <button className="text-gray-400 hover:text-red-500 text-lg">♡</button>
                      <Link href={`/details?id=${place.id}`}><button className="bg-brown text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-[#543b2d]">
                        View Place
                      </button></Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl text-center border text-gray-500">
                  <p>No places found matching your search. Try searching for "Quiet" or "Wi-Fi"!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Visual Section */}
        <div className="lg:col-span-5 bg-blue-50 rounded-2xl h-[550px] relative overflow-hidden border border-blue-100 flex flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="text-4xl mb-3">🤖✨</div>
          <h3 className="font-bold text-brown text-lg mb-1">AI Recommendation Engine</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Type your mood or requirements in the search bar above to see the filtered list instantly update.
          </p>
        </div>

      </div>
    </main>
  );
}
