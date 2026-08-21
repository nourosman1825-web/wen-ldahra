// app/page.tsx
import Image from "next/image";
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream"  >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-beige2">
        <div className="grid   md:grid-cols-2 gap-8 items-center">
          {/* Left: text + search */}
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-dark-brown bg-cream border border-brown rounded-full px-3 py-1 mb-4">
        ⊙ AI-POWERED DISCOVERY
      </span>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Discover the <br/> <span className="text-brown">right place</span> <br/> around you
      </h1>
     
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Search with AI and find the best places near you in seconds. Just describe what you need, naturally.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl flex flex-col sm:flex-row gap-3 text-sm">
              <input
                type="text"
                placeholder="Search for places or ask anything..."
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
              <button className="bg-brown hover:bg-dark-brown text-white font-semibold py-3 px-6 rounded-lg">
                Search / Find Places
              </button>
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
  <Image
    src="/photos/home.jpeg"
    alt="Cozy coffee shop storefront"
    fill
    className="object-cover"
    priority
  />
</div>
        </div>
      </section>

{/* Categories Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h2 className="text-3xl font-bold text-brown mb-2">Categories</h2>
  <p className="text-gray-600 mb-6">Browse by place type</p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    {categories.map((category) => (
      <div
        key={category.name}
        className="bg-beige2 hover:bg-brown hover:text-white border border-gray-200 rounded-xl p-4 text-center cursor-pointer transition duration-200 shadow-sm flex flex-col items-center gap-2"
      >
        <span className="text-3xl">{category.icon}</span>
        <span className="font-medium">{category.name}</span>
      </div>
    ))}
  </div>
</section>

{/* Popular Near You Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="relative rounded-2xl overflow-hidden shadow-md h-64 sm:h-72">
    <Image
      src="/photos/explore.jpeg"
      alt="Popular places near you"
      fill
      className="object-cover"
    />
    {/* Brown gradient overlay so text stays readable */}
    <div className="absolute inset-0 bg-gradient-to-r from-brown/90 via-brown/70 to-brown/30" />

    <div className="relative h-full flex flex-col sm:flex-row items-center justify-between gap-4 p-8 sm:p-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Popular near you
        </h2>
        <p className="text-beige2 text-sm sm:text-base">
          Explore top-rated places around you right now
        </p>
      </div>
      <button className="flex items-center gap-2 bg-white text-brown font-semibold px-6 py-3 rounded-lg hover:bg-beige2 transition duration-200 whitespace-nowrap">
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