// app/more/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MoreCategoriesPage() {
  const router = useRouter();

  const allCategories = [
    { name: 'Cafés', icon: '☕', description: 'Best coffee shops and cozy spots' },
    { name: 'Restaurants', icon: '🍽️', description: 'Dine at the finest restaurants' },
    { name: 'Parks', icon: '🌳', description: 'Relax in beautiful green spaces' },
    { name: 'Shopping', icon: '🛍️', description: 'Shop at top malls and boutiques' },
    { name: 'Entertainment', icon: '🎭', description: 'Movies, nightlife, and fun' },
    { name: 'Gyms', icon: '💪', description: 'Stay fit at premium gyms' },
    { name: 'Hotels', icon: '🏨', description: 'Luxury and budget accommodations' },
    { name: 'Beaches', icon: '🏖️', description: 'Beautiful coastal destinations' },
    { name: 'Historical Sites', icon: '🏛️', description: 'Explore Lebanon\'s rich history' },
    { name: 'Spa & Wellness', icon: '🧖', description: 'Relax and rejuvenate' },
    { name: 'Museums', icon: '🖼️', description: 'Art and cultural exhibitions' },
    { name: 'Bakeries', icon: '🥐', description: 'Fresh pastries and baked goods' },
    { name: 'Bookstores', icon: '📚', description: 'Find your next read' },
  ];

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/result?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <main className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-brown hover:text-dark-brown text-sm font-medium flex items-center gap-2 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-brown">All Categories</h1>
          <p className="text-sm text-text/70 mt-2">Browse all available categories and discover new places</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white hover:bg-brown hover:text-white border border-beige rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-4 group hover:-translate-y-1"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                {category.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg group-hover:text-white">
                  {category.name}
                </h3>
                <p className="text-xs text-text/60 group-hover:text-cream/80 truncate">
                  {category.description}
                </p>
              </div>
              <span className="text-brown group-hover:text-cream text-xl flex-shrink-0">
                →
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 p-4 bg-beige/20 rounded-2xl border border-beige text-center">
          <p className="text-sm text-text/70">
            Showing <span className="font-semibold text-brown">{allCategories.length}</span> categories
          </p>
        </div>
      </div>
    </main>
  );
}