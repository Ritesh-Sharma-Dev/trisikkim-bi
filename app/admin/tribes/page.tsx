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
  Images,
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

interface TribeItem {
  id: string;
  name: string;
  image: string;
  excerpt: string;
  content: string;
  accent: string;
  heroImage: string;
  gallery: Array<{ url: string; label: string }>;
  sortOrder: number;
  active: boolean;
}

export default function TribesAdmin() {
  const [items, setItems] = useState<TribeItem[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<TribeItem> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/tribes");
      const data = await res.json();
      if (data.success) setItems(data.data);
      else setError(data.error);
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async () => {
    if (!editing) return;
    setError("");
    try {
      const isNew = !items.find((i) => i.id === editing.id);
      const res = await fetch(
        isNew ? "/api/tribes" : `/api/tribes/${editing.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tribe?")) return;
    try {
      const res = await fetch(`/api/tribes/${id}`, { method: "DELETE" });
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
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditing({
              id: "",
              name: "",
              image: "",
              excerpt: "",
              content: "",
              accent: "#4fd1c5",
              heroImage: "",
              gallery: [],
              sortOrder: 0,
              active: true,
            });
          }}
          className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
        >
          <Plus className="w-4 h-4" /> Add Tribe
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-[#1077A6]/20 p-6 space-y-5">
          <h3 className="font-display font-bold text-[#1a1550] text-lg">
            {items.find((i) => i.id === editing.id) ? "Edit" : "New"} Tribe
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ImageUpload
              value={editing.image || ""}
              onChange={(url) => setEditing({ ...editing, image: url })}
              label="Thumbnail Image (for listing)"
            />
            <ImageUpload
              value={editing.heroImage || ""}
              onChange={(url) => setEditing({ ...editing, heroImage: url })}
              label="Hero Banner Image"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                ID (slug)
              </label>
              <input
                type="text"
                value={editing.id || ""}
                onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                placeholder="e.g. lepcha"
                disabled={!!items.find((i) => i.id === editing.id)}
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editing.name || ""}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                placeholder="e.g. Lepcha"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={editing.accent || "#4fd1c5"}
                  onChange={(e) =>
                    setEditing({ ...editing, accent: e.target.value })
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={editing.accent || "#4fd1c5"}
                  onChange={(e) =>
                    setEditing({ ...editing, accent: e.target.value })
                  }
                  className="flex-1 border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={editing.sortOrder || 0}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    sortOrder: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
              Short Excerpt (for listing page)
            </label>
            <textarea
              value={editing.excerpt || ""}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              rows={2}
              placeholder="Brief description shown on the tribes listing page"
              className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
            />
          </div>

          <RichEditor
            content={editing.content || ""}
            onChange={(html) => setEditing({ ...editing, content: html })}
            label="Full Content (detail page)"
            placeholder="Write about this tribe's history, culture, traditions..."
          />

          {/* ── Gallery ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1550]/60">
                <Images className="w-3.5 h-3.5" /> Image Gallery (detail page)
              </label>
              <button
                type="button"
                onClick={() =>
                  setEditing({
                    ...editing,
                    gallery: [
                      ...(editing.gallery ?? []),
                      { url: "", label: "" },
                    ],
                  })
                }
                className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1077A6] hover:text-[#f4c430] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Image
              </button>
            </div>
            <div className="space-y-3">
              {(editing.gallery ?? []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 p-3 rounded-xl border border-[#1077A6]/10 bg-[#f8f7fc]"
                >
                  {/* Image upload — full width on mobile, fixed on desktop */}
                  <div className="w-full sm:w-48 shrink-0">
                    <ImageUpload
                      value={item.url}
                      onChange={(url) => {
                        const g = [...(editing.gallery ?? [])];
                        g[idx] = { ...g[idx], url };
                        setEditing({ ...editing, gallery: g });
                      }}
                      label=""
                      endpoint="galleryUploader"
                    />
                  </div>
                  {/* Label + remove */}
                  <div className="flex flex-1 min-w-0 gap-2 items-start">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-semibold text-[#1a1550]/50 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const g = [...(editing.gallery ?? [])];
                          g[idx] = { ...g[idx], label: e.target.value };
                          setEditing({ ...editing, gallery: g });
                        }}
                        placeholder="e.g. Traditional dress"
                        className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const g = (editing.gallery ?? []).filter(
                          (_, i) => i !== idx,
                        );
                        setEditing({ ...editing, gallery: g });
                      }}
                      className="mt-5 p-1.5 rounded-lg hover:bg-red-50 text-red-400 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(editing.gallery ?? []).length === 0 && (
                <p className="text-[12px] text-[#1a1550]/30 italic py-2">
                  No gallery images yet. Click &quot;Add Image&quot; to add one.
                </p>
              )}
            </div>
          </div>

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
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Active</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1077A6]/8">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#f8f7fc]">
                <td className="px-4 py-3">
                  {item.image ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#f8f7fc]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#1077A6]/10 flex items-center justify-center text-xs font-bold text-[#1077A6]">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-[#1a1550]/60">
                  {item.id}
                </td>
                <td className="px-4 py-3 font-semibold text-[#1a1550]">
                  {item.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${item.active ? "bg-green-500" : "bg-gray-300"}`}
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
                  colSpan={5}
                  className="px-4 py-8 text-center text-[#1a1550]/40"
                >
                  No tribes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
