"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";

/* ─── Animation helpers ──────────────────────────────────────────────── */

interface GalleryItem {
  url: string;
  label: string;
}

interface TribeDetailContentProps {
  tribe: {
    id: string;
    name: string;
    heroImage: string;
    content: string;
    excerpt?: string | null;
    gallery?: GalleryItem[];
  };
  prevTribe: { id: string; name: string } | null;
  nextTribe: { id: string; name: string } | null;
}

export function TribeDetailContent({
  tribe,
  prevTribe,
  nextTribe,
}: TribeDetailContentProps) {
  const gallery = tribe.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
      {/* ── Hero banner (same height/style as other pages) ── */}
      <div className="bg-[#1077A6] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f4c430 1px, transparent 1px), linear-gradient(90deg, #f4c430 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {tribe.heroImage && (
          <Image
            src={tribe.heroImage}
            alt={tribe.name}
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
        )}
        <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-[#f4c430]/8 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/tribes"
              className="inline-flex items-center gap-2 text-white/55 hover:text-[#f4c430] text-[13px] font-medium mb-5 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              All Tribes
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                Sikkimese Tribe
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-[clamp(26px,4vw,44px)] leading-tight tracking-tight mb-3">
              {tribe.name}
            </h1>
            {tribe.excerpt && (
              <p className="text-white/55 text-[15px] max-w-xl leading-relaxed">
                {tribe.excerpt}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── TipTap content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16"
      >
        {tribe.content && tribe.content.trim() !== "" ? (
          <div
            className="
              prose prose-lg max-w-none
              text-[#1a1550]/75
              prose-headings:font-display prose-headings:text-[#1a1550] prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-a:text-[#1077A6] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#1a1550]
              prose-u:underline
              prose-blockquote:border-[#f4c430] prose-blockquote:bg-[#f4c430]/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:border-[#1077A6]/10
              prose-ul:text-[#1a1550]/75 prose-ol:text-[#1a1550]/75
              prose-code:bg-[#1077A6]/8 prose-code:px-1.5 prose-code:rounded
              prose-hr:border-[#1077A6]/10
              [&_u]:underline
            "
            dangerouslySetInnerHTML={{ __html: tribe.content }}
          />
        ) : (
          <p className="text-[#1a1550]/35 text-[15px] text-center py-16">
            Content coming soon.
          </p>
        )}

        {/* ── Image gallery ── */}
        {gallery.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-[#f4c430]/15 flex items-center justify-center">
                <Images className="w-3.5 h-3.5 text-[#f4c430]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                Gallery
              </span>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-[#1077A6]/15 via-[#f4c430]/20 to-transparent mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gallery.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-[#1077A6]/10 bg-[#1077A6]/5 shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={item.url}
                      alt={item.label || "Gallery image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1550]/70 via-transparent to-transparent" />
                    {item.label && (
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-[12px] font-semibold leading-snug line-clamp-2">
                          {item.label}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Prev / Next navigation ── */}
        <div className="mt-16 pt-8 border-t border-[#1077A6]/10 flex items-center justify-between flex-wrap gap-4">
          {prevTribe ? (
            <Link
              href={`/tribes/${prevTribe.id}`}
              className="group inline-flex items-center gap-2 text-[#1a1550]/50 hover:text-[#1a1550] transition-colors text-[14px] font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous: {prevTribe.name}
            </Link>
          ) : (
            <Link
              href="/tribes"
              className="group inline-flex items-center gap-2 text-[#1a1550]/50 hover:text-[#1a1550] transition-colors text-[14px] font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Tribes
            </Link>
          )}

          {nextTribe && (
            <Link
              href={`/tribes/${nextTribe.id}`}
              className="group inline-flex items-center gap-2 text-[#1a1550]/50 hover:text-[#1a1550] transition-colors text-[14px] font-medium"
            >
              Next: {nextTribe.name}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
