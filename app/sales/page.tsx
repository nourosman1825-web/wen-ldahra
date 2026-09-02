// app/sales/page.tsx
"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SalesContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || "1";

  // All sales with REAL photos from Unsplash
  const allSales = [
    {
      id: "1",
      name: "☕ Summer Coffee Sale",
      rating: "4.9",
      reviews: "342",
      location: "Downtown Coffee House",
      about: "Beat the heat with our refreshing summer drinks! Get 20% off on all iced beverages, frappes, and cold brews. Perfect for those hot summer days!",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558857563-c0c3a62d6b5d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Downtown+Coffee+House",
      discount: "20% OFF",
      date: "Aug 15-30, 2026",
      price: "$7-12",
      category: "Cafés"
    },
    {
      id: "2",
      name: "🎵 Live Jazz Night",
      rating: "4.7",
      reviews: "256",
      location: "City Center Jazz Club",
      about: "Every Friday night, enjoy the smooth sounds of live jazz performed by local artists. Special happy hour drinks from 7-9 PM and a cozy atmosphere perfect for a date night!",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1511735111819-93f5ba8d00e6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=City+Center+Jazz+Club",
      discount: "Happy Hour 2-for-1",
      date: "Every Friday",
      price: "$15 (Entry)",
      category: "Entertainment"
    },
    {
      id: "3",
      name: "🍽️ Chef's Tasting Menu",
      rating: "4.8",
      reviews: "189",
      location: "The Plaza Restaurant",
      about: "Experience culinary excellence with our new 7-course tasting menu. Each dish is carefully crafted by our award-winning chef using locally sourced ingredients. First week special: 15% off!",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=The+Plaza+Restaurant",
      discount: "15% OFF",
      date: "Starting Aug 20, 2026",
      price: "$45",
      category: "Restaurants"
    },
    {
      id: "4",
      name: "🛍️ Summer Fashion Sale",
      rating: "4.6",
      reviews: "412",
      location: "Fashion District Mall",
      about: "Refresh your wardrobe with our summer collection! Up to 50% off on selected items. From casual wear to evening dresses, find your perfect summer look.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1479064555552-3f9cd0a7c92b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Fashion+District+Mall",
      discount: "Up to 50% OFF",
      date: "Aug 1-31, 2026",
      price: "$$",
      category: "Shopping"
    },
    {
      id: "5",
      name: "🏋️ Fitness Bootcamp",
      rating: "4.9",
      reviews: "156",
      location: "City Gym & Fitness Center",
      about: "Transform your body with our 30-day fitness challenge. Includes daily workout sessions, nutrition guidance, and progress tracking. First month membership at 50% off!",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=City+Gym+Fitness",
      discount: "50% OFF",
      date: "Sep 1-30, 2026",
      price: "$29.99/month",
      category: "Gyms"
    },
    {
      id: "6",
      name: "🌳 Summer Festival",
      rating: "4.7",
      reviews: "523",
      location: "Central Park",
      about: "Join us for the annual summer festival! Live performances, food trucks, artisan market, and family-friendly activities. Free entry for kids under 12!",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Central+Park",
      discount: "Free Entry",
      date: "Aug 25-27, 2026",
      price: "$10 (Adults)",
      category: "Parks"
    }
  ];

  const sale = allSales.find(p => String(p.id) === String(id)) || allSales[0];
  const [activeImage, setActiveImage] = useState(sale.image);
  const currentImage = activeImage || sale.image;

  return (
    <div className="min-h-screen bg-cream pb-12 sm:pb-16">
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link href="/" className="text-dark-brown hover:underline font-medium text-sm inline-flex items-center gap-1">
          ← Back to home
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Image */}
          <div className="relative w-full h-56 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">
            <img 
              src={currentImage} 
              alt={sale.name} 
              className="w-full h-full object-cover transition-all duration-300" 
            />
            {sale.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                🎉 {sale.discount}
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
              {sale.category}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
            {sale.images.map((imgUrl, index) => (
              <div 
                key={index} 
                onClick={() => setActiveImage(imgUrl)}
                className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 shrink-0 border-2 cursor-pointer transition-all ${
                  currentImage === imgUrl ? 'border-brown scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`${sale.name} ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">About this offer</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {sale.about}
            </p>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">📅 Date</span>
                  <p className="font-semibold text-gray-900">{sale.date}</p>
                </div>
                <div>
                  <span className="text-gray-500">💰 Price</span>
                  <p className="font-semibold text-green-600">{sale.price}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">🎯 Offer</span>
                  <p className="font-semibold text-red-600 text-lg">{sale.discount}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">📍 Location</span>
                  <p className="font-semibold text-gray-900">{sale.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">✨ What to Expect</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">🎵</span>
                <span className="text-xs font-semibold text-gray-700">Live Entertainment</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">🍸</span>
                <span className="text-xs font-semibold text-gray-700">Special Drinks</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">🎫</span>
                <span className="text-xs font-semibold text-gray-700">Great Offers</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">👥</span>
                <span className="text-xs font-semibold text-gray-700">Social Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-5 sm:space-y-6 lg:sticky lg:top-6">
            
            <div>
              <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold">🎉 Special Offer</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{sale.name}</h1>
              <p className="text-amber-500 font-semibold text-sm mt-1">
                ★ {sale.rating} <span className="text-gray-400 font-normal">({sale.reviews} reviews)</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">🤍</span> Save
              </button>
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">📤</span> Share
              </button>
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">🌐</span> Website
              </button>
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">📞</span> Call
              </button>
            </div>

            {/* Details */}
            <div className="border-t border-gray-100 pt-4 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-500">
                <span>📍 Location</span>
                <span className="font-semibold text-gray-900 text-right max-w-[60%]">{sale.location}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>📅 Date</span>
                <span className="font-semibold text-red-600">{sale.date}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>💰 Price</span>
                <span className="font-semibold text-green-600">{sale.price}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>🎯 Offer</span>
                <span className="font-semibold text-red-600 animate-pulse">{sale.discount}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>📂 Category</span>
                <span className="font-semibold text-gray-900">{sale.category}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <a 
                href={sale.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-dark-brown hover:bg-[#543b2d] text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold transition shadow-sm text-center text-sm sm:text-base"
              >
                📍 Get Directions
              </a>
              <button className="block w-full bg-red-500 hover:bg-red-600 text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold transition shadow-sm text-center text-sm sm:text-base">
                🎟️ Claim Offer
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default function Sales() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SalesContent />
    </Suspense>
  );
}