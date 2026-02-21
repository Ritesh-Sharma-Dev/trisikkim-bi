"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TRIBES = [
  {
    id: "bhutia",
    name: "Bhutia Tribe",
    image: "/BHUTIA.jpg",
    accent: "#1077A6",
    excerpt:
      "The Bhutia community is an ethnic group predominantly found in the northeastern Indian state of Sikkim, where they form an integral part of the region's rich cultural and social tapestry. Known for their distinctive traditions, customs, and practices, the Bhutias boast a cultural heritage that is both unique and deeply rooted in history.",
    content: `The Bhutia community is an ethnic group predominantly found in the northeastern Indian state of Sikkim, where they form an integral part of the region's rich cultural and social tapestry. Known for their distinctive traditions, customs, and practices, the Bhutias boast a cultural heritage that is both unique and deeply rooted in history. This vibrant community has contributed significantly to the preservation of Sikkim's cultural identity over the centuries.

The Bhutias are among the earliest known inhabitants of what is historically referred to as "Greater Sikkim." Their ancestry can be traced back to their migration from the southern region of Tibet, marking them as a people of Tibetan origin. This migration has played a pivotal role in shaping their identity and traditions, which remain strongly tied to their Tibetan roots.

The Bhutias refer to themselves as "Lhopos" or "Lhorees," terms that translate to "dwellers of the southward," reflecting their historical movement and settlement south of Tibet. The community is believed to descend from Khye Bhumsa, the legendary chieftain of the Bhutia people, who is celebrated as a central figure in their history. His leadership and legacy have left an indelible mark on the Bhutias' collective memory and cultural practices.

Over time, the Bhutias have maintained a harmonious blend of their Tibetan heritage with the local traditions of Sikkim, resulting in a way of life that is both distinctive and deeply connected to the land they inhabit.`,
  },
  {
    id: "lepcha",
    name: "Lepcha Tribe",
    image: "/LEPCHA.jpg",
    accent: "#1077A6",
    excerpt:
      "The Lepcha people are an indigenous community primarily residing in the Indian state of Sikkim, as well as in the Darjeeling and Kalimpong districts of West Bengal and parts of Tripura. Their unique identity encompasses their people, language, and culture — all sharing the same name: Lepcha.",
    content: `The Lepcha people are an indigenous community primarily residing in the Indian state of Sikkim, as well as in the Darjeeling and Kalimpong districts of West Bengal and parts of Tripura. Their unique identity encompasses their people, language, and culture, all of which share the same name: Lepcha. This nomenclature unites their ethnic identity, their distinct language, and the rich cultural heritage they have preserved since time immemorial, often referred to collectively as Lepcha culture.

Another term used to refer to both the Lepcha people and their language is "Rong." Within their community, the Lepchas identify themselves with an endoethnonym, "Mutanchi Rong Kup Rum Kup," which holds profound significance. This phrase is widely interpreted by the Lepcha people to mean "beloved Children of God," reflecting their deep spiritual connection and pride in their heritage.

The Lepcha community was officially recognized as a Scheduled Tribe in Sikkim through the Constitution (Sikkim) Scheduled Tribe Order of 1978. This recognition affirms their importance and place within the diverse cultural fabric of the state. According to the Census of India conducted in 2011, the Lepcha population stands at 42,909, with a fairly balanced gender distribution: 21,614 males and 21,295 females.`,
  },
  {
    id: "limboo",
    name: "Limboo Tribe",
    image: "/SUBBA.jpg",
    accent: "#1077A6",
    excerpt:
      'Historians and anthropologists studying India have classified its population into various ethnological groups. The term "Kirata" or "Kirati" was historically used by the Aryans to refer to the ancient Mongoloid people who inhabited the Himalayan region around 2000 B.C.',
    content: `Historians and anthropologists studying India have classified its population into various ethnological groups, identifying seven distinct ethnological types. Among these, the term \"Kirata\" or \"Kirati\" was historically used by the Aryans to refer to the ancient Mongoloid people who inhabited the Himalayan region around 2000 B.C. This term, considered derogatory, was coined when the Aryans encountered these people trading a medicinal herb known as Chireto (called Sunghing in the Limboo language).

Today, three ancient Mongoloid groups—believed to be descendants of the so-called \"Kiratas\"—are the Limboo (also known as Yakthungba or Limboo), the Khambu Rai (Kirawa), and the Yakha. These groups collectively identify as \"Susuwa Lilim Yakthum Suwang,\" or Yakthumba Khambu, Kirawa, and Limboo Yakha, reflecting their shared ancestry and cultural ties.

Interestingly, the term \"Kirata\" does not appear in their ancient oral tradition, known as \"Mundhum,\" which serves as a repository of their cultural and historical narratives. The Limboos trace their lineage back to Sawa Yethangs, an ancestral group they believe they descend from. They have referred to themselves as \"Susuwa Lilim Yakthum Suwang\" since ancient times.`,
  },
  {
    id: "sherpa",
    name: "Sherpa Tribe",
    image: "/SHERPA.jpg",
    accent: "#1077A6",
    excerpt:
      "Sikkim, often called the land of peace and tranquility, is blessed with natural beauty and a unique spiritual heritage dating back to the 8th century when it was graced by Guru Padmasambhava. The Sherpa people reside in the higher mountainous regions of the Eastern Himalayas.",
    content: `Sikkim, often called the land of peace and tranquility, is blessed with natural beauty and a unique spiritual heritage dating back to the 8th century when it was graced by Guru Padmasambhava. Initially known as Beyul Demazong and Mayal-Lyang, Sikkim is revered for its mystical allure, stunning landscapes, and the harmonious coexistence of diverse communities.

Among these communities, the Sherpa people reside in the higher mountainous regions of the Eastern Himalayas, with a notable presence in Sikkim, eastern Nepal, Darjeeling, and Bhutan. Known for their resilience and mountaineering skills, Sherpas speak a Tibeto-Burman language and uphold an ancient form of Buddhism. Their traditions and customs reflect a way of life deeply rooted in Buddhist principles, promoting harmony with nature and a steadfast spiritual devotion.

Sherpa history suggests a long-standing connection to Tibet, where their lineage and cultural practices originated. This heritage has endowed them with a profound respect for the Himalayan mountains, often viewed as sacred in their beliefs. Together, these communities contribute to Sikkim's unique identity as a place of serene natural beauty, spiritual richness, and peaceful coexistence.`,
  },
  {
    id: "tamang",
    name: "Tamang Tribe",
    image: "/TAMANG.jpg",
    accent: "#1077A6",
    excerpt:
      "Since the dawn of humanity, many groups and communities have recorded or passed down stories of their origins, migrations, and eventual settlements. The Tamang tribe holds a rich and fascinating creation narrative that reflects the deep philosophical and spiritual worldview of its people.",
    content: `Since the dawn of humanity, many groups and communities have recorded or passed down stories of their origins, migrations, and eventual settlements in different places. Few, if any, communities or societies have remained entirely in one place since their origin, as migration has been a constant thread in human history. From the earliest times, people have moved across landscapes, adapting to new environments and establishing roots in diverse regions over time.

It is believed that humans have existed on this earth for roughly three and a half billion years, although exact origins remain a mystery. The question of where the first human beings appeared is still unanswered, and many cultures have their own creation narratives that offer insights into humanity's beginnings.

For instance, in the creation history of the Tamang tribe, humanity is considered the final creation in the order of existence. This belief reflects a common theme across various cultures, portraying human beings as emerging last in the cosmic order, often with unique roles or responsibilities in the natural world.`,
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function TribesPage() {
  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
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

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-[#f4c430]/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#f4c430]" />
              </div>
              <span className="text-[14px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                Indigenous Communities
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-[clamp(36px,6vw,64px)] leading-tight tracking-tight mb-4">
              Sikkimese Tribes
            </h1>
            <p className="text-white/70 text-[18px] max-w-2xl leading-relaxed">
              Celebrating the rich heritage, traditions, and enduring legacy of
              Sikkim's indigenous tribal communities.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {TRIBES.map((t, i) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] font-medium border border-white/15 text-white/75 hover:border-[#f4c430]/50 hover:text-[#f4c430] transition-all duration-200"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#f4c430" }}
                  />
                  {t.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-0">
        {TRIBES.map((tribe, i) => (
          <TribeSection key={tribe.id} tribe={tribe} index={i} />
        ))}
      </div>
    </div>
  );
}

function TribeSection({
  tribe,
  index,
}: {
  tribe: (typeof TRIBES)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      id={tribe.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative py-20 md:py-28",
        index !== 0 && "border-t border-[#1077A6]/8",
      )}
    >
      {!isEven && (
        <div className="absolute inset-0 bg-white/60 rounded-3xl pointer-events-none" />
      )}

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -32 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className={cn("relative", !isEven && "lg:order-2")}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#e8e6f4]">
            <div className="relative w-full h-[500px] md:h-[600px]">
              <Image
                src={tribe.image}
                alt={tribe.name}
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1550]/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-bold tracking-wide backdrop-blur-md border"
                style={{
                  background: "#1077A630",
                  borderColor: "#1077A650",
                  color: "#1077A6",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#1077A6" }}
                />
                {tribe.name}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "absolute -z-10 w-64 h-64 rounded-2xl opacity-20",
              isEven ? "-bottom-6 -right-6" : "-bottom-6 -left-6",
            )}
            style={{ background: "#f4c430" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? 32 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
          className={cn(!isEven && "lg:order-1")}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: "#f4c43018" }}
            >
              <Users className="w-4 h-4" style={{ color: "#f4c430" }} />
            </div>
            <span
              className="text-[13px] font-bold uppercase tracking-[.18em]"
              style={{ color: "#f4c430" }}
            >
              Sikkimese Tribe
            </span>
          </div>

          <h2 className="font-display font-bold text-[#1a1550] text-[clamp(28px,4vw,42px)] leading-tight tracking-tight mb-4">
            {tribe.name}
          </h2>

          <div
            className="w-16 h-1.5 rounded-full mb-6"
            style={{ background: "#f4c430" }}
          />

          <div className="space-y-5 text-[17px] text-[#1a1550]/80 leading-relaxed">
            {tribe.content
              .split("\n\n")
              .slice(0, 2)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-8"
          >
            <Link
              href={`/tribes/${tribe.id}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg text-[16px] font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                background: "#1077A6",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#f4c430";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1a1550";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#1077A6";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
            >
              Read More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
