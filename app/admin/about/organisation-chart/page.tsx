"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Save } from "lucide-react";

export default function OrgChartAdmin() {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pages/about-organisation-chart")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.content) {
          const c = res.data.content as Record<string, unknown>;
          if (typeof c.bannerTitle === "string") setBannerTitle(c.bannerTitle);
          if (typeof c.bannerSubtitle === "string")
            setBannerSubtitle(c.bannerSubtitle);
        }
      })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/pages/about-organisation-chart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Organisation Chart",
          content: { bannerTitle, bannerSubtitle },
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

      {/* ── Banner ── */}
      <div className="bg-white rounded-xl border border-[#1077A6]/10 p-6 space-y-4">
        <h3 className="font-display font-bold text-[#1a1550] text-lg">
          Banner
        </h3>
        <div>
          <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
            Banner Title
          </label>
          <input
            type="text"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            placeholder="e.g. Organisation Chart"
            className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a1550]/60 mb-1">
            Banner Subtitle
          </label>
          <input
            type="text"
            value={bannerSubtitle}
            onChange={(e) => setBannerSubtitle(e.target.value)}
            placeholder="Short description shown under the title"
            className="w-full border border-[#1077A6]/15 rounded-lg px-3 py-2 text-sm text-[#1a1550] focus:border-[#1077A6] outline-none"
          />
        </div>
      </div>

      {/* ── Save Button ── */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#1077A6] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0e6590]"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  );
}
