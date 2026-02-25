"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Newspaper,
  Award,
  Presentation,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: Presentation },
  { label: "Dignitaries", href: "/admin/dignitaries", icon: Award },
  { label: "Tribes", href: "/admin/tribes", icon: Users },
  { label: "Staff", href: "/admin/staff", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Updates", href: "/admin/updates", icon: Newspaper },
  { label: "About Page", href: "/admin/about", icon: BookOpen, exact: true },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7fc]">
        <div className="text-[#1077A6] text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f7fc] flex font-body">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#1a1550] text-white z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-5 border-b border-white/10">
          <h2 className="font-display font-bold text-lg text-[#f4c430]">
            TRITC Admin
          </h2>
          <p className="text-white/40 text-xs mt-1">Content Management</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-[#1077A6] text-white border-r-3 border-[#f4c430]"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isActive
                      ? "text-[#f4c430]"
                      : "text-white/40 group-hover:text-white/70",
                  )}
                />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto text-[#f4c430]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#1077A6] flex items-center justify-center text-xs font-bold">
              {session.user.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-white/40 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/60 text-sm font-medium py-2 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#1077A6]/10 px-4 lg:px-8 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#f8f7fc] hover:bg-[#1077A6]/10 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1">
            <h1 className="font-display font-bold text-[#1a1550] text-lg">
              {SIDEBAR_ITEMS.find(
                (item) =>
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href)),
              )?.label || "Dashboard"}
            </h1>
          </div>

          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#1077A6] font-semibold hover:underline"
          >
            View Site →
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
