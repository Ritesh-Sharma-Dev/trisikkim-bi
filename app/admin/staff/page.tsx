"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, AlertCircle, Save, X } from "lucide-react";

interface StaffItem {
  id: number;
  name: string;
  position: string;
  sortOrder: number;
  active: boolean;
}

export default function StaffAdmin() {
  const [items, setItems] = useState<StaffItem[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Partial<StaffItem> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();
      if (data.success) setItems(data.data);
      else setError(data.error);
    } catch (err) {
      console.error("Failed to fetch:", err);
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
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/staff" : `/api/staff/${editing.id}`,
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
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this staff member?")) return;
    try {
      const res = await fetch(`/api/staff/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchItems();
      else setError(data.error);
    } catch (err) {
      console.error("Delete error:", err);
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
          onClick={() =>
            setEditing({ name: "", position: "", sortOrder: 0, active: true })
          }
          className="flex items-center gap-2 bg-[#1077A6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-[#1077A6]/20 p-6 space-y-4">
          <h3 className="font-display font-bold text-[#1a1550] text-lg">
            {editing.id ? "Edit" : "New"} Staff Member
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
                Position
              </label>
              <input
                type="text"
                value={editing.position || ""}
                onChange={(e) =>
                  setEditing({ ...editing, position: e.target.value })
                }
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
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Position</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1077A6]/8">
            {items.map((item, i) => (
              <tr key={item.id} className="hover:bg-[#f8f7fc]">
                <td className="px-4 py-3 text-[#1a1550]/50">{i + 1}</td>
                <td className="px-4 py-3 font-semibold text-[#1a1550]">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-[#1a1550]/60">{item.position}</td>
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
                  colSpan={4}
                  className="px-4 py-8 text-center text-[#1a1550]/40"
                >
                  No staff members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
