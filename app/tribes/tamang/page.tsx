"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, easeOut, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Shirt,
  Music,
  Calendar,
  Languages,
  Heart,
  Utensils,
  MapPin,
  ChevronDown,
  ChevronUp,
  Landmark,
  History,
  Award,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: easeOut,
    },
  }),
};

function Section({ children }: { children: React.ReactNode }) {
  return <div className="mb-14">{children}</div>;
}

function SectionTitle({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ background: "#f4c43018" }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "#f4c430" }} />
        </div>
        <span
          className="text-[11px] font-bold uppercase tracking-[.18em]"
          style={{ color: "#f4c430" }}
        >
          {label}
        </span>
      </div>
      <h2 className="font-display font-bold text-[#1a1550] text-[clamp(20px,2.5vw,28px)] leading-tight tracking-tight">
        {title}
      </h2>
      <div
        className="w-12 h-[3px] rounded-full mt-2.5"
        style={{ background: "#f4c430" }}
      />
    </motion.div>
  );
}

function SubTitle({ title }: { title: string }) {
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
        style={{ background: "#f4c430" }}
      />
      {title}
    </motion.h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-[15px] text-[#1a1550]/68 leading-[1.9] mb-4"
    >
      {children}
    </motion.p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-2 my-4 ml-2"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          custom={i}
          variants={fadeUp}
          className="flex items-start gap-2.5 text-[14.5px] text-[#1a1550]/68 leading-relaxed"
        >
          <span
            className="mt-[8px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#f4c430" }}
          />
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-6 p-5 rounded-xl border-l-4 bg-[#f4c430]/5"
      style={{ borderColor: "#f4c430" }}
    >
      <p className="text-[14px] text-[#1a1550]/70 leading-relaxed font-medium italic">
        {children}
      </p>
    </motion.div>
  );
}

function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-5 rounded-xl border border-[#1077A6]/10 bg-white hover:border-[#f4c430]/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
            <h4 className="font-display font-bold text-[#1a1550] text-[14.5px]">
              {item.title}
            </h4>
          </div>
          <p className="text-[13.5px] text-[#1a1550]/60 leading-relaxed">
            {item.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#1077A6]/12 to-transparent" />
  );
}

