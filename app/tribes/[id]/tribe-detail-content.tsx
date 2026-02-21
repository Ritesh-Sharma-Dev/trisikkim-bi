"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Music,
  Utensils,
  Shirt,
  Calendar,
  Globe,
  Heart,
  Quote,
  Users,
} from "lucide-react";

/* ─── Animation helpers ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

/* ─── Icon mapping ───────────────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Music,
  Utensils,
  Shirt,
  Calendar,
  Globe,
  Heart,
  Quote,
  Users,
};

/* ─── Reusable section heading ───────────────────────────────────────── */
function SectionTitle({
  icon: IconName,
  title,
  accent = "#f4c430", // Default to secondary
}: {
  icon?: string;
  title: string;
  accent?: string;
}) {
  const Icon = IconName ? iconMap[IconName] : null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-6"
    >
      {Icon && (
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: `${accent}18` }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
          </div>
          <span
            className="text-[10.5px] font-bold uppercase tracking-[.18em]"
            style={{ color: accent }}
          >
            Sikkimese Tribe
          </span>
        </div>
      )}
      <h2 className="font-display font-bold text-[#1a1550] text-[clamp(18px,2.5vw,26px)] leading-tight tracking-tight">
        {title}
      </h2>
      <div
        className="w-10 h-[3px] rounded-full mt-2"
        style={{ background: accent }}
      />
    </motion.div>
  );
}

/* ─── Sub heading (smaller, no icon) ────────────────────────────────── */
function SubTitle({
  title,
  accent = "#f4c430", // Default to secondary
}: {
  title: string;
  accent?: string;
}) {
  return (
    <motion.h3
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="font-display font-bold text-[#1a1550] text-[16px] md:text-[18px] mt-8 mb-3 tracking-tight flex items-center gap-2"
    >
      <span
        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: accent }}
      />
      {title}
    </motion.h3>
  );
}

/* ─── Body paragraph ─────────────────────────────────────────────────── */
function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-[15px] text-[#1a1550]/68 leading-[1.9] mb-4"
    >
      {typeof children === "string" ? (
        <span dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        children
      )}
    </motion.p>
  );
}

/* ─── Inline image block ─────────────────────────────────────────────── */
function TribeImage({
  src,
  alt,
  caption,
  size = "normal",
}: {
  src: string;
  alt: string;
  caption?: string;
  size?: "normal" | "wide" | "grid";
}) {
  const heightClass = size === "wide" ? "aspect-[16/7]" : "aspect-[4/3]";

  return (
    <motion.figure
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-7"
    >
      <div
        className={`relative ${heightClass} rounded-xl overflow-hidden bg-[#e8e6f4] shadow-md`}
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1550]/30 to-transparent" />
      </div>
      {caption && (
        <figcaption className="text-center text-[12px] text-[#1a1550]/45 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/* ─── 6-image grid ───────────────────────────────────────────────────── */
function ImageGrid({ items }: { items: { src: string; label: string }[] }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-7"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#e8e6f4] shadow-sm">
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1550]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="text-white font-display font-bold text-[13px]">
                {item.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Bullet list ────────────────────────────────────────────────────── */
function BulletList({
  items,
  accent = "#f4c430", // Default to secondary
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <motion.ul
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-1.5 my-4 ml-2"
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[14.5px] text-[#1a1550]/68 leading-snug"
        >
          <span
            className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: accent }}
          />
          {item}
        </li>
      ))}
    </motion.ul>
  );
}

/* ─── Divider ────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#1077A6]/12 to-transparent" />
  );
}

/* ─── Content renderer ───────────────────────────────────────────────── */
function RenderContent({
  content,
  accent,
}: {
  content: any[];
  accent: string;
}) {
  return (
    <>
      {content.map((item, index) => {
        switch (item.type) {
          case "paragraph":
            return <Para key={index}>{item.text}</Para>;

          case "highlight":
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="my-6 p-5 rounded-xl border-l-4 bg-[#f4c430]/5 border-[#f4c430]"
              >
                <p
                  className="text-[14px] text-[#1a1550]/70 leading-relaxed font-medium italic"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </motion.div>
            );

          case "subtitle":
            return (
              <SubTitle
                key={index}
                title={item.title}
                accent={item.accent || accent}
              />
            );

          case "image":
            return (
              <TribeImage
                key={index}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                size={item.size}
              />
            );

          case "bullet-list":
            return (
              <BulletList
                key={index}
                items={item.items}
                accent={item.accent || accent}
              />
            );

          case "food-item":
          case "dance-item":
          case "instrument-item":
            return (
              <div key={index}>
                <SubTitle title={item.name} accent={item.accent || accent} />
                <Para>{item.description}</Para>
                {item.image && (
                  <TribeImage
                    src={item.image}
                    alt={item.name}
                    caption={item.name}
                  />
                )}
              </div>
            );

          case "image-grid":
            return <ImageGrid key={index} items={item.items} />;

          case "dance-types":
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 mb-6 p-4 rounded-xl border border-[#f4c430]/20 bg-[#f4c430]/5"
              >
                <p className="text-[13.5px] font-bold text-[#1a1550] uppercase tracking-wide mb-1">
                  Types of Folk Dance
                </p>
                <div className="flex gap-4 flex-wrap text-[14px] text-[#1a1550]/70">
                  {item.types.map((type: any, i: number) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: type.color }}
                      />
                      {type.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );

          case "festival-grid":
            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
              >
                {item.items.map((festival: any, i: number) => (
                  <motion.div
                    key={festival.name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="p-5 rounded-xl border border-[#1077A6]/10 bg-white hover:border-[#f4c430]/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                      <h4 className="font-display font-bold text-[#1a1550] text-[14.5px]">
                        {festival.name}
                      </h4>
                    </div>
                    <p className="text-[13.5px] text-[#1a1550]/60 leading-relaxed">
                      {festival.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

interface TribeDetailContentProps {
  tribe: any;
  prevTribe: any;
  nextTribe: any;
}

export function TribeDetailContent({
  tribe,
  prevTribe,
  nextTribe,
}: TribeDetailContentProps) {
  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
      {/* ── Hero ── */}
      <div className="relative h-[50vh] md:h-[60vh] min-h-[320px] max-h-[540px] bg-[#1077A6] overflow-hidden">
        <Image
          src={tribe.heroImage}
          alt={tribe.name}
          fill
          className="object-cover opacity-55"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1077A6] via-[#1077A6]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1077A6]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 md:px-8 pb-10">
          <Link
            href="/tribes"
            className="inline-flex items-center gap-2 text-white/55 hover:text-[#f4c430] text-[13px] font-medium mb-5 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All Tribes
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#f4c430" }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[.18em]"
              style={{ color: "#f4c430" }}
            >
              Sikkimese Tribe
            </span>
          </div>
          <h1 className="font-display font-bold text-white text-[clamp(28px,5vw,54px)] leading-tight tracking-tight">
            {tribe.name}
          </h1>
          <div
            className="w-14 h-1 rounded-full mt-3"
            style={{ background: "#f4c430" }}
          />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {tribe.sections.map((section: any, index: number) => (
          <div key={index}>
            <SectionTitle
              icon={section.icon}
              title={section.title}
              accent={section.accent || "#f4c430"}
            />
            <RenderContent
              content={section.content}
              accent={section.accent || "#f4c430"}
            />
            {index < tribe.sections.length - 1 && <Divider />}
          </div>
        ))}

        {/* ── Navigation ── */}
        <div className="mt-16 pt-8 border-t border-[#1077A6]/8 flex items-center justify-between flex-wrap gap-4">
          {prevTribe ? (
            <Link
              href={`/tribes/${prevTribe.id}`}
              className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Previous: {prevTribe.name}
            </Link>
          ) : (
            <Link
              href="/tribes"
              className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              All Tribes
            </Link>
          )}

          {nextTribe && (
            <Link
              href={`/tribes/${nextTribe.id}`}
              className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
            >
              Next: {nextTribe.name}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
