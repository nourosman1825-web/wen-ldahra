// app/allsales/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "@/app/lib/axios";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  isSale?: boolean;
  discount?: string;
  location: string;
}

export default function AllSales() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: allEvents = [], isLoading: loading } = useQuery<Event[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      const response = await axiosGet<Event[]>("/sales");
      return response.data || [];
    },
  });

  const categories = ['All', ...new Set(allEvents.map(event => event.category))];

  const filteredEvents = selectedCategory === 'All'
    ? allEvents
    : allEvents.filter(event => event.category === selectedCategory);

  const handleEventClick = (event: Event) => {
    router.push(`/sales?id=${event.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown mx-auto"></div>
          <p className="mt-4 text-text/70">Loading all deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-12">
      {/* Header */}
      <div className="bg-white border-b border-beige/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-dark-brown hover:text-brown transition">
                ← Back to Home
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-brown">
                All Sales & Events
              </h1>
            </div>
            <span className="text-sm text-text/70">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'deal' : 'deals'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-white text-text/70 hover:bg-brown/10 border border-beige/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* All Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text/70">No events found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-beige/30 hover:border-brown/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {event.isSale && event.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                      {event.discount}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-text text-sm sm:text-base group-hover:text-brown transition-colors">
                      {event.title}
                    </h3>
                    <span className="text-xs text-text/50 flex items-center gap-1">
                      📍 {event.location}
                    </span>
                  </div>
                  
                  <p className="text-text/70 text-xs sm:text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-beige/30">
                    <span className="text-xs text-brown font-medium flex items-center gap-1">
                      🗓️ {event.date}
                    </span>
                    <button className="text-xs text-brown hover:text-dark-brown font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}