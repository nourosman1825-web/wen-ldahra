"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPost } from "@/app/lib/axios";
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

export default function AddPlacePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<PlaceForm>(initialForm);
  const [success, setSuccess] = useState(false);

  const createMutation = useMutation({
    mutationFn: (values: IPlace) => axiosPost<IPlace, unknown>("/places", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      setForm(initialForm);
      setSuccess(true);
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
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
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    });
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-beige p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-dark-brown mb-1">Add a Place</h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details below to add a new place to the database.
        </p>

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
                placeholder="4.5"
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
                placeholder="200"
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
              placeholder="1.2"
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
            <p className="text-[11px] text-gray-400 mt-1">
              Tags power the filter buttons on the Explore page — leave this empty and the place won't show up under any tag filter except "All".
            </p>
          </div>

          {createMutation.isError && (
            <p className="text-red-500 text-sm">{errorMessage(createMutation.error)}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">
              Place added! Add another, or{" "}
              <button type="button" onClick={() => router.push("/result")} className="underline">
                go see it in results
              </button>
              .
            </p>
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
    </main>
  );
}
