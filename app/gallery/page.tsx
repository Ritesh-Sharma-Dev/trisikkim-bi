"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Gallery data ───────────────────────────────────────────────────── */
/*
  Drop images into:
    /public/gallery/tribal-festivals/   → tf-01.jpg … tf-06.jpg
    /public/gallery/exchange-visit/     → ev-01.jpg … ev-27.jpg
    /public/gallery/janjatiya-gaurav/   → jg-01.jpg … jg-10.jpg
*/

const SECTIONS = [
  {
    id: "tribal-festivals",
    label: "01",
    title: "Tribal Festivals",
    description:
      "A vibrant showcase of the rich cultural heritage and age-old traditions celebrated by the tribal communities of Sikkim.",
    accent: "#f4c430", // Changed to secondary
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/gallery/tribal-festivals/tri-${String(i + 1).padStart(2, "0")}.png`,
      alt: `Tribal Festival ${i + 1}`,
    })),
  },
  {
    id: "exchange-visit",
    label: "02",
    title: "Exchange of Visit by the Tribal Community of Sikkim",
    description:
      "Exchange of visit by the tribals to learn more about the socio-economic development achieved by the best performing states in the country.",
    accent: "#f4c430", // Changed to secondary
    images: Array.from({ length: 29 }, (_, i) => ({
      src: `/gallery/exchange-visit/ev-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Exchange Visit ${i + 1}`,
    })),
  },
  {
    id: "janjatiya-gaurav",
    label: "03",
    title: "Janjatiya Gaurav Divas",
    description:
      "Celebrating the Glorious Tribal freedom fighters of India on the occasion of Bhagwan Birsa Munda's Birth Anniversary observed on 15th November, 2022.",
    accent: "#f4c430", // Changed to secondary
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/gallery/janjatiya-gaurav/jg-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Janjatiya Gaurav Divas ${i + 1}`,
    })),
  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/* ─── Framer variants ────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.045, duration: 0.45 },
  }),
};

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const lightboxImg = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

/* ═══════════════════════════════════════════════════════════════════════
   GALLERY PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{
    sectionIdx: number;
    imgIdx: number;
  } | null>(null);

  const [activeSection, setActiveSection] = useState<SectionId | "all">("all");

  const openLightbox = (sectionIdx: number, imgIdx: number) =>
    setLightbox({ sectionIdx, imgIdx });

  const closeLightbox = () => setLightbox(null);

  const lightboxNext = () => {
    if (!lightbox) return;
    const section = SECTIONS[lightbox.sectionIdx];
    setLightbox({
      ...lightbox,
      imgIdx: (lightbox.imgIdx + 1) % section.images.length,
    });
  };

  const lightboxPrev = () => {
    if (!lightbox) return;
    const section = SECTIONS[lightbox.sectionIdx];
    setLightbox({
      ...lightbox,
      imgIdx:
        (lightbox.imgIdx - 1 + section.images.length) % section.images.length,
    });
  };

  const visibleSections =
    activeSection === "all"
      ? SECTIONS
      : SECTIONS.filter((s) => s.id === activeSection);

  const currentLightboxImage = lightbox
    ? SECTIONS[lightbox.sectionIdx].images[lightbox.imgIdx]
    : null;

  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
      {/* ── Hero banner ── */}
      <div className="bg-[#1077A6] relative overflow-hidden">
        {/* Subtle grid pattern - using secondary color */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f4c430 1px, transparent 1px), linear-gradient(90deg, #f4c430 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#f4c430]/8 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#f4c430]/15 flex items-center justify-center">
                <Images className="w-3.5 h-3.5 text-[#f4c430]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                Photo Gallery
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-[clamp(26px,4vw,44px)] leading-tight tracking-tight mb-3">
              Gallery
            </h1>
            <p className="text-white/55 text-[15px] max-w-xl leading-relaxed">
              A visual record of our programmes, cultural celebrations, and
              community engagements across the tribal communities of Sikkim.
            </p>

            {/* Section stats */}
            <div className="flex flex-wrap items-center gap-5 mt-6">
              {SECTIONS.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#f4c430" }}
                  />
                  <span className="text-white/50 text-[12.5px]">
                    {s.images.length} photos
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span className="text-white/50 text-[12.5px]">
                  {SECTIONS.reduce((a, s) => a + s.images.length, 0)} total
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="sticky top-[var(--navbar-height,0)] z-30 bg-white border-b border-[#1077A6]/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            <FilterTab
              active={activeSection === "all"}
              onClick={() => setActiveSection("all")}
              accent="#f4c430"
            >
              All Sections
            </FilterTab>
            {SECTIONS.map((s) => (
              <FilterTab
                key={s.id}
                active={activeSection === s.id}
                onClick={() => setActiveSection(s.id as SectionId)}
                accent="#f4c430"
              >
                {s.title.length > 28 ? s.title.slice(0, 28) + "…" : s.title}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-20">
        {visibleSections.map((section, sIdx) => {
          const realSectionIdx = SECTIONS.findIndex((s) => s.id === section.id);
          return (
            <GallerySection
              key={section.id}
              section={section}
              sectionIdx={realSectionIdx}
              onOpen={openLightbox}
            />
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && currentLightboxImage && (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/15"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 border border-white/15 text-white text-[12px] px-3 py-1 rounded-full font-mono tracking-widest">
              {String(lightbox.imgIdx + 1).padStart(2, "0")} /{" "}
              {String(SECTIONS[lightbox.sectionIdx].images.length).padStart(
                2,
                "0",
              )}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/15"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lightbox.sectionIdx}-${lightbox.imgIdx}`}
                variants={lightboxImg}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={currentLightboxImage.src}
                  alt={currentLightboxImage.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <p className="text-white font-medium text-sm">
                    {SECTIONS[lightbox.sectionIdx].title}
                  </p>
                  <p className="text-white/60 text-[12px] mt-0.5">
                    {currentLightboxImage.alt}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/15"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Gallery Section ────────────────────────────────────────────────── */
function GallerySection({
  section,
  sectionIdx,
  onOpen,
}: {
  section: (typeof SECTIONS)[number];
  sectionIdx: number;
  onOpen: (si: number, ii: number) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const PREVIEW_COUNT = 6;
  const visibleImages = showAll
    ? section.images
    : section.images.slice(0, PREVIEW_COUNT);
  const hasMore = section.images.length > PREVIEW_COUNT;

  return (
    <div id={section.id}>
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-start gap-5">
          {/* Number badge - using primary color */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-[13px] border mt-1"
            style={{
              background: "#1077A615",
              color: "#1077A6",
              borderColor: "#1077A630",
            }}
          >
            {section.label}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-[#1a1550] text-[clamp(18px,2.5vw,26px)] leading-tight tracking-tight">
              {section.title}
            </h2>
            <div
              className="w-10 h-[3px] rounded-full mt-2 mb-3"
              style={{ background: "#f4c430" }}
            />
            <p className="text-[#1a1550]/60 text-[14px] leading-relaxed max-w-2xl">
              {section.description}
            </p>
          </div>

          {/* Count pill - using primary color */}
          <div
            className="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border"
            style={{
              background: "#1077A612",
              color: "#1077A6",
              borderColor: "#1077A630",
            }}
          >
            <Images className="w-3.5 h-3.5" />
            {section.images.length} Photos
          </div>
        </div>
      </motion.div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <AnimatePresence>
          {visibleImages.map((img, i) => (
            <motion.div
              key={img.src}
              custom={i % PREVIEW_COUNT}
              variants={gridItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-[#e8e6f4] shadow-sm hover:shadow-lg transition-shadow duration-300"
              onClick={() => onOpen(sectionIdx, i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />

              {/* Hover overlay - using primary color */}
              <div className="absolute inset-0 bg-[#1a1550]/0 group-hover:bg-[#1077A6]/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white"
                    style={{ background: "#f4c43030" }}
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Corner number - using secondary color */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span
                  className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded"
                  style={{ background: "#f4c430", color: "#1a1550" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / less - using primary color */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={() => setShowAll((v) => !v)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border text-[13.5px] font-semibold transition-all duration-300"
            style={{
              borderColor: "#1077A640",
              color: "#1077A6",
              background: "#1077A608",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1077A618";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1077A608";
            }}
          >
            {showAll ? (
              <>Show Less</>
            ) : (
              <>
                View All {section.images.length} Photos
                <span
                  className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: "#1077A625",
                    color: "#1077A6",
                  }}
                >
                  +{section.images.length - PREVIEW_COUNT}
                </span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Filter Tab ─────────────────────────────────────────────────────── */
function FilterTab({
  children,
  active,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap border",
        active
          ? "text-[#1a1550] shadow-sm"
          : "text-[#1a1550]/55 border-transparent hover:text-[#1a1550] hover:bg-[#f4f3fb]",
      )}
      style={
        active
          ? {
              background: `${accent}15`,
              borderColor: `${accent}35`,
              color: "#1a1550",
            }
          : {}
      }
    >
      {children}
    </button>
  );
}
