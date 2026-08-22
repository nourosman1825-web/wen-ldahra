"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PlaceDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || "1";

  const allPlaces = [
    {
      id: "1",
      name: "Beit El Nessim",
      rating: "4.8",
      reviews: "210",
      location: "Tripoli, Lebanon",
      about: "Experience the heritage and charm of old Tripoli. Beit El Nessim offers a unique atmosphere where traditional architecture meets modern comfort.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2000"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Beit+El+Nessim+Tripoli"
    },
    {
      id: "2",
      name: "Paul Café",
      rating: "4.5",
      reviews: "340",
      location: "Tripoli, Lebanon",
      about: "Famous French bakery and café offering delicious breakfast and cozy vibes.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2000"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Paul+Cafe+Tripoli"
    },
    {
      id: "3",
      name: "Calm Café",
      rating: "4.6",
      reviews: "128",
      location: "Tripoli, Lebanon",
      about: "A quiet and cozy café perfect for studying, reading, or working. Free Wi-Fi and comfortable seating.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2000"
      ],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Calm+Cafe+Tripoli"
    }
  ];

  const place = allPlaces.find(p => String(p.id) === String(id)) || allPlaces[0];
  const [activeImage, setActiveImage] = useState(place.image);
  const currentImage = activeImage || place.image;

  return (
    <div className="min-h-screen bg-[#f3e9dd] pb-12 sm:pb-16">
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link href="/explore" className="text-[#6b4e3d] hover:underline font-medium text-sm inline-flex items-center gap-1">
          ← Back to results
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Image & Thumbnails & About & Features */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Image */}
          <div className="w-full h-56 sm:h-80 md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">
            <img 
              src={currentImage} 
              alt={place.name} 
              className="w-full h-full object-cover transition-all duration-300" 
            />
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {place.images.map((imgUrl, index) => (
              <div 
                key={index} 
                onClick={() => setActiveImage(imgUrl)}
                className={`w-20 h-16 sm:w-24 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0 border-2 cursor-pointer transition-all ${
                  currentImage === imgUrl ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">About</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {place.about}
            </p>
          </div>

          {/* Features / Services Section */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Features / Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">📶</span>
                <span className="text-xs font-semibold text-gray-700">Wi-Fi</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">🤫</span>
                <span className="text-xs font-semibold text-gray-700">Quiet</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">🪑</span>
                <span className="text-xs font-semibold text-gray-700">Indoor</span>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                <span className="block text-lg sm:text-xl mb-1">📚</span>
                <span className="text-xs font-semibold text-gray-700">Study Friendly</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Place Card Info & Action Buttons */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-5 sm:space-y-6 lg:sticky lg:top-6">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold">Open</span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{place.name}</h1>
                <p className="text-amber-500 font-semibold text-sm mt-1">
                  ★ {place.rating} <span className="text-gray-400 font-normal">({place.reviews})</span>
                </p>
              </div>
            </div>

            {/* Quick Action Icons */}
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
                <span>Location</span>
                <span className="font-semibold text-gray-900">{place.location}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Hours</span>
                <span className="font-semibold text-emerald-600">Open now <span className="text-gray-900 font-normal block sm:inline">8:00 AM - 11:00 PM</span></span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Price</span>
                <span className="font-semibold text-gray-900">$$</span>
              </div>
            </div>

            {/* View on Map Button */}
            <div className="border-t border-gray-100 pt-4">
              <a 
                href={place.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-[#6b4e3d] hover:bg-[#543b2d] text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold transition shadow-sm text-center text-sm sm:text-base"
              >
                View on Map
              </a>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default function PlaceDetails() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <PlaceDetailsContent />
    </Suspense>
  );
}