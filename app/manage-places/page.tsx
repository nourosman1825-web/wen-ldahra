"use client";
import React from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Place } from "@/app/generated/prisma/client";
import { axiosGet, axiosDelete } from "@/app/lib/axios";

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function ManagePlacesPage() {
  const queryClient = useQueryClient();

  const {
    data: places,
    isLoading,
    error,
  } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: async () => {
      const response = await axiosGet<Place[]>("/places");
      return response.data || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axiosDelete<Place>(`/places/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  function handleDelete(place: Place) {
    if (window.confirm(`Delete "${place.name}"? This can't be undone.`)) {
      deleteMutation.mutate(place.id);
    }
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark-brown">Manage Places</h1>
          <Link
            href="/add-place"
            className="bg-brown hover:bg-dark-brown text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            + Add Place
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-beige shadow-sm overflow-hidden">
          {isLoading && (
            <p className="p-6 text-sm text-gray-500">Loading places...</p>
          )}
          {!isLoading && error && (
            <p className="p-6 text-sm text-red-500">
              {errorMessage(error) ?? "Couldn't load places."}
            </p>
          )}
          {!isLoading && places && places.length === 0 && (
            <p className="p-6 text-sm text-gray-500">
              No places yet — add one to get started.
            </p>
          )}
          {!isLoading && places && places.length > 0 && (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Rating</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {places.map((place) => (
                  <tr key={place.id}>
                    <td className="px-5 py-3 font-medium text-gray-800">{place.name}</td>
                    <td className="px-5 py-3 text-gray-500">{place.category}</td>
                    <td className="px-5 py-3 text-amber-600">★ {place.rating.toFixed(1)}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDelete(place)}
                        disabled={
                          deleteMutation.isPending &&
                          deleteMutation.variables === place.id
                        }
                        className="text-red-500 hover:text-red-700 font-medium text-xs disabled:opacity-50"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === place.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
