"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  Save,
  X,
  ImageIcon,
  FolderOpen,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface GalleryCategory {
  id: number;
  slug: string;
  label: string;
  description: string | null;
  sortOrder: number;
  active: boolean;
}

interface GalleryImage {
  id: number;
  categoryId: number;
  src: string;
  alt: string;
  caption: string | null;
  sortOrder: number;
  active: boolean;
}

export default function GalleryAdmin() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingCat, setEditingCat] = useState<Partial<GalleryCategory> | null>(
    null,
  );
  const [editingImg, setEditingImg] = useState<Partial<GalleryImage> | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        const cats = data.data.map(
          (d: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            images: GalleryImage[];
          }) => ({
            id: d.id,
            label: d.name,
            slug: d.slug,
            description: d.description,
            sortOrder: 0,
            active: true,
          }),
        );
        setCategories(cats);
        const imgs = data.data.flatMap(
          (d: { images: GalleryImage[] }) => d.images,
        );
        setImages(imgs);
        if (cats.length > 0 && !activeCategory) setActiveCategory(cats[0].id);
      } else setError(data.error);
    } catch {
      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Category CRUD ── */
  const saveCat = async () => {
    if (!editingCat) return;
    setError("");
    try {
      const isNew = !editingCat.id;
      const res = await fetch(
        isNew ? "/api/gallery" : `/api/gallery/${editingCat.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCat),
        },
      );
      const data = await res.json();
      if (data.success) {
        setEditingCat(null);
        fetchData();
      } else setError(data.error);
    } catch {
      setError("Failed to save category.");
    }
  };

  const deleteCat = async (id: number) => {
    if (!confirm("Delete this category and all its images?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchData();
      else setError(data.error);
    } catch {
      setError("Failed to delete category.");
    }
  };

  /* ── Image CRUD ── */
  const saveImg = async () => {
    if (!editingImg || !editingImg.src) return;
    setError("");
    try {
      const res = await fetch("/api/gallery/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingImg),
      });
      const data = await res.json();
      if (data.success) {
        setEditingImg(null);
        fetchData();
      } else setError(data.error);
    } catch {
      setError("Failed to save image.");
    }
  };

  const deleteImg = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`/api/gallery/images?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) fetchData();
      else setError(data.error);
    } catch {
      setError("Failed to delete image.");
    }
  };

  const categoryImages = images.filter(
    (img) => img.categoryId === activeCategory,
  );

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

      {/* ── Categories Management ── */}
      <div className="bg-white rounded-xl border border-[#1077A6]/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[#1a1550] text-base flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-[#1077A6]" /> Categories
          </h3>
          <button
            onClick={() =>
              setEditingCat({
                slug: "",
                label: "",
                description: "",
                sortOrder: 0,
                active: true,
              })
            }
            className="flex items-center gap-2 bg-[#1077A6] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0e6590]"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>

        {editingCat && (
          <div className="border border-[#1077A6]/20 rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={editingCat.slug || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, slug: e.target.value })
                  }
                  placeholder="e.g. tribal-festivals"
                  className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={editingCat.label || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, label: e.target.value })
                  }
                  placeholder="e.g. Tribal Festivals"
                  className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editingCat.sortOrder || 0}
                  onChange={(e) =>
                    setEditingCat({
                      ...editingCat,
                      sortOrder: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Description
              </label>
              <input
                type="text"
                value={editingCat.description || ""}
                onChange={(e) =>
                  setEditingCat({ ...editingCat, description: e.target.value })
                }
                placeholder="Optional description"
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveCat}
                className="flex items-center gap-1.5 bg-[#1077A6] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0e6590]"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={() => setEditingCat(null)}
                className="flex items-center gap-1.5 bg-gray-100 text-[#1a1550] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#1077A6] text-white"
                    : "bg-[#f8f7fc] text-[#1a1550] hover:bg-[#1077A6]/10"
                }`}
              >
                {cat.label} (
                {categoryImages.length ===
                  images.filter((i) => i.categoryId === cat.id).length &&
                activeCategory === cat.id
                  ? categoryImages.length
                  : images.filter((i) => i.categoryId === cat.id).length}
                )
              </button>
              <button
                onClick={() => setEditingCat(cat)}
                className="p-1 rounded hover:bg-[#1077A6]/10 text-[#1077A6]"
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => deleteCat(cat.id)}
                className="p-1 rounded hover:bg-red-50 text-red-500"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-[#1a1550]/40 text-sm">
              No categories yet. Create one above.
            </p>
          )}
        </div>
      </div>

      {/* ── Images for Active Category ── */}
      {activeCategory && (
        <div className="bg-white rounded-xl border border-[#1077A6]/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#1a1550] text-base flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#1077A6]" /> Images in{" "}
              {categories.find((c) => c.id === activeCategory)?.label}
            </h3>
            <button
              onClick={() =>
                setEditingImg({
                  categoryId: activeCategory,
                  src: "",
                  alt: "",
                  caption: "",
                  sortOrder: 0,
                  active: true,
                })
              }
              className="flex items-center gap-2 bg-[#1077A6] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0e6590]"
            >
              <Plus className="w-3.5 h-3.5" /> Add Image
            </button>
          </div>

          {editingImg && (
            <div className="border border-[#1077A6]/20 rounded-lg p-4 mb-4 space-y-3">
              <ImageUpload
                value={editingImg.src || ""}
                onChange={(url) => setEditingImg({ ...editingImg, src: url })}
                label="Gallery Image"
                endpoint="galleryUploader"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={editingImg.alt || ""}
                    onChange={(e) =>
                      setEditingImg({ ...editingImg, alt: e.target.value })
                    }
                    placeholder="Describe the image"
                    className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={editingImg.caption || ""}
                    onChange={(e) =>
                      setEditingImg({ ...editingImg, caption: e.target.value })
                    }
                    placeholder="Optional caption"
                    className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingImg.sortOrder || 0}
                    onChange={(e) =>
                      setEditingImg({
                        ...editingImg,
                        sortOrder: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveImg}
                  className="flex items-center gap-1.5 bg-[#1077A6] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0e6590]"
                >
                  <Save className="w-3.5 h-3.5" /> Save
                </button>
                <button
                  onClick={() => setEditingImg(null)}
                  className="flex items-center gap-1.5 bg-gray-100 text-[#1a1550] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categoryImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-lg overflow-hidden border border-[#1077A6]/10 bg-[#f8f7fc] aspect-square"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                  <button
                    onClick={() => deleteImg(img.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-lg transition-opacity duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {img.alt && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-[10px] truncate">{img.alt}</p>
                  </div>
                )}
              </div>
            ))}
            {categoryImages.length === 0 && (
              <div className="col-span-full text-center py-8 text-[#1a1550]/40 text-sm">
                No images in this category yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
