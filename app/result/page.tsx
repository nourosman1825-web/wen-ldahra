"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Relevance");

  const allPlaces = [
    {
      id: 1,
      name: "Beit El Nessim",
      rating: "4.8",
      reviews: "(210)",
      distance: 1.2,
      tags: ["Restaurant", "Heritage", "Outdoor", "Quiet"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Paul Café",
      rating: "4.5",
      reviews: "(340)",
      distance: 0.5,
      tags: ["Café", "Bakery", "Breakfast", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Theâtre Café",
      rating: "4.6",
      reviews: "(155)",
      distance: 0.9,
      tags: ["Café", "Quiet", "Artistic", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "MM Menthe",
      rating: "4.3",
      reviews: "(92)",
      distance: 1.5,
      tags: ["Desserts", "Ice Cream", "Sweet"],
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60"
    }
  ];




  

  // First: Filter by search
  const filteredPlaces = allPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Second: Sort the filtered results
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    switch(selectedSort) {
      case 'Rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'Distance':
        return a.distance - b.distance;
      case 'Relevance':
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-[#f3e9dd] text-gray-800 p-4 sm:p-6 lg:p-8">


      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Side: Results & Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            AI found <span className="text-[#6b4e3d]">{sortedPlaces.length} places</span> for you
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

          {/* Places List */}
          <div className="space-y-4">
            {sortedPlaces.length > 0 ? (
              sortedPlaces.map((place) => (
                <div 
                  key={place.id} 
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:scale-110 transition-transform"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img 
                      src={place.image} 
                      alt={place.name} 
                      className="w-full sm:w-24 h-40 sm:h-24 rounded-xl object-cover" 
                    />
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{place.name}</h3>
                      <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <span className="text-amber-500 font-semibold">★ {place.rating}</span>
                        <span>{place.reviews}</span>
                        <span>•</span>
                        <span>{place.distance} km</span>
                      </div>
                      <div className="flex gap-1.5 pt-2 flex-wrap">
                        {place.tags.map((tag, index) => (
                          <span key={index} className="bg-[#f3e9dd] text-[#6b4e3d] border border-[#6b4e3d] text-[10px] px-2 py-0.5 rounded-md font-medium" >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 gap-3">
                    <button className="text-gray-400 hover:text-red-500 text-xl p-1">♡</button>
                    <Link href={`/details?id=${place.id}`} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto bg-brown text-white text-xs px-4 py-2.5 rounded-xl font-medium hover:bg-[#543b2d] transition text-center">
                        View Place
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 text-gray-500 text-sm">
                <p>No places found matching your search. Try searching for "Quiet" or "Wi-Fi"!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visual Section */}
        <div className="hidden lg:flex lg:col-span-5 bg-blue-50/60 rounded-3xl h-[550px] sticky top-6 border border-blue-100/80 flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="text-5xl mb-4">🤖✨</div>
          <h3 className="font-bold text-[#6b4e3d] text-xl mb-2">AI Recommendation Engine</h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Sort your recommendations by Relevance, Rating, or Distance to find the perfect place.
          </p>
        </div>

      </div>
    </main>
  );
}