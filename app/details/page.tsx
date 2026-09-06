"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IPlace } from '@/app/interfaces/interfaces';



function PlaceDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [place, setPlace] = useState<IPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No place ID provided");
      setLoading(false);
      return;
    }

    async function fetchPlace() {
      try {
        const res = await fetch(`/api/places/${id}`);
        const json = await res.json();

        if (json.status !== 200) {
          setError(json.message || "Failed to load place");
          setLoading(false);
          return;
        }

        setPlace(json.data);
        setActiveImage(json.data.image);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        setLoading(false);
      }
    }

    fetchPlace();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error || !place) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">{error || "Place not found"}</p>
        <Link href="/explore" className="text-dark-brown hover:underline">
          ← Back to results
        </Link>
      </div>
    );
  }

  const allImages = [place.image, ...(place.images || [])].filter(Boolean) as string[];
  const currentImage = activeImage || place.image || "";

  const mapLink = place.latitude && place.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;

  return (
    <div className="min-h-screen bg-cream pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link href="/explore" className="text-dark-brown hover:underline font-medium text-sm inline-flex items-center gap-1">
          ← Back to results
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
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
              {allImages.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-16 sm:w-24 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 shrink-0 border-2 cursor-pointer transition-all ${
                    currentImage === imgUrl ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

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
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Features / Services</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {place.tags.map((tag, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-5 sm:space-y-6 lg:sticky lg:top-6">

            <div className="flex justify-between items-start">
              <div>
                <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold">
                  {place.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{place.name}</h1>
                <p className="text-amber-500 font-semibold text-sm mt-1">
                  ★ {place.rating.toFixed(1)} <span className="text-gray-400 font-normal">({place.reviewCount})</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">🤍</span> Save
              </button>
              <button className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition">
                <span className="text-base sm:text-lg mb-0.5">📤</span> Share
              </button>
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition"
                >
                  <span className="text-base sm:text-lg mb-0.5">🌐</span> Website
                </a>
              )}
              {place.phone && (
                <a
                  href={`tel:${place.phone}`}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition"
                >
                  <span className="text-base sm:text-lg mb-0.5">📞</span> Call
                </a>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-xs sm:text-sm">
              {place.address && (
                <div className="flex justify-between text-gray-500">
                  <span>Location</span>
                  <span className="font-semibold text-gray-900">{place.address}</span>
                </div>
              )}
              {(place.openTime || place.closeTime) && (
                <div className="flex justify-between text-gray-500">
                  <span>Hours</span>
                  <span className="font-semibold text-gray-900">
                    {place.openTime} - {place.closeTime}
                  </span>
                </div>
              )}
              {place.price && (
                <div className="flex justify-between text-gray-500">
                  <span>Price</span>
                  <span className="font-semibold text-gray-900">{place.price}</span>
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