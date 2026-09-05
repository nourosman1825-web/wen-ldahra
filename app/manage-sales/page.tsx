"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sale } from "@/app/generated/prisma/client";
import { axiosGet, axiosDelete, axiosPost } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { ISale } from "@/app/interfaces/interfaces";

interface SaleForm {
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  isSale: boolean;
  discount: string;
  location: string;
}

const initialForm: SaleForm = {
  title: "",
  description: "",
  category: "",
  image: "",
  date: "",
  isSale: false,
  discount: "",
  location: "",
};

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function ManageSalesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<SaleForm>(initialForm);

  const {
    data: sales,
    isLoading,
    error,
  } = useQuery<Sale[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      const response = await axiosGet<Sale[]>("/sales");
      return response.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: (values: ISale) => axiosPost<ISale, unknown>("/sales", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      setForm(initialForm);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axiosDelete<Sale>(`/sales/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
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
    if (!form.title || !form.category) return;

    createMutation.mutate({
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

  function handleDelete(sale: Sale) {
    if (window.confirm(`Delete "${sale.title}"? This can't be undone.`)) {
      deleteMutation.mutate(sale.id);
    }
  }

  return (
    <main className="min-h-screen bg-cream p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark-brown">Manage Sales & Events</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-brown hover:bg-dark-brown text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            + Add Sale
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-beige shadow-sm overflow-hidden">
          {isLoading && <p className="p-6 text-sm text-gray-500">Loading sales...</p>}
          {!isLoading && error && (
            <p className="p-6 text-sm text-red-500">{errorMessage(error) ?? "Couldn't load sales."}</p>
          )}
          {!isLoading && sales && sales.length === 0 && (
            <p className="p-6 text-sm text-gray-500">No sales yet — add one to get started.</p>
          )}
          {!isLoading && sales && sales.length > 0 && (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Discount</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-5 py-3 font-medium text-gray-800">{sale.title}</td>
                    <td className="px-5 py-3 text-gray-500">{sale.category}</td>
                    <td className="px-5 py-3 text-amber-600">{sale.discount || "—"}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => router.push(`/manage-sales/edit/${sale.id}`)}
                        className="text-blue-500 hover:text-blue-700 font-medium text-xs mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sale)}
                        disabled={deleteMutation.isPending && deleteMutation.variables === sale.id}
                        className="text-red-500 hover:text-red-700 font-medium text-xs disabled:opacity-50"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === sale.id
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
              <h2 className="text-lg font-semibold text-dark-brown">New Sale / Event</h2>
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Summer Coffee Sale"
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

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short description of the deal or event"
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
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Downtown"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. Aug 15-30"
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
                    placeholder="e.g. 20% OFF"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown/20"
                  />
                </div>
              )}

              {createMutation.isError && (
                <p className="text-red-500 text-sm">{errorMessage(createMutation.error)}</p>
              )}

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full bg-brown hover:bg-dark-brown text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
              >
                {createMutation.isPending ? "Saving..." : "Add Sale"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}