"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    if (query) setSearchQuery(query);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const allPlaces = [
    // Cafés
    {
      id: 1,
      name: "Café Younes",
      rating: "4.8",
      reviews: "(1.2k)",
      distance: 0.3,
      tags: ["Café", "Breakfast", "Wi-Fi", "Outdoor"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60",
      category: "Cafés"
    },
    {
      id: 2,
      name: "Paul Café - ABC Mall",
      rating: "4.6",
      reviews: "(890)",
      distance: 0.8,
      tags: ["Café", "Bakery", "Wi-Fi", "Quiet"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60",
      category: "Cafés"
    },
    {
      id: 3,
      name: "Kalei Coffee",
      rating: "4.9",
      reviews: "(650)",
      distance: 1.1,
      tags: ["Café", "Specialty Coffee", "Wi-Fi", "Artistic"],
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60",
      category: "Cafés"
    },
    {
      id: 4,
      name: "Sip Café",
      rating: "4.5",
      reviews: "(430)",
      distance: 1.5,
      tags: ["Café", "Desserts", "Wi-Fi", "Outdoor"],
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60",
      category: "Cafés"
    },
    // Restaurants
    {
      id: 5,
      name: "Al Falamanki",
      rating: "4.7",
      reviews: "(2.1k)",
      distance: 1.8,
      tags: ["Restaurant", "Heritage", "Outdoor", "Quiet"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
      category: "Restaurants"
    },
    {
      id: 6,
      name: "Babel Bay",
      rating: "4.8",
      reviews: "(1.5k)",
      distance: 2.3,
      tags: ["Restaurant", "Seafood", "Outdoor", "Romantic"],
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60",
      category: "Restaurants"
    },
    {
      id: 7,
      name: "Ferdinand",
      rating: "4.6",
      reviews: "(980)",
      distance: 0.7,
      tags: ["Restaurant", "French", "Café", "Breakfast"],
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60",
      category: "Restaurants"
    },
    // Parks
    {
      id: 8,
      name: "Horsh Beirut",
      rating: "4.7",
      reviews: "(3.2k)",
      distance: 2.5,
      tags: ["Park", "Outdoor", "Quiet", "Picnic"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=60",
      category: "Parks"
    },
    {
      id: 9,
      name: "Jesuit Garden",
      rating: "4.5",
      reviews: "(760)",
      distance: 1.9,
      tags: ["Park", "Historic", "Quiet", "Garden"],
      image: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?w=500&auto=format&fit=crop&q=60",
      category: "Parks"
    },
    // Shopping
    {
      id: 10,
      name: "ABC Mall - Verdun",
      rating: "4.6",
      reviews: "(4.5k)",
      distance: 1.2,
      tags: ["Shopping", "Retail", "Café", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60",
      category: "Shopping"
    },
    {
      id: 11,
      name: "Beirut Souks",
      rating: "4.4",
      reviews: "(3.8k)",
      distance: 1.6,
      tags: ["Shopping", "Boutique", "Outdoor", "Cultural"],
      image: "https://images.unsplash.com/photo-1519567789881-5c10e3dcb08c?w=500&auto=format&fit=crop&q=60",
      category: "Shopping"
    },
    // Entertainment
    {
      id: 12,
      name: "Cinema City",
      rating: "4.5",
      reviews: "(5.2k)",
      distance: 2.8,
      tags: ["Entertainment", "Movies", "Indoor", "Family"],
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60",
      category: "Entertainment"
    },
    {
      id: 13,
      name: "Skybar Beirut",
      rating: "4.3",
      reviews: "(1.8k)",
      distance: 3.1,
      tags: ["Entertainment", "Nightlife", "Outdoor", "Music"],
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&auto=format&fit=crop&q=60",
      category: "Entertainment"
    },
    // Gyms
    {
      id: 14,
      name: "Evolve Fitness",
      rating: "4.7",
      reviews: "(620)",
      distance: 0.9,
      tags: ["Gym", "Fitness", "Indoor", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60",
      category: "Gyms"
    },
    {
      id: 15,
      name: "BeFit Gym",
      rating: "4.4",
      reviews: "(480)",
      distance: 1.4,
      tags: ["Gym", "Wellness", "Indoor", "Quiet"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60",
      category: "Gyms"
    },
    // Hotels
    {
      id: 16,
      name: "Phoenicia Hotel Beirut",
      rating: "4.9",
      reviews: "(3.2k)",
      distance: 1.3,
      tags: ["Hotel", "Luxury", "Pool", "Spa"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
      category: "Hotels"
    },
    {
      id: 17,
      name: "Le Gray Beirut",
      rating: "4.8",
      reviews: "(1.8k)",
      distance: 1.7,
      tags: ["Hotel", "Boutique", "Rooftop", "Luxury"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60",
      category: "Hotels"
    },
    // Beaches
    {
      id: 18,
      name: "Pierre & Friends",
      rating: "4.6",
      reviews: "(2.5k)",
      distance: 4.2,
      tags: ["Beach", "Resort", "Pool", "Restaurant"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
      category: "Beaches"
    },
    {
      id: 19,
      name: "Oyster Bay Beach",
      rating: "4.5",
      reviews: "(1.9k)",
      distance: 5.8,
      tags: ["Beach", "Family", "Water Sports", "Café"],
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&auto=format&fit=crop&q=60",
      category: "Beaches"
    },
    // Historical Sites
    {
      id: 20,
      name: "Byblos Castle",
      rating: "4.9",
      reviews: "(6.2k)",
      distance: 35.0,
      tags: ["Historical", "Castle", "Heritage", "Views"],
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60",
      category: "Historical Sites"
    },
    {
      id: 21,
      name: "Baalbek Ruins",
      rating: "4.9",
      reviews: "(7.1k)",
      distance: 78.0,
      tags: ["Historical", "Roman", "UNESCO", "Heritage"],
      image: "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?w=500&auto=format&fit=crop&q=60",
      category: "Historical Sites"
    },
    // Spa & Wellness
    {
      id: 22,
      name: "Massage Center Beirut",
      rating: "4.7",
      reviews: "(380)",
      distance: 1.5,
      tags: ["Spa", "Massage", "Wellness", "Relaxation"],
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60",
      category: "Spa & Wellness"
    },
    {
      id: 23,
      name: "Zen Spa & Resort",
      rating: "4.8",
      reviews: "(520)",
      distance: 3.2,
      tags: ["Spa", "Luxury", "Massage", "Wellness"],
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60",
      category: "Spa & Wellness"
    },
    // Museums
    {
      id: 24,
      name: "National Museum of Beirut",
      rating: "4.8",
      reviews: "(4.2k)",
      distance: 1.8,
      tags: ["Museum", "History", "Artifacts", "Cultural"],
      image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=500&auto=format&fit=crop&q=60",
      category: "Museums"
    },
    {
      id: 25,
      name: "Sursock Museum",
      rating: "4.7",
      reviews: "(3.1k)",
      distance: 2.1,
      tags: ["Museum", "Art", "Modern", "Gallery"],
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=500&auto=format&fit=crop&q=60",
      category: "Museums"
    },
    // Bakeries
    {
      id: 26,
      name: "Wooden Bakery",
      rating: "4.6",
      reviews: "(2.8k)",
      distance: 0.6,
      tags: ["Bakery", "Pastries", "Manakish", "Breakfast"],
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
      category: "Bakeries"
    },
    {
      id: 27,
      name: "Forneiro Bakery",
      rating: "4.7",
      reviews: "(1.2k)",
      distance: 1.1,
      tags: ["Bakery", "Artisan", "Bread", "Pastries"],
      image: "https://images.unsplash.com/photo-1585478259715-1d2a665d8c9a?w=500&auto=format&fit=crop&q=60",
      category: "Bakeries"
    },
    // Bookstores
    {
      id: 28,
      name: "Librairie Antoine",
      rating: "4.8",
      reviews: "(2.3k)",
      distance: 0.9,
      tags: ["Bookstore", "Books", "Stationery", "Café"],
      image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=500&auto=format&fit=crop&q=60",
      category: "Bookstores"
    },
    {
      id: 29,
      name: "Papercup Bookstore",
      rating: "4.6",
      reviews: "(780)",
      distance: 1.4,
      tags: ["Bookstore", "Café", "Quiet", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&auto=format&fit=crop&q=60",
      category: "Bookstores"
    }
  ];

  // Filter by search and category
  const filteredPlaces = allPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'More' || 
                           place.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered results
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
    <main className="min-h-screen bg-cream text-gray-800 p-4 sm:p-6 lg:p-8">

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
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
                      <div className="text-xs text-gray-500 flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="text-amber-500 font-semibold">★ {place.rating}</span>
                        <span>{place.reviews}</span>
                        <span>•</span>
                        <span>{place.distance} km</span>
                        <span>•</span>
                        <span className="bg-brown/10 text-brown px-2 py-0.5 rounded-full">
                          {place.category}
                        </span>
                      </div>
                      <div className="flex gap-1.5 pt-2 flex-wrap">
                        {place.tags.map((tag, index) => (
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
                <p className="text-xs">Try searching for different tags or clear the category filter.</p>
              </div>
            )}
          </div>
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