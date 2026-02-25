"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  Save,
  X,
  Newspaper,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg p-4 text-sm text-[#1a1550]/40">
      Loading editor...
    </div>
  ),
});

const CATEGORIES = [
  { value: "news-events", label: "News and Events" },
  { value: "training-workshop", label: "Training & Workshop" },
  { value: "activities", label: "Activities" },
  { value: "circulars", label: "Circulars & Notifications" },
];

interface UpdateItem {
  id: number;
  category: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  publishedAt: string;
  active: boolean;
}

export default function UpdatesAdmin() {
  const [items, setItems] = useState<UpdateItem[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<UpdateItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const base = filterCat
        ? `/api/updates?category=${filterCat}&includeInactive=true`
        : "/api/updates?includeInactive=true";
      const res = await fetch(base);
      const data = await res.json();
      if (data.success) setItems(data.data);
      else setError(data.error);
    } catch {
      setError("Failed to load updates.");
    } finally {
      setLoading(false);
    }
  }, [filterCat]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!editing) return;
    setError("");
    try {
      const isNew = !editing.id;
      const payload = {
        ...editing,
        slug: editing.slug || slugify(editing.title || ""),
      };
      const res = await fetch(
        isNew ? "/api/updates" : `/api/updates/${editing.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        fetchItems();
      } else setError(data.error);
    } catch {
      setError("Failed to save.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this update?")) return;
    try {
      const res = await fetch(`/api/updates/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchItems();
      else setError(data.error);
    } catch {
      setError("Failed to delete.");
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-[#1a1550]/50">
        Loading...
      </div>
    );

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#1077A6]" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="border border-[#1077A6]/15 rounded-lg px-3 py-1.5 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() =>
            setEditing({
              category: "news-events",
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              image: "",
              active: true,
            })
          }
          className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
        >
          <Plus className="w-4 h-4" /> Add Update
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-[#1077A6]/20 p-6 space-y-5">
          <h3 className="font-display font-bold text-[#1a1550] text-lg">
            {editing.id ? "Edit" : "New"} Update
          </h3>

          <ImageUpload
            value={editing.image || ""}
            onChange={(url) => setEditing({ ...editing, image: url })}
            label="Featured Image"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Category
              </label>
              <select
                value={editing.category || "news-events"}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editing.title || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                    slug: editing.id ? editing.slug : slugify(e.target.value),
                  })
                }
                placeholder="Update title"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={editing.slug || ""}
                onChange={(e) =>
                  setEditing({ ...editing, slug: e.target.value })
                }
                placeholder="auto-generated-from-title"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] font-mono focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Published Date
              </label>
              <input
                type="datetime-local"
                value={
                  editing.publishedAt
                    ? new Date(editing.publishedAt).toISOString().slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    publishedAt: new Date(e.target.value).toISOString(),
                  })
                }
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
              Excerpt
            </label>
            <textarea
              value={editing.excerpt || ""}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              rows={2}
              placeholder="Brief summary shown in listings"
              className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
            />
          </div>

          <RichEditor
            content={editing.content || ""}
            onChange={(html) => setEditing({ ...editing, content: html })}
            label="Content"
            placeholder="Write the full update content..."
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editing.active ?? true}
              onChange={(e) =>
                setEditing({ ...editing, active: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-sm text-[#1a1550]">Active</label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
            >
              <Save className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 bg-gray-100 text-[#1a1550] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#1077A6]/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1077A6] text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Image</th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Active</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1077A6]/8">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#f8f7fc]">
                <td className="px-4 py-3">
                  {item.image ? (
                    <div className="relative w-12 h-8 rounded overflow-hidden bg-[#f8f7fc]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-8 rounded bg-[#1077A6]/10 flex items-center justify-center">
                      <Newspaper className="w-3 h-3 text-[#1077A6]" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-[#1a1550] max-w-[200px] truncate">
                  {item.title}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#1077A6]/10 text-[#1077A6] capitalize">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#1a1550]/60">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      item.active ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditing(item)}
                      className="p-1.5 rounded-lg hover:bg-[#1077A6]/10 text-[#1077A6]"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[#1a1550]/40"
                >
                  No updates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
