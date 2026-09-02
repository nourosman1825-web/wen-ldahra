// app/allsales/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Sample data
  const sampleEvents: Event[] = [
    {
      id: '1',
      title: '☕ Summer Coffee Sale',
      description: 'Get 20% off on all iced beverages and cold brews',
      category: 'Cafés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=400&fit=crop',
      date: 'Aug 15-30',
      isSale: true,
      discount: '20% OFF',
      location: 'Downtown'
    },
    {
      id: '2',
      title: '🎵 Live Jazz Night',
      description: 'Enjoy live jazz performances every Friday',
      category: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=400&fit=crop',
      date: 'Every Friday',
      isSale: false,
      location: 'City Center'
    },
    {
      id: '3',
      title: '🍽️ Chef\'s Tasting Menu',
      description: 'New 7-course tasting menu with 15% off',
      category: 'Restaurants',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
      date: 'Starting Aug 20',
      isSale: true,
      discount: '15% OFF',
      location: 'The Plaza'
    },
    {
      id: '4',
      title: '🛍️ Summer Fashion Sale',
      description: 'Up to 50% off on summer collection',
      category: 'Shopping',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
      date: 'Aug 1-31',
      isSale: true,
      discount: '50% OFF',
      location: 'Fashion District'
    },
    {
      id: '5',
      title: '🏋️ Fitness Bootcamp',
      description: '50% off first month membership',
      category: 'Gyms',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
      date: 'Sep 1-30',
      isSale: true,
      discount: '50% OFF',
      location: 'City Gym'
    },
    {
      id: '6',
      title: '🌳 Summer Festival',
      description: 'Live performances and family activities',
      category: 'Parks',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=400&fit=crop',
      date: 'Aug 25-27',
      isSale: false,
      location: 'Central Park'
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(sampleEvents.map(event => event.category))];

  useEffect(() => {
    setAllEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
    setLoading(false);
  }, []);

  // Filter events by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === selectedCategory));
    }
  }, [selectedCategory, allEvents]);

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