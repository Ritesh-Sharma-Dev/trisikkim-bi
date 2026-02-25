"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AlertCircle, Save } from "lucide-react";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg p-4 text-sm text-[#1a1550]/40">
      Loading editor...
    </div>
  ),
});

export default function AboutAdmin() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pages/about")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.content) {
          const c = res.data.content as Record<string, unknown>;
          if (typeof c.content === "string") setContent(c.content);
        }
      })
      .catch(() => setError("Failed to load about page data."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "About",
          content: { content },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Saved successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else setError(data.error);
    } catch {
      setError("Failed to save.");
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-[#1a1550]/50">
        Loading...
      </div>
    );

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm border border-red-200">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-lg p-3 text-sm border border-green-200">
          <Save className="w-4 h-4" /> {success}
        </div>
      )}

      {/* ── Page Content ── */}
      <div className="bg-white rounded-xl border border-[#1077A6]/10 p-6">
        <h3 className="font-display font-bold text-[#1a1550] text-lg mb-1">
          About Us Content
        </h3>
        <p className="text-[#1a1550]/50 text-xs mb-4">
          This content is displayed on the About Us page below the hero banner.
        </p>
        <RichEditor
          content={content}
          onChange={setContent}
          placeholder="Write the about us content here…"
        />
      </div>

      {/* ── Save Button ── */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#1077A6] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
        >
          <Save className="w-4 h-4" /> Save About Page
        </button>
      </div>
    </div>
  );
}
