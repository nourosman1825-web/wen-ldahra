"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPlacePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    image: "",
    rating: "",
    reviewCount: "",
    distance: "",
    latitude: "",
    longitude: "",
    tags: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getPlace() {
      try {
        const response = await fetch(`/api/places/${id}`);
        const result = await response.json();

        const place = result.data;

        setForm({
          name: place.name ?? "",
          description: place.description ?? "",
          category: place.category ?? "",
          address: place.address ?? "",
          image: place.image ?? "",
          rating: place.rating?.toString() ?? "",
          reviewCount: place.reviewCount?.toString() ?? "",
          distance: place.distance?.toString() ?? "",
          latitude: place.latitude?.toString() ?? "",
          longitude: place.longitude?.toString() ?? "",
          tags: Array.isArray(place.tags)
            ? place.tags.join(", ")
            : "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPlace();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          rating: Number(form.rating),
          reviewCount: Number(form.reviewCount),
          distance: Number(form.distance),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update place");
      }

      alert("Place updated successfully!");
      router.push("/manage-places");
    } catch (error) {
      console.error(error);
      alert("Failed to update place");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-sm text-gray-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-beige p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-dark-brown mb-1">Edit Place</h1>
        <p className="text-sm text-gray-500 mb-6">
          Update the details below to modify the place in the database.
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
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20 bg-white"
              required
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description of the place"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Latitude</label>
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                type="number"
                step="any"
                placeholder="33.8938"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Longitude</label>
              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                type="number"
                step="any"
                placeholder="35.5018"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>
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
              Tags power the filter buttons on the Explore page.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-brown hover:bg-dark-brown text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/manage-places")}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}