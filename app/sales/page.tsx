"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "@/app/lib/axios";
import { ISale } from "@/app/interfaces/interfaces";

export default function SaleDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { data: sale, isLoading, error } = useQuery<ISale>({
    queryKey: ["sales", id],
    queryFn: async () => {
      const response = await axiosGet<ISale>(`/sales/${id}`);
      if (!response.data) throw new Error("Sale not found");
      return response.data;
    },
    enabled: !!id,
  });

  if (!id) {
    return <div className="p-8 text-sm text-red-500">No sale id provided.</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown"></div>
      </div>
    );
  }

  if (error || !sale) {
    return <div className="p-8 text-sm text-red-500">Couldn't load this sale.</div>;
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-sm text-brown hover:text-dark-brown mb-4"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-beige/40 h-72 sm:h-96">
            {sale.image && (
              <img
                src={sale.image}
                alt={sale.title}
                className="w-full h-full object-cover"
              />
            )}
            {sale.isSale && sale.discount && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                {sale.discount}
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
              {sale.category}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-beige shadow-sm p-6 sm:p-8 space-y-4">
            {sale.isSale && (
              <span className="inline-block text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                🎉 Special Offer
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">{sale.title}</h1>

            <div className="divide-y divide-beige/40 border-t border-beige/40 pt-2 text-sm">
              {sale.location && (
                <div className="flex justify-between py-2">
                  <span className="text-text/60">📍 Location</span>
                  <span className="font-semibold text-text">{sale.location}</span>
                </div>
              )}
              {sale.date && (
                <div className="flex justify-between py-2">
                  <span className="text-text/60">🗓️ Date</span>
                  <span className="font-semibold text-text">{sale.date}</span>
                </div>
              )}
              {sale.discount && (
                <div className="flex justify-between py-2">
                  <span className="text-text/60">🎯 Offer</span>
                  <span className="font-semibold text-red-500">{sale.discount}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-text/60">📁 Category</span>
                <span className="font-semibold text-text">{sale.category}</span>
              </div>
            </div>

            {sale.description && (
              <div className="pt-2">
                <h2 className="text-sm font-semibold text-dark-brown mb-1">About this offer</h2>
                <p className="text-sm text-text/70 leading-relaxed">{sale.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}