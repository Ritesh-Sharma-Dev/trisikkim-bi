"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

interface TribeData {
  id: string;
  name: string;
  image: string;
  excerpt: string;
  accent?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#1077A6]/8 animate-pulse">
      <div className="h-52 bg-[#1077A6]/8" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 bg-[#1a1550]/10 rounded-full" />
        <div className="h-4 w-full bg-[#1a1550]/8 rounded-full" />
        <div className="h-4 w-4/5 bg-[#1a1550]/8 rounded-full" />
        <div className="h-4 w-3/5 bg-[#1a1550]/8 rounded-full" />
      </div>
    </div>
  );
}

export default function TribesPage() {
  const [tribes, setTribes] = useState<TribeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tribes")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setTribes(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
      {/* ── Hero banner ── */}
      <div className="bg-[#1077A6] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f4c430 1px, transparent 1px), linear-gradient(90deg, #f4c430 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-[#f4c430]/8 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-[#f4c430]/15 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#f4c430]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                Indigenous Communities
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-[clamp(28px,5vw,50px)] leading-tight tracking-tight mb-3">
              Sikkimese Tribes
            </h1>
            <p className="text-white/60 text-[15px] max-w-xl leading-relaxed">
              Celebrating the rich heritage, traditions, and enduring legacy of
              Sikkim&apos;s indigenous tribal communities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : tribes.length === 0 ? (
          <div className="text-center py-24">
            <Users className="w-14 h-14 text-[#1a1550]/10 mx-auto mb-4" />
            <p className="text-[#1a1550]/40 text-[15px] font-medium">
              No tribes found.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[13px] text-[#1a1550]/40 mb-6">
              {tribes.length} tribe{tribes.length !== 1 ? "s" : ""} documented
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tribes.map((tribe, i) => (
                <motion.div
                  key={tribe.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="h-full"
                >
                  <Link
                    href={`/tribes/${tribe.id}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1077A6]/10 hover:border-[#f4c430]/40 hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Image */}
                    <div className="relative h-52 bg-gradient-to-br from-[#1077A6]/10 to-[#1a1550]/10 overflow-hidden flex-shrink-0">
                      {tribe.image ? (
                        <Image
                          src={tribe.image}
                          alt={tribe.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-10 h-10 text-[#1077A6]/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1550]/50 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#f4c430]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430]" />
                          Sikkimese Tribe
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-display font-bold text-[#1a1550] text-[18px] leading-snug mb-3 group-hover:text-[#1077A6] transition-colors">
                        {tribe.name}
                      </h2>

                      {tribe.excerpt ? (
                        <p className="text-[#1a1550]/60 text-[13.5px] leading-relaxed line-clamp-3 flex-1">
                          {tribe.excerpt}
                        </p>
                      ) : (
                        <p className="text-[#1a1550]/30 text-[13.5px] italic flex-1">
                          No description available.
                        </p>
                      )}

                      <div className="mt-4 pt-4 border-t border-[#1077A6]/8 flex items-center">
                        <span className="text-[12px] font-semibold text-[#1077A6] group-hover:text-[#f4c430] transition-colors flex items-center gap-1">
                          Explore culture
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
