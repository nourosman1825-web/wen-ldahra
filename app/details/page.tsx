"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { axiosGet } from '@/app/lib/axios';
import { IPlace } from '@/app/interfaces/interfaces';

function PlaceDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { data: place, isLoading, error } = useQuery<IPlace>({
    queryKey: ["places", id],
    queryFn: async () => {
      const response = await axiosGet<IPlace>(`/places/${id}`);
      if (!response.data) throw new Error("Place not found");
      return response.data;
    },
    enabled: !!id,
  });

  if (!id) {
    return <div className="p-8 text-sm text-red-500">No place id provided.</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown"></div>
      </div>
    );
  }

  if (error || !place) {
    return <div className="p-8 text-sm text-red-500">Couldn't load this place.</div>;
  }

  const currentImage = activeImage || place.image || "";
  const mapQuery = place.latitude != null && place.longitude != null
    ? `${place.latitude},${place.longitude}`
    : encodeURIComponent(place.address || place.name);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="min-h-screen bg-cream pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link href="/result" className="text-dark-brown hover:underline font-medium text-sm inline-flex items-center gap-1">
          Back to results
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <div className="lg:col-span-8 space-y-6">
          <div className="w-full h-56 sm:h-80 md:h-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100">
            {currentImage ? (
              <img
                src={currentImage}
                alt={place.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}
          </div>

          {place.description && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">About</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {place.description}
              </p>
            </div>
          )}

          {place.tags && place.tags.length > 0 && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-50 border border-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-5 sm:space-y-6 lg:sticky lg:top-6">

            <div>
              <span className="bg-brown/10 text-brown text-xs px-3 py-1 rounded-full font-bold">
                {place.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{place.name}</h1>
              <p className="text-amber-500 font-semibold text-sm mt-1">
                Rating: {place.rating != null ? place.rating.toFixed(1) : "N/A"}
                {" "}
                <span className="text-gray-400 font-normal">({place.reviewCount ?? 0} reviews)</span>
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-xs sm:text-sm">
              {place.address && (
                <div className="flex justify-between text-gray-500">
                  <span>Location</span>
                  <span className="font-semibold text-gray-900">{place.address}</span>
                </div>
              )}
              {place.distance != null && (
                <div className="flex justify-between text-gray-500">
                  <span>Distance</span>
                  <span className="font-semibold text-gray-900">{place.distance} km</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-dark-brown hover:bg-[#543b2d] text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold transition shadow-sm text-center text-sm sm:text-base"
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