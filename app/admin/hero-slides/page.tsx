"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, AlertCircle, Save, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface HeroSlide {
  id: number;
  image: string;
  tag: string;
  tagIcon: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  statValue: string | null;
  statLabel: string | null;
  sortOrder: number;
  active: boolean;
}

const EMPTY_SLIDE: Omit<HeroSlide, "id"> = {
  image: "",
  tag: "",
  tagIcon: "Leaf",
  headline: "",
  subtext: "",
  ctaLabel: "",
  ctaHref: "/",
  accent: "#f4c430",
  statValue: "",
  statLabel: "",
  sortOrder: 0,
  active: true,
};

const TAG_ICON_OPTIONS = [
  "Leaf",
  "BookOpen",
  "Users",
  "Globe",
  "Award",
  "GraduationCap",
  "Heart",
];

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<HeroSlide> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSlides = useCallback(async () => {
    try {
      const res = await fetch("/api/hero-slides");
      const data = await res.json();
      if (data.success) setSlides(data.data);
      else setError(data.error);
    } catch {
      setError("Failed to load slides.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const handleSave = async () => {
    if (!editing) return;
    setError("");
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/hero-slides" : `/api/hero-slides/${editing.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        },
      );
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        fetchSlides();
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to save slide.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this slide?")) return;
    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchSlides();
      else setError(data.error);
    } catch {
      setError("Failed to delete slide.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-[#1a1550]/50">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setEditing({ ...EMPTY_SLIDE })}
          className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Slide
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-[#1077A6]/20 p-6 space-y-4">
          <h3 className="font-display font-bold text-[#1a1550] text-lg">
            {editing.id ? "Edit Slide" : "New Slide"}
          </h3>

          <ImageUpload
            value={editing.image || ""}
            onChange={(url) => setEditing({ ...editing, image: url })}
            label="Slide Background Image"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Tag Text
              </label>
              <input
                type="text"
                value={editing.tag || ""}
                onChange={(e) =>
                  setEditing({ ...editing, tag: e.target.value })
                }
                placeholder="e.g. Preserving Heritage"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Tag Icon
              </label>
              <select
                value={editing.tagIcon || "Leaf"}
                onChange={(e) =>
                  setEditing({ ...editing, tagIcon: e.target.value })
                }
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              >
                {TAG_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Headline
              </label>
              <textarea
                value={editing.headline || ""}
                onChange={(e) =>
                  setEditing({ ...editing, headline: e.target.value })
                }
                rows={2}
                placeholder="Main headline text"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Subtext
              </label>
              <textarea
                value={editing.subtext || ""}
                onChange={(e) =>
                  setEditing({ ...editing, subtext: e.target.value })
                }
                rows={2}
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Button Label
              </label>
              <input
                type="text"
                value={editing.ctaLabel || ""}
                onChange={(e) =>
                  setEditing({ ...editing, ctaLabel: e.target.value })
                }
                placeholder="e.g. Explore Our Work"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Button Link
              </label>
              <input
                type="text"
                value={editing.ctaHref || ""}
                onChange={(e) =>
                  setEditing({ ...editing, ctaHref: e.target.value })
                }
                placeholder="/about"
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
                  value={editing.accent || "#f4c430"}
                  onChange={(e) =>
                    setEditing({ ...editing, accent: e.target.value })
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={editing.accent || "#f4c430"}
                  onChange={(e) =>
                    setEditing({ ...editing, accent: e.target.value })
                  }
                  className="flex-1 border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Stat Value
              </label>
              <input
                type="text"
                value={editing.statValue || ""}
                onChange={(e) =>
                  setEditing({ ...editing, statValue: e.target.value })
                }
                placeholder="e.g. 200+"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Stat Label
              </label>
              <input
                type="text"
                value={editing.statLabel || ""}
                onChange={(e) =>
                  setEditing({ ...editing, statLabel: e.target.value })
                }
                placeholder="e.g. Publications"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
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
            <div className="flex items-center gap-2 pt-5">
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
          </div>
          <div className="flex gap-3 pt-2">
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
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Image</th>
              <th className="px-4 py-3 text-left font-semibold">
                Tag / Headline
              </th>
              <th className="px-4 py-3 text-left font-semibold">Active</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1077A6]/8">
            {slides.map((slide) => (
              <tr
                key={slide.id}
                className="hover:bg-[#f8f7fc] transition-colors"
              >
                <td className="px-4 py-3 text-[#1a1550]/50">
                  {slide.sortOrder}
                </td>
                <td className="px-4 py-3">
                  {slide.image ? (
                    <div className="relative w-16 h-10 rounded overflow-hidden bg-[#f8f7fc]">
                      <Image
                        src={slide.image}
                        alt={slide.tag}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="text-[#1a1550]/30 text-xs">No image</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[#1a1550]">
                    {slide.tag}
                  </div>
                  <div className="text-[#1a1550]/50 text-xs truncate max-w-xs">
                    {slide.headline}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${slide.active ? "bg-green-500" : "bg-gray-300"}`}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditing(slide)}
                      className="p-1.5 rounded-lg hover:bg-[#1077A6]/10 text-[#1077A6]"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {slides.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-[#1a1550]/40"
                >
                  No slides yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
