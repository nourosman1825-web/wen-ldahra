"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Place } from "@/app/generated/prisma/client";
import { axiosGet, axiosDelete, axiosPost } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { IPlace } from "@/app/interfaces/interfaces";

interface PlaceForm {
  name: string;
  category: string;
  rating: string;
  reviewCount: string;
  distance: string;
  image: string;
  tags: string;
  address: string;
}

const initialForm: PlaceForm = {
  name: "",
  category: "",
  rating: "",
  reviewCount: "",
  distance: "",
  image: "",
  tags: "",
  address: "",
};

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function ManagePlacesPage() {
  const route = useRouter();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PlaceForm>(initialForm);

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

  const createMutation = useMutation({
    mutationFn: (values: IPlace) => axiosPost<IPlace, unknown>("/places", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      setForm(initialForm);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axiosDelete<Place>(`/places/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category) return;

    createMutation.mutate({
      name: form.name,
      category: form.category,
      rating: form.rating ? parseFloat(form.rating) : 0,
      reviewCount: form.reviewCount ? parseInt(form.reviewCount) : 0,
      distance: form.distance ? parseFloat(form.distance) : undefined,
      image: form.image || undefined,
      address: form.address || undefined,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    });
  }

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
        <button
          onClick={() => setShowForm(true)}
          className="bg-brown hover:bg-dark-brown text-white text-sm font-medium px-4 py-2 rounded-xl transition"
        >
          + Add Place
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-beige shadow-sm overflow-hidden">
        {isLoading && <p className="p-6 text-sm text-gray-500">Loading places...</p>}
        {!isLoading && error && (
          <p className="p-6 text-sm text-red-500">{errorMessage(error) ?? "Couldn't load places."}</p>
        )}
        {!isLoading && places && places.length === 0 && (
          <p className="p-6 text-sm text-gray-500">No places yet — add one to get started.</p>
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
                      onClick={() => route.push(`/manage-places/edit/${place.id}`)}
                      className="text-blue-500 hover:text-blue-700 font-medium text-xs mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(place)}
                      disabled={deleteMutation.isPending && deleteMutation.variables === place.id}
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

    {/* Modal */}
    {showForm && (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={() => setShowForm(false)}
      >
        <div
          className="bg-white rounded-2xl border border-beige shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-brown">New Place</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Café Younes"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20 bg-white"
              >
                <option value="">Select a category</option>
                <option value="Cafés">Cafés</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Parks">Parks</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Gyms">Gyms</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rating (0-5)</label>
                <input
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Review Count</label>
                <input
                  name="reviewCount"
                  value={form.reviewCount}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Distance (km)</label>
              <input
                name="distance"
                value={form.distance}
                onChange={handleChange}
                type="number"
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g. Hamra, Beirut"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Café, Wi-Fi, Quiet"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>

            {createMutation.isError && (
              <p className="text-red-500 text-sm">{errorMessage(createMutation.error)}</p>
            )}

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full bg-brown hover:bg-dark-brown text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
              {createMutation.isPending ? "Saving..." : "Add Place"}
            </button>
          </form>
        </div>
      </div>
    )}
  </main>
);
}