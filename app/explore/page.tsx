"use client";
'react';
import React, { useState } from 'react';
import Link from 'next/link';

export default function explore() {
  // شريط البحث وحالة النص المدخل
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // قائمة الأماكن الحقيقية مع التاجز (Tags) الخاصة بكل مكان
  const allPlaces = [
    {
      id: 1,
      name: "Beit El Nessim",
      rating: "4.8",
      reviews: "(210)",
      distance: "1.2 km",
      tags: ["Restaurant", "Heritage", "Outdoor", "Quiet"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Paul Café",
      rating: "4.5",
      reviews: "(340)",
      distance: "0.5 km",
      tags: ["Café", "Bakery", "Breakfast", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Theâtre Café",
      rating: "4.6",
      reviews: "(155)",
      distance: "0.9 km",
      tags: ["Café", "Quiet", "Artistic", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "MM Menthe",
      rating: "4.3",
      reviews: "(92)",
      distance: "1.5 km",
      tags: ["Desserts", "Ice Cream", "Sweet"],
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60"
    }
  ];

  // تصفية الأماكن بناءً على البحث أو اختيار التاج
  const filteredPlaces = allPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === "All" || place.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-[#f3e9dd] text-gray-800 p-6">
      {/* AI Search Bar Section */}
      <div className="max-w-7xl mx-auto mb-8 bg-white p-4 rounded-2xl shadow-sm border flex items-center space-x-3">
        <span className="text-xl">🤖</span>
        <input 
          type="text"
          placeholder="Ask AI: e.g., 'Quiet place with Wi-Fi' or 'Café'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-brown placeholder-gray-400 bg-transparent"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="text-xs bg-gray-100 px-3 py-1 rounded-full text-brown hover:bg-gray-200"
          >
            Clear
          </button>
        )}
      </div>

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

          {/* Places List */}
          <div className="space-y-4">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <div key={place.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between hover:shadow-md transition">
                  <div className="flex items-center space-x-4">
                    <img src={place.image} alt={place.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-gray-800">{place.name}</h3>
                      <div className="text-xs text-gray-500 flex items-center space-x-2 my-1">
                        <span className="text-amber-500 font-semibold">★ {place.rating}</span>
                        <span>{place.reviews}</span>
                        <span>•</span>
                        <span>{place.distance}</span>
                      </div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {place.tags.map((tag, index) => (
                          <span key={index} className="bg-[#6b4e3d] text-[#f3e9dd] text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <button className="text-gray-400 hover:text-red-500 text-lg">♡</button>
                    <Link href={`/details?id=${place.id}`}><button className="bg-[#6b4e3d] text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-[#543b2d]">
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