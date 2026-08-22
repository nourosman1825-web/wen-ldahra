// app/page.tsx
"use client";

import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/result?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/result');
    }
  };

  const handleExploreClick = () => {
    router.push('/explore');
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-beige2/60 rounded-3xl mt-4 border border-beige">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Text + Search */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark-brown bg-cream border border-brown/30 rounded-full px-3 py-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brown animate-pulse"></span>
              AI-POWERED DISCOVERY
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text leading-tight">
              Discover the <br /> 
              <span className="text-brown underline decoration-brown/30 underline-offset-4">right place</span> <br /> 
              around you
            </h1>

            <p className="text-sm sm:text-base text-text/80 max-w-xl leading-relaxed">
              Search with AI and find the best places near you in seconds. Just describe what you need, naturally.
            </p>

            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="max-w-xl flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for places or ask anything..."
                className="flex-1 px-4 py-3 bg-white border border-beige focus:border-brown rounded-xl focus:outline-none focus:ring-2 focus:ring-brown/20 text-sm sm:text-base text-text shadow-sm transition"
              />
              <button 
                type="submit" 
                className="bg-brown hover:bg-dark-brown text-white font-medium py-3 px-6 rounded-xl transition shadow-sm active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                Search Places
              </button>
            </form>
          </div>

          {/* Right: Photo */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-md border border-beige/40">
            <Image
              src="/photos/home.jpeg"
              alt="Cozy coffee shop storefront"
              fill
              className="object-cover hover:scale-105 transition duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-brown">Categories</h2>
          <p className="text-xs sm:text-sm text-text/70 mt-1">Browse places by type</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => router.push(`/categories/${category.name.toLowerCase()}`)}
              className="bg-white/80 hover:bg-brown hover:text-white border border-beige rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2 group hover:-translate-y-1"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</span>
              <span className="font-semibold text-xs sm:text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Near You Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-72 sm:h-80 border border-beige/30">
          <Image
            src="/photos/explore.jpeg"
            alt="Popular places near you"
            fill
            className="object-cover"
          />
          {/* Overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/90 via-dark-brown/75 to-transparent" />

          <div className="relative h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-12">
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Popular near you
              </h2>
              <p className="text-cream text-xs sm:text-sm leading-relaxed">
                Explore top-rated places, hidden gems, and local favorites around you right now.
              </p>
            </div>
            <button 
              onClick={handleExploreClick} 
              className="flex items-center gap-2 bg-cream text-dark-brown font-semibold px-6 py-3 rounded-xl hover:bg-white transition duration-200 shadow-sm active:scale-95 whitespace-nowrap text-xs sm:text-sm"
            >
              Explore Now →
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

const categories = [
  { name: 'Cafés', icon: '☕' },
  { name: 'Restaurants', icon: '🍽️' },
  { name: 'Parks', icon: '🌳' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Entertainment', icon: '🎭' },
  { name: 'Gyms', icon: '💪' },
  { name: 'More', icon: '⋯' },
];