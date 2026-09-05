"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosGet, axiosPut } from "@/app/lib/axios";
import { ISale } from "@/app/interfaces/interfaces";

export default function EditSalePage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    date: "",
    isSale: false,
    discount: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSale() {
      try {
        const response = await axiosGet<ISale>(`/sales/${id}`);
        const sale = response.data;
        if (sale) {
          setForm({
            title: sale.title ?? "",
            description: sale.description ?? "",
            category: sale.category ?? "",
            image: sale.image ?? "",
            date: sale.date ?? "",
            isSale: sale.isSale ?? false,
            discount: sale.discount ?? "",
            location: sale.location ?? "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getSale();
  }, [id]);

  const updateMutation = useMutation({
    mutationFn: (values: ISale) => axiosPut<ISale, unknown>(`/sales/${id}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      router.push("/manage-sales");
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate({
      title: form.title,
      description: form.description || undefined,
      category: form.category,
      image: form.image || undefined,
      date: form.date || undefined,
      isSale: form.isSale,
      discount: form.discount || undefined,
      location: form.location || undefined,
    });
  }

  if (loading) {
    return <div className="p-8 text-sm text-gray-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-beige p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-dark-brown mb-1">Edit Sale</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
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

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isSale"
              name="isSale"
              type="checkbox"
              checked={form.isSale}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="isSale" className="text-xs font-medium text-gray-600">
              This is a sale (show discount badge)
            </label>
          </div>

          {form.isSale && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Discount</label>
              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-brown hover:bg-dark-brown text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/manage-sales")}
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