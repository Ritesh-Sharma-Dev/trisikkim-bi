"use client";

import { useEffect, useState } from "react";
import {
  Presentation,
  Users,
  ImageIcon,
  MessageSquare,
  Mail,
  Newspaper,
  Award,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  heroSlides: number;
  tribes: number;
  staff: number;
  galleryCategories: number;
  galleryImages: number;
  contactMessages: number;
  unreadMessages: number;
  dignitaries: number;
  updates: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        } else {
          setError(data.error || "Failed to load stats.");
        }
      })
      .catch((err) => {
        console.error("Dashboard stats error:", err);
        setError("Failed to connect to the server.");
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center gap-3 bg-red-50 text-red-700 rounded-xl p-5 border border-red-200">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#1077A6]/10 p-6 animate-pulse"
          >
            <div className="w-10 h-10 bg-[#f8f7fc] rounded-lg mb-3" />
            <div className="h-7 w-12 bg-[#f8f7fc] rounded mb-2" />
            <div className="h-4 w-24 bg-[#f8f7fc] rounded" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Hero Slides",
      value: stats.heroSlides,
      icon: Presentation,
      color: "#f4c430",
    },
    {
      label: "Dignitaries",
      value: stats.dignitaries,
      icon: Award,
      color: "#1077A6",
    },
    { label: "Tribes", value: stats.tribes, icon: Users, color: "#4fd1c5" },
    {
      label: "Staff Members",
      value: stats.staff,
      icon: Users,
      color: "#1a1550",
    },
    {
      label: "Gallery Categories",
      value: stats.galleryCategories,
      icon: ImageIcon,
      color: "#f4c430",
    },
    {
      label: "Gallery Images",
      value: stats.galleryImages,
      icon: ImageIcon,
      color: "#1077A6",
    },
    {
      label: "Updates",
      value: stats.updates,
      icon: Newspaper,
      color: "#4fd1c5",
    },
    {
      label: "Messages",
      value: stats.contactMessages,
      icon: MessageSquare,
      color: "#1a1550",
      badge:
        stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-[#1077A6]/10 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${card.color}15` }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <div className="font-display font-bold text-2xl text-[#1a1550]">
              {card.value}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#1a1550]/50 text-sm">{card.label}</span>
              {card.badge && (
                <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