function ImageGrid({
  images,
  layout = "medium",
}: {
  images: { src: string; alt: string; caption?: string }[];
  layout?: "medium" | "large" | "small" | "two-medium" | "three-small";
}) {
  const getGridClass = () => {
    switch (layout) {
      case "two-medium":
        return "grid grid-cols-1 md:grid-cols-2 gap-6 my-8";
      case "three-small":
        return "grid grid-cols-1 md:grid-cols-3 gap-4 my-8";
      case "large":
        return "grid grid-cols-1 my-8";
      case "medium":
      default:
        return "grid grid-cols-1 md:grid-cols-2 gap-6 my-8";
    }
  };

  const getImageHeight = () => {
    switch (layout) {
      case "large":
        return "h-[400px] md:h-[500px]";
      case "medium":
        return "h-[300px] md:h-[350px]";
      case "small":
        return "h-[200px] md:h-[250px]";
      case "two-medium":
        return "h-[280px] md:h-[320px]";
      case "three-small":
        return "h-[200px] md:h-[220px]";
      default:
        return "h-[300px]";
    }
  };

  return (
    <div className={getGridClass()}>
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={idx}
          className="relative group"
        >
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#e8e6f4]">
            <div className={`relative w-full ${getImageHeight()}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{img.caption}</p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ToggleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-6 border border-[#1077A6]/20 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-[#1077A6]/5 hover:bg-[#1077A6]/10 transition-colors duration-200"
      >
        <span className="font-display font-bold text-[#1a1550] text-[16px]">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#1077A6]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#1077A6]" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PopulationTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#1077A6] text-white">
            <th className="px-4 py-3 text-left text-sm font-semibold">
              District
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Areas with Higher Concentration
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1077A6]/20">
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Gyalishing District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Dokothang and Hee-Pechrek
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Namchi District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Bumtar, Maniram, Namthang, Katenq, Donok, Lingthing, Kitam, Sorok,
              Manpur, Melli, Melli dara, Payung, Turuk, Bokrong, Pasi, Tokal,
              Palak, Temi tea garden, Daring, Assangthang, Salghari, Chisopani,
              Dong-Denchong and Mamlley
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Gangtok District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Syari, Burtuk, Bhusuk, Sichey, Rongay, Bakcha and Sang
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Mangan District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Rangrang and Paksyak
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Pakyong District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Padamchey, Bhasme, Samsing, Chhallamthang, Kayung, Dugalakha and
              Pache
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Soreng District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Singling, Barbotey, Khundurkey, Bhulkepani, Mangsari, Majuwa,
              Arubote, Sigeng, Angkhu, Takuthang, Chhuchen, Resi, Parsung and
              kolbung
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ClanTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#1077A6] text-white">
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Sub-caste
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Ancestor Origin Province
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1077A6]/20">
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Yhonzan</td>
            <td className="px-4 py-3 text-[14px]">from Nagpochyagi Gonpo</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Dumzan</td>
            <td className="px-4 py-3 text-[14px]">from Duma province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Bomzan</td>
            <td className="px-4 py-3 text-[14px]">from Dhagar Ngili</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Moktan</td>
            <td className="px-4 py-3 text-[14px]">from Mugu province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Lopchan</td>
            <td className="px-4 py-3 text-[14px]">from Syargi zong</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Mikchan</td>
            <td className="px-4 py-3 text-[14px]">from Changpe province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Ghising</td>
            <td className="px-4 py-3 text-[14px]">from shergong province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Theengh</td>
            <td className="px-4 py-3 text-[14px]">
              from Boi Yarling sokar province
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Ngyasur</td>
            <td className="px-4 py-3 text-[14px]">from Sachamgong province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Gyabak</td>
            <td className="px-4 py-3 text-[14px]">from Gyanag or China</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Marpa</td>
            <td className="px-4 py-3 text-[14px]">from Chita province</td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium">Zimba</td>
            <td className="px-4 py-3 text-[14px]">
              from Shame province of Tibet
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function TamangPage() {
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
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#f4c430]/8 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#f4c430]/5 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8 pb-12 pt-10 md:pt-14 md:pb-16">
          <Link
            href="/tribes"
            className="inline-flex items-center gap-2 text-white/55 hover:text-[#f4c430] text-[13px] font-medium mb-6 transition-colors duration-200"
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
          <h1 className="font-display font-bold text-white text-[clamp(30px,5vw,54px)] leading-tight tracking-tight">
            Tamang Tribe
          </h1>
          <div
            className="w-14 h-1 rounded-full mt-3"
            style={{ background: "#f4c430" }}
          />
          <p className="text-white/60 text-[15px] mt-4 max-w-xl leading-relaxed">
            The Tagmhang — descendants of the ancient Tibetan ancestors,
            guardians of rich cultural heritage and traditions in Sikkim.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <Section>
          <SectionTitle
            icon={History}
            label="History"
            title="Introduction and History of the Tamang Tribe"
          />

          <Para>
            Since the existence of human being on this earth, there might be few
            group or communities those who have written or established the
            accounts of their origin, migration remigration till they settle
            permanently in a particular country or place. There may not be any
            human being or community or society those who have not migrated to
            other place or country from their land or country of origin. It is
            presumed that near about three and half billions passed of human
            existence on this earth. It is not known yet exactly as where the
            first human being came into existence. As stated in the universe
            creation history of Tamang tribe, the human being is the last
            creation.
          </Para>

          <Para>
            According to Tamang legendary history, the creation of living being
            on this earth occurred of four types such as from the womb, from the
            egg, from the flower and by the warm. Further, according to this
            legendary history, the human creation was from a father monkey and
            mother Goddess Dasin dolma. If we look back to global human history,
            the human race is found to have migrated from one place or country
            to another periodically. There are two or more reasons of being so
            definitely. It may be because of population growth. Secondly, it may
            be geographical difficulties. Thirdly it may be uncongenial climatic
            condition and socio-political oppression etc. During such migration
            some went towards south, some went towards north and some towards
            north-east. Those who migrated towards north and settled there, they
            are called Tibetans, Chinese, Mongolians and Russians too. Those who
            migrated towards south they are called Aryans. Among those race who
            migrated towards north, Tamang tribe comes under one of the tract.
          </Para>

          <Highlight>
            According to Tamang legendary history booklet 'Zikten Tamchhoi' the
            origin place of Tamang tribe is said to be Tibet, China and Russia.
            The ancestors of Tamang tribe found to have settled in different
            province of Tibet and China.
          </Highlight>

          <SubTitle title="Tamang Sub-castes and Their Ancestral Origins" />

          <ClanTable />

          <Para>
            First of all, Tamang race had eighteen main sub-casts only. The
            first ancestor of Tamang race is said to be a God son who had three
            sons namely Phuntsok, Nima hoisher and Tenzeen. These three sons are
            said to have born in Tibet. In the long run, the size of their
            family is said have become larger and there had been insufficiency
            of food grains. So the chieftain or head of the family went to a
            king or priest of the country and submitted the hardship faced by
            them. Then after the king or priest is said have urged the
            astrologer to determine as where their fate may become delightful.
          </Para>

          <Para>
            The priest foretells as "If you want to go out of this land, you may
            choose to go southern direction. There is a country named 'Lo
            Demozong' towards the southern direction of land (Tibet). If you go
            and settle there, prosperity may come to you. The country is really
            blessed by God. The seed of corn sawn in the morning shall be ripen
            in the evening and sawn in the evening shall have ripen in the
            morning. That is the land of fortune for you."
          </Para>

          <Para>
            Having been heard of such good news, the Tamang ancestors made their
            journey prepared. After a painful journey of those days they arrived
            at 'Lo Demozong' the sacred land where the foot print of Guru
            Padmashamvawa is engraved. There is a story of peaceful and
            prosperous livelihood. After many years when the saint Guru
            Padmasamvawa went to Tibet some time in 700-800 century A.D. on the
            invitation of king Thrisung Deochen of Tibet for the construction of
            famous Buddhist monastery 'Sameh Chuklakhang' at Sameh (Tibet).
            Having been heard of this news the ancestors thought of sending few
            of young sons and daughters to participate in the virtuous work of
            construction from this 'Lo Demozong'. Such accounts are found to
            have narrated in the legendary booklet 'Zikten tamchhoi'.
          </Para>

          <Para>
            According to this narration Tamang tribe has since several hundred
            years been here in Sikkim. Hence, Tamang community is termed as one
            of the indigenous tribe of Sikkim's soil. It clears that the origin
            place of Tamang tribe is Tibet. Tamang tribe is understood to have
            been out from Tibet during different periods and through different
            passes. If we go back to previous history of mankind and perceive
            it, none of the human race or society found to have remained plural
            or mixed. There was his group or society and in the group there were
            sub-cast definitely. There was language to exchange the views among
            them. It was sufficient for that time. At that time it was not
            necessary to have the knowledge of cast to any one. The cast system
            found to have come later on. When the mixed society came onto being,
            only then the cast system is known to have prevailed.
          </Para>

          <Para>
            The population of Tamang community mentioned in the official
            document of Sikkim's first population census of 1891 is in the level
            of two thousand nine hundred. But in that document Tamang is known
            by the name 'Murmi' instead of 'Tamang'. Because of language,
            dresses of that time and religion they have opted, they (now Tamang)
            were understood to have assimilated with the Bhoti family. Tamang
            community is still called 'Bhote' in many regions and places. There
            are many bases of assumption that Tamang community passed through
            the North-Eastern part of India while migrating from the place of
            origin. May be, they may not be by 'Tamang' nomenclature. But their
            language, religion, custom & tradition and body structure is found
            to be similar. As per the version of their head, those tribes were
            known to have descended or migrated from Tibet itself through
            Brammaputra valley and settled in the plain region of Assam. Today
            they have been found to be categorized as tribal in Assam state.
            Many Tamang community made their shift from Sikkim to other states
            of India during the past one and half to two hundred years back.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Award}
            label="Etymology"
            title="Tamang Nomenclature"
          />

          <Para>
            Few points on 'Tamang' nomenclature: when there has been development
            of conscience in human being, then he found himself in the form of
            social being. He made himself to live in society. When they began a
            social life, then there seems to have relationship and homogeneity.
            At that juncture, the language and tone that he spoke was the real
            tool for the identity. Not so longer than six to seven generation
            before, there was quite strict social rule of debar to have marriage
            relation with other cast. Such social rule was in practice in all
            the communities. So that language, culture and tradition remained
            safe. When the human being started living in mixed society then the
            cast system is presumed to have taken its birth. It seems true that
            no one imposed the cast system by themselves. It is conceived to
            have existed by virtue of any coincident or conjunction. The birth
            of caste system seems to have come in existence by virtue of corrupt
            form of word.
          </Para>

          <Para>
            In not writing of Tamang nomenclature in the first population census
            of Sikkim, it cannot match to say that Tamang name was not in
            existence, but there may surely wording corrupt. There may be surely
            nonlocal employee in that census. It is understood that there has
            been mistake or difference in questioning of the person and
            understanding of the listeners. The term 'Mulmi' in Tamang language
            or word means chieftain or head of the village. Perhaps 'Murmi' is
            supposed to be the corrupt form of 'mulmi'.
          </Para>

          <SubTitle title="Versions of Tamang Elders and Priests" />

          <Para>
            According to the version of Lt. Sangey Lama of Ahaley Tamang gonpa,
            it is told that the word 'Tamang' was derived from Tagmhang. This
            word has come from Tibetan language. The meaning of 'Tag' in Tibetan
            language signifies Godly vision and 'mhaang' means many. So that
            'Tag + mhaang = Tagmhaang' and the present form 'Tamang' is the
            corrupt or purest form of 'Tagmhaang'. On this context itself, there
            is a tale of five great wise personalities in Tamang community whom
            is called 'Mheme khe ngaa' in tamang language.
          </Para>

          <Para>
            Another Guru (Lama) Lt. Indraman Tamang's (Dong mheme) version is as
            follows – A group of people working in the field straying their
            horses to graze in the Himalayan region are seen by another group
            coming down from the uphill side saw many horses grazing on the
            field and said 'Taa mhaangpore' which was heard and understood by
            the working group as if indicating them to be 'Tamang'. In the
            conversation made in between the group coming down 'Taa mhaangpore'
            means there many horses in Tibetan language but there the listeners
            are said to have understood that they were told to be 'Tamang'.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Users}
            label="Demographics"
            title="Population and Settlement Pattern"
          />

          <Para>
            Population and settlement pattern – As per census report (govt. of
            India) of 2011, the total population of Tamang tribe in Sikkim is
            37,696 out of which 19,486 nos. are male and 18,210 nos. are female.
            Tamang community has made their settlement in all the six districts
            of Sikkim.
          </Para>

          <Para>
            Literacy percent – 75% in total (38.67% male and 31.58% female).
          </Para>

          <ToggleSection title="View Population Distribution by District">
            <PopulationTable />
          </ToggleSection>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Utensils}
            label="Cuisine"
            title="Food Production and Food Habit"
          />

          <Para>
            In the past, Tamang tribe used to produce food grains like Millet,
            fox tail millet (Kaguni in nep. and Tangre in Tamang), dry paddy
            (ghaiya dhaan), wheat, Bug wheat, Barley, Junelo (nep. kongre in
            Tamang), Maize and pulses of different varieties like Masyam, Masey,
            Tamra and Koldey (gahat) etc. Tamang tribe used to prepare beer,
            Pachway and country liquor as traditional beverages. The beverages
            are prepared mainly of maize, wheat, millet and barley. Tamang tribe
            mostly live on corn, fruits and tubers. Meat taking in tamang tribe
            is very occasional.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/TAMANG-FOOD-1.jpg",
                alt: "Traditional Tamang food",
                caption: "Traditional Tamang cuisine",
              },
              {
                src: "/TAMANG-FOOD-2.jpg",
                alt: "Traditional beverages",
                caption: "Traditional beverages - beer and Pachway",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Shirt}
            label="Attire"
            title="Traditional Dresses"
          />

          <Para>
            Tamang tribe has their own traditional dresses like surlung, Khenza,
            Khenju and Tagi for the male. Hangre, Hanju, Syama/ Dormo, Kerek and
            Tagi for the female. Along and the chyaap are the male ornaments.
            Gau, Mharkhari and Nachyo are for the female.
          </Para>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-5 bg-white rounded-xl border border-[#1077A6]/10">
              <h4 className="font-display font-bold text-[#1a1550] text-[16px] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Male Attire & Ornaments
              </h4>
              <BulletList
                items={[
                  "Surlung",
                  "Khenza",
                  "Khenju",
                  "Tagi",
                  "Along (ornament)",
                  "Chyaap (ornament)",
                ]}
              />
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#1077A6]/10">
              <h4 className="font-display font-bold text-[#1a1550] text-[16px] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Female Attire & Ornaments
              </h4>
              <BulletList
                items={[
                  "Hangre",
                  "Hanju",
                  "Syama/Dormo",
                  "Kerek",
                  "Tagi",
                  "Gau (ornament)",
                  "Mharkhari (ornament)",
                  "Nachyo (ornament)",
                ]}
              />
            </div>
          </div>

          <ImageGrid
            images={[
              {
                src: "/TAMANG-DRESS-1.jpg",
                alt: "Tamang traditional dress",
                caption: "Tamang traditional attire",
              },
              {
                src: "/TAMANG-DRESS-2.jpg",
                alt: "Tamang ornaments",
                caption: "Traditional Tamang ornaments",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Performing Arts"
            title="Traditional Dances and Music"
          />

          <Para>
            Tamang tribe does have their own traditional dances and music.
            Tamang tribe orates 'Rhama' a poem type rhymes during marriage
            ceremony specially. Tamang tribe performs a slow motion dance as a
            traditional one during welcoming guests. It is also performed during
            demanding groom to make sat to conclude a final deliverance by the
            parents (chyoltaam). The musical instruments used are Damphu and
            Daden. There are other musical instruments like 'Konggaap' etc.
            which are played during fancy songs.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/TAMANG-DANCE-1.jpg",
                alt: "Tamang traditional dance",
                caption: "Tamang traditional dance performance",
              },
              {
                src: "/TAMANG-MUSIC-1.jpg",
                alt: "Tamang musical instruments",
                caption:
                  "Traditional Tamang musical instruments - Damphu and Daden",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Calendar}
            label="Celebrations"
            title="Festivals"
          />

          <Para>
            Tamang tribe celebrates two types of festivals. One is public
            festival i.e. Sonam Lhochhar and religious festivals such as Sakha
            dawa, Guru Thungkar, Lhabab duichhen, drukpa chhesi and monthly
            chhechyu etc.
          </Para>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-white rounded-xl border border-[#1077A6]/10">
              <h4 className="font-display font-bold text-[#1a1550] text-[16px] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Public Festival
              </h4>
              <p className="text-[14px] text-[#1a1550]/70">
                Sonam Lhochhar - Tamang New Year celebration
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#1077A6]/10">
              <h4 className="font-display font-bold text-[#1a1550] text-[16px] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Religious Festivals
              </h4>
              <BulletList
                items={[
                  "Sakha dawa",
                  "Guru Thungkar",
                  "Lhabab duichhen",
                  "Drukpa chhesi",
                  "Monthly chhechyu",
                ]}
              />
            </div>
          </div>

          <ImageGrid
            images={[
              {
                src: "/TAMANG-LOSAR.jpg",
                alt: "Sonam Lhochhar celebration",
                caption: "Sonam Lhochhar - Tamang New Year celebration",
              },
            ]}
            layout="medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Languages}
            label="Language"
            title="Language and Dialect"
          />

          <Para>
            Tamang tribes have their own language 'Taam or gyot'. Tamang tribe
            speaks different dialects such as khandoke, Paljoke, nhupali and
            syarphat etc. A slight differences are found in terms of noun and
            verb. In the field of education and literature, this language has
            reached up to class twelve. The script that brought in use by Tamang
            tribe is said to be 'Taamyig'. It is developed from 'Sambota' with
            twenty five consonant and five vowels. Effort is being made to
            develop further for adjusting variable words.
          </Para>

          <Para>
            In total, sixty one teachers are working in different govt. schools
            in the capacity of primary and graduate teachers. Tamang language is
            one of the recognized regional language in the state. Since its
            recognition in the year 1995, this language was introduced for
            learning and teaching in the schools in the year 2001. Tamang
            community is headed by its association formed in the year 1961. This
            association has formed its sub-committee under the name 'Tamang
            Language Development Committee'. This committee is entrusted with
            the task of preparing text books and other literary works. This
            committee is headed by a secretary and other four members.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Heart}
            label="Religion"
            title="Religious Beliefs"
          />

          <Para>
            Tamang community, since long believed in Buddhism. Before adoption
            of Buddhism, in the long past Tamang tribe was also a nature
            worshiper. Tamang ancestors were 'Bonbo' before seven – eight
            century A.D. The initial belief of any mankind lays on 'Sanatan'
            i.e. nature worship. Seven – eight century onwards, all most all
            Tamang community adopted Mahayan Buddhism which is a little bit
            mixture of 'Bon' tradition. It was easy access to the Bon culturist.
            Present day wave of conversion is twisting the Tamang in other easy
            beliefs. However, majority of Tamang community belongs to Mahayan
            Buddhism.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/TAMANG-GOMPA.jpg",
                alt: "Tamang Gompa",
                caption: "Traditional Tamang Gompa (Buddhist monastery)",
              },
              {
                src: "/TAMANG-RITUAL.jpg",
                alt: "Tamang religious ritual",
                caption: "Tamang Buddhist religious ceremony",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <div className="mt-10 pt-8 border-t border-[#1077A6]/8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/tribes/limboo"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Previous: Limboo Tribe
          </Link>
          <Link
            href="/tribes"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            Back to All Tribes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
