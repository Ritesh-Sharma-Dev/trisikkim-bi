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
  Home,
  Users2,
  ChefHat,
  Gem,
  Church,
  FileText,
  ChevronDown,
  ChevronUp,
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
  layout?:
    | "medium"
    | "large"
    | "small"
    | "two-medium"
    | "three-small"
    | "four-small"
    | "eight-small"
    | "seven-small";
}) {
  const getGridClass = () => {
    switch (layout) {
      case "two-medium":
        return "grid grid-cols-1 md:grid-cols-2 gap-6 my-8";
      case "three-small":
        return "grid grid-cols-1 md:grid-cols-3 gap-4 my-8";
      case "four-small":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8";
      case "eight-small":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8";
      case "seven-small":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8";
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
      case "four-small":
        return "h-[180px] md:h-[200px]";
      case "eight-small":
        return "h-[180px] md:h-[200px]";
      case "seven-small":
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

export default function LimbooPage() {
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
            Limboo Tribe
          </h1>
          <div
            className="w-14 h-1 rounded-full mt-3"
            style={{ background: "#f4c430" }}
          />
          <p className="text-white/60 text-[15px] mt-4 max-w-xl leading-relaxed">
            The Yakthungba — descendants of the ancient Kiratas, guardians of
            Yumaism and the rich cultural heritage of the Eastern Himalayas.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <Section>
          <SectionTitle
            icon={BookOpen}
            label="History"
            title="Origin and Ethno History"
          />

          <Para>
            The historian and anthropologist working in the country have divided
            the people of India into various ethnological groups and categorized
            the people of India into seven ethnological types. The word "Kirata"
            or Kirati, a derogatory word was termed by Aryans for the ancient
            mongoloid people inhabiting the Himalayas about 2000 B.C. who were
            trading a medicinal herb, Chireto (Sunghing) in Limboo Language when
            they came in contact with them. It is not known what they used to
            call themselves, 4000 years ago.
          </Para>

          <Para>
            The present day three ancient mongoloid people, (Ancient Kiratas) –
            the Limboo (Yakthungba or Limboo) Khambu Rai (Kirawa) and Yakha
            called themselves as "Susuwa Lilim Yakthum Suwang" or Yakthumba
            "Khambu", "Kirawa" and "Limboo Yakha" or "Khambu Yakha"
            respectively, (Sinha et. Al 2005, Subba T.B 1999). There is not a
            single word as "Kirata" in their ancient oral tradition known as
            "Mundhum". The Limboos believes that they are the descended of Sawa
            Yethangs and called themselves as "Susuwa Lilim Yakthum Suwang"
            since antiquity. From this the term Yakthumba, Limboo" or Limbu,
            "Subba" or Subha etc has been evolved in due course of time.
          </Para>

          <Para>
            In the Mahabharata, the Kiratas has been described as dwellers of
            Himalayan region, particularly the eastern Himalayas (Satavaleker &
            Sharma 1969). Their seven principalities situated in the eastern
            Himalayan region on the north of Videha have been distinctly
            referred to.
          </Para>

          <Para>
            We are told that their seven kings (Chiefs) were closely living to
            Indrakeel Mountains (Sikkim) and ruling over a vast dominant. It has
            been rightly observed that the great Epic of Mahabharata – mentions
            several principalities all along the border line of the Himalayas
            ruled by the Kirata Kings… (Nath..1948). The tradition of calling
            the Kirata Chiefs "Subba" and "Rai" in Nepali virtually commence in
            the early medieval period. The Kirata Chiefs represented by Subba
            and Rai are still found in the hilly areas of present areas of
            Nepal, West Bengal and Sikkim. They still have an age-old seven clan
            among themselves. Some of them represent the posterity of the seven
            Kirata chiefs of the epic age (Singh 1990, 354).
          </Para>

          <Para>
            Sprig says that an early reference to the Limbus as "Tsong" or
            "Tshong" in the Hooker's "Himalayans Journals" (185/1905); next to
            the Lepchas, the most numerous tribes in Sikkim is that of Limbus
            (called "Chung" or "Chang" by the Lepchas); they abound also in East
            Nepal, which they once ruled (Hooker 1854, 194). Mainwarings Lepcha
            – English Dictionary gives "Tsong" as borrowed words from Tibetan,
            they mean, "the Limboo Tribe according to Hooker (I; 137) from
            Tibetan Tsang (Sic, Gtsang) province of Tsan, according to
            Mainwaring Waddel the "Merchant people". 'The Gazetteer of Sikkim"
            cites Waddel explaining, "the Lepchas and Bhutias call them "Tsong"
            (which in the vernacular means "a merchant" and the Limbus used to
            be the chief cattle- merchant and butchers in Sikkim) (Risley 1894;
            37).
          </Para>

          <Para>
            He further says that the word "Tshong or "Tsong", is important
            because it occurred in the Treaty of "Lho-Mon-Tsong-Sum", the Treaty
            signed by the leaders of the three races in 1666 A.D. 'Water Hare
            Year' of the Tibetan Calendar through which the existence of "The
            Greater Sikkim" occurred and which also identifies the Tibetans,
            Lepchas and Limbus as the original races of the kingdom of Sikkim in
            the time of the first Chogyal (King) (1642–70).
          </Para>

          <Highlight>
            In indisputable fact of the Limboos' contribution to Sikkim is the
            appellation of Sikkim itself (Sinha A.C. 1975). Tensung Namgyal the
            second king of Sikkim who succeed his father Phontsok Namgyal in
            1670 A.D, married thrice. His third Queen was Thungwa Mukma,
            daughter of Yo-Yo-Hang (also called Yongyang Hang the King of
            Limbuwan during mid-Sixteen Sixties). Tensung Namgyal shifted the
            capital from Tasitenka, Yaksum to Rabdentse in 1760's. On completion
            of new palace at Rabdentse, the Limboo Queen was asked to name the
            same. She named the "Song-him", which in the Limboo language means
            "New House". But over the years the word "Song-him" metamorphosed to
            "Sikkom", "Sukkim" and then "Sikkim" due to mispronunciation. This
            fact has been officially accepted and authenticated by the Gazetteer
            of Sikkim H.H. Risley – 1894 (Risley H.H. 1894, Subba J.R. 1999, 91-
            154- 2008a, 1-74; Report of OBC Commission 1998).
          </Highlight>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={FileText} label="Identity" title="Nomenclature" />

          <Para>
            The Limboos also use the alternative spelling Limbu which is most
            popularly known in Eastern Himalayas of Nepal. In addition, Limboo
            is how the Limboos of Sikkim identify themselves. From official
            documents to common day usage, Limboo/Subba is widely accepted and
            used among Sikkimese Limboos. Today, there is a growing movement in
            Sikkim to rename their titles to Limboo/Subba. The Limboo
            organizations of Sikkim have been on the bandwagon to change the
            same because Limboo/Subba was more popularize. This shift was
            parallel with the growing tendency among Limboos elsewhere to
            validate their identity as they have begun using Limboo/Subba as
            their last names. Before, people either used Subba or their clan
            name for instance; Muringla, Nembang, Khamdhak, Tamling etc, for
            their surnames, but today they use Limboo/Subba. The uniformity in
            their surnames is an exertion being practiced across the Limboo
            world to show oneness within the tribe. Moreover, to rectify the
            different title which often creates confusion among the non-Limboo.
            It is hoped that having a Limboo/Subba surname instead of the
            different clan names, as surnames would club all Limboos together
            and identify them across the world.
          </Para>

          <Para>
            Yakthum is an endonym used by Limboos among themselves. Yakthum is
            often just the shorter version of what they call themselves to be
            Yakthumba, a word derived either from Susuwa Lilim Yakthumba. But,
            no one is ever found to have used this as the title. These days
            however, Yakthum is gaining popularity as a title and there are
            those who write Yakthum in place of Limboo for their surnames too.
            Yakthum is also used with a suffix depending on the gender of the
            person. A male would be Yakthumba (ba refers to male) and a female
            would be a Yakthumma (ma refers to female). In any villages,
            villagers would often ask kheney Yakthum ma ba? Which can be
            translated as "Are you a Limboo?". Subba means 'village chief' and
            is commonly used in both Sikkim and Nepal. In addition, another name
            is Tsong, which was given by the Bhutias and Lepchas of Sikkim.
          </Para>

          <Para>
            Etymology of the title of Limboos has undergone different
            interpretations. They are addressed by different titles often times
            creating confusion to the people belonging to non-Limboo community.
            So, one must not misinterpret addressing them differently. All the
            titles identify the same Limboo.
          </Para>

          <Para>
            No doubt, there erupted a big problem in the use of different
            surnames by Limboo's, before and after they got the recognition of
            Tribal status in the year 2003, and even thereafter to till date.
            They were in confused state of mind as to which surname is to be
            used for official purpose for those whose Documents are processed
            officially other than "Limboo" i.e. Subba, Tsong, Yakthungba and
            Limbu.
          </Para>

          <Highlight>
            Now these doubts have been cleared to all vide Notification No.
            -GOS- 32/SJE&WD/WD/2018 Dated-27/08/2018, which has been clearly
            mentioned that, "where as, the Limboo and Tamang communities of
            Sikkim have been included in the scheduled Tribes vide constitution
            (Sikkim) Scheduled order 1978, as amended, vide the scheduled castes
            and scheduled Tribes order (Amendment) Act 2002 (10 of 2003) dated
            7th January 2003."
          </Highlight>

          <Para>
            Now therefore, in supersession of Notification
            No.GOS/1(32)STE&WD/WD/54, Dated 12th March 2008, the state Govt. is
            hereby pleased to recognize and declare the following communities of
            Sikkim as Scheduled Tribes as included in the list of Scheduled
            Tribes vide the (Constitution) Sikkim Scheduled Tribes Order, 1978
            namely,
          </Para>

          <div className="my-4 p-5 bg-[#1077A6]/5 rounded-xl border border-[#1077A6]/20">
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-[16px] text-[#1a1550] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Limboo
              </li>
              <li className="flex items-center gap-3 text-[16px] text-[#1a1550] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#f4c430]" />
                Tamang
              </li>
            </ul>
            <p className="text-[14px] text-[#1a1550]/70 mt-3 italic">
              Explanations: The Expressions "Limboo" Includes "Limbu, Subba,
              Tsong and Yakthungba" It is for the general information of all
              concerned that the benefits due and eligible to be extended to the
              Scheduled Tribes in the state of Sikkim are extended to members of
              Limboos and Tamang Communities in terms of constitutional
              provision as applicable.
            </p>
          </div>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Users2} label="Clans" title="Clans and Kinship" />

          <Para>
            The Limboos are divided into a number of exogamous patrinial thars
            (clans) and sub-thars (sub-clans). There is no caste system in
            Limboo community. Other caste or tribes adopted by the Limboo
            families as well as married by Limboo individuals are also included
            in the respective Limboo clan or sub-clan of thar community by the
            Tumyanghangs, (Limboos community council) after a ritual touching
            Shamyok (Dubgrass) and stone with promise (Laabokhey-Nambokhey Sakey
            –Yeksingmang) known as Samyoklung – Thim. Pedigrees of various
            groups of Limboos are maintained.
          </Para>

          <Para>
            Khagendra Singh Angbohang (1978) has listed 218 Thars and Sub-thars,
            under 16 major Thars:
          </Para>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-white rounded-xl border border-[#1077A6]/10">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Mabohang:</span>{" "}
                  <span>20 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Thegim:</span>{" "}
                  <span>11 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Shreng:</span>{" "}
                  <span>10 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Phago:</span>{" "}
                  <span>20 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Sawa:</span>{" "}
                  <span>19 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Bokhim:</span>{" "}
                  <span>05 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Khoyohang:</span>{" "}
                  <span>17 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Nembang:</span>{" "}
                  <span>14 sub-thars</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#1077A6]/10">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Hukpahang:</span>{" "}
                  <span>17 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Khewa:</span>{" "}
                  <span>22 sub-thars</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Angbohang:</span>{" "}
                  <span>Multiple</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Muringla:</span>{" "}
                  <span>Multiple</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Khamdhak:</span>{" "}
                  <span>Multiple</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Tamling:</span>{" "}
                  <span>Multiple</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Chemjong:</span>{" "}
                  <span>Multiple</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Samdong:</span>{" "}
                  <span>Multiple</span>
                </li>
              </ul>
            </div>
          </div>

          <Para>
            Regulations of marriage alliances and indication of decent are the
            main functions of the thars and sub-thars.
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
            Community wise population data of the Limboos of Sikkim is not
            available except for 1891 census. During 1891 Census, the Limboo
            population was 1,255 males, 1,159 females and 942 children, making
            3,356 persons. The Limboo population constitutes about 11.02% of the
            total population next to the Lepcha, Bhutia and Khambhu – Rais. The
            Limboos were 4th amongst the communities of Sikkim.
          </Para>

          <Para>
            Based on the 2004 voter's list of Sikkim, the projected population
            of Limbos constituted 54,750 persons (Number of voters X 2.14) about
            9.15% of the total population of Sikkim in 2004. The Limboo
            population was 4th highest even in 2004, next to the Khambhu-Rais,
            Bhutia, Chettri and Bhahun community in the state. There is a
            decrease in percentage Limboo population by 1.87% from 1891 to 2004
            (in 113 Years) period (Subba J.R. 1999; 2008; 300)
          </Para>

          <SubTitle title="Summary of household survey conducted in 1999" />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-POPULATION-MAP.jpg",
                alt: "Limboo population distribution map",
                caption: "Distribution of Limboo population across Sikkim",
              },
            ]}
            layout="medium"
          />

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#1077A6] text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    District
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Revenue Blocks with Limboo HH
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Total Limboo Households
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Population
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    % of District Population
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1077A6]/20">
                <tr className="hover:bg-[#f4c430]/5 transition-colors">
                  <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
                    North Sikkim
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    26
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    480
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">-</td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">-</td>
                </tr>
                <tr className="hover:bg-[#f4c430]/5 transition-colors">
                  <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
                    East Sikkim
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    90
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    1087
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    8,527
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    4.78%
                  </td>
                </tr>
                <tr className="hover:bg-[#f4c430]/5 transition-colors">
                  <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
                    South Sikkim
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    93
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    1105
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    7,031
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    6.39%
                  </td>
                </tr>
                <tr className="hover:bg-[#f4c430]/5 transition-colors">
                  <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
                    West Sikkim
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    166
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    4170
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    26,533
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
                    22.82%
                  </td>
                </tr>
                <tr className="bg-[#f4c430]/10 font-medium">
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]">
                    Total
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]"></td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]">
                    6,842
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]">
                    42,091
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1a1550]">
                    10.71%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Para>
            The Limboo population is mostly concentrated at Daramdin, Soreng,
            Hee Yangthang, Bermiok, Maneybong-Dentam, Lingchom, Khanisirbong,
            Samdong, Sribadam, Yoksum, Tashiding and Darap in the West Sikkim,
            and Namfok, Rabitar, Salghari, Tingmoo in South Sikkim, Assam
            Linzey, Aho and Pakyong in East Sikkim and Mangshila in the North
            Sikkim. (Subba J.R.1999; 153; 156)
          </Para>

          <Para>
            According to the 2005-06 State Socio Economic Census of Sikkim, the
            population of Limboo community comprised of 56,959 persons
            constituting 9.79% of the total population of Sikkim. Out of total
            1,11,880 Households in Sikkim 10.703 households belonged to Limboo
            community constituting 9.75% of the total population of state. While
            the average number of households in Sikkim was 5.20, in case of
            Limboo it was 5.32. While sex ratio for all communities in Sikkim
            was 920, among the Limboo it was 933.
          </Para>

          <Para>
            The Limboo settlement in Sikkim is a farmhouse type in general. Most
            of the people in rural states (7% as per the Population census 1999
            are basically mixed farmers, and depend on forest for food, fuel,
            fodder and timber. The villages in Sikkim constitute important
            socio-political units play a dominant part in their life and
            activities. The villages are generally situated on the slope of
            hills are known as Busty. Each busty is now known as administrative
            block unit as Borbottey block, Banduckey block, Sopakha block etc.
            Two or three such block from a Panchayat unit, and a number of
            particular numbers are there in a block administrative centers of
            the sub-division. The state has been divided in to four districts
            Administrative Centre and nine Administrative sub-divisions.
            Particularly, the state has been 32 constituencies. The selection of
            the settlement sites of the villages in this part of the country is
            mainly guided by proximity to the water sources and the abundance of
            suitable cultivable land.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Home}
            label="Architecture"
            title="The Limboo House"
          />

          <Para>
            Each village composed of number of domiciles and in a domicile,
            besides the dwelling house, there are other huts, such as granary,
            farmhouse, granary-cum-guest house (paali heem) etc. the cattle
            shed, piggery shed goatary shed or fire wood shed etc. are often
            found attached to the dwelling house. A short description of a
            typical Limboo House is given as follows:
          </Para>

          <Para>
            The dwelling house of a Limboo is known as "Khim" or "heem" in
            Limboo language which has generally a rectangular ground plan with a
            rectangular roof with winged flapped the two narrow sides(laphy),
            made of bamboo mat or (chim), the floor of the house is generally
            made of mud or wooden planks and the walls stones or mud or with mud
            and decorated or washed with white colored mud (khamphutla) on the
            upper walls and red colored mud (khamhetla) on the lower walls
            respectively. The roof is supported by a number of good-sized
            undressed timber pillars which are inserted on the ground side which
            known as "Sitlang".
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-HOUSE-1.jpg",
                alt: "Traditional Limboo house",
                caption: "Traditional Limboo house architecture",
              },
            ]}
            layout="small"
          />

          <Para>
            The main pillar at the center is known as "Hangsitlang". And it
            extends up to the roof of the house. Use of the nails or screws for
            construction purposes, are limited and rare. The big wooden beam
            meant for supporting the roof are generally inserted through one
            another in a criss-cross way and the top of the roof is supported by
            a horizontal beam known as "Pangsing". The main entrance to the
            house is generally situated in the front side towards the elevation
            of the hill where there is a back door also.
          </Para>

          <Para>
            The dwelling house is generally consists of two rooms, one
            Kitchen-cum-storeroom and in each of these rooms at least one window
            can be found. Sometimes the houses have only a big hall with no
            partition. The houses are quite well ventilated having sufficient
            light. But, in the front and backside portion of the house, there is
            small verandah or "sikuwas" which are used as sitting room or
            drawing rooms. The corrugated metal sheets have replaced the thatch
            grasses or bamboo mat now.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-HOUSE-2.jpg",
                alt: "Limboo house interior",
                caption: "Traditional interior with fireplace",
              },
              {
                src: "/LIMBOO-HOUSE-3.jpg",
                alt: "Limboo house details",
                caption: "Architectural details of Limboo house",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            In the middle of the house inside is a little raised or sunken fire
            place for cooking food. Just above the fireplace (Sumhatlung), a
            raised like area is used for keeping meat and other items. There is
            a worship place known as Mangdhan at the corner. On the other four
            corners of the houses are the windows. The doors are locked with
            wooden "agloo" from inner side and an iron chain (sangli) from
            outside.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Users} label="Family" title="Family Patterns" />

          <Para>
            The 'Yuma' religion has a tremendous influence on the child-life,
            youth-life, marriage, adult life, old-age life, social structure and
            social activities of the all Limboos. The family is the most
            fundamental, vital and social unit of the Limboos. Nuclear family is
            more prevalent, but stem family are also commonly present. A few
            horizontally extended families are to be found. Bonds of love and
            affection tie all the family members together. There has been a rise
            of nuclear families and decline of the extended families. It is
            expected that all the family members help to each other at times of
            the need and distress. Father is the head of the family. In the
            absence of father mother takes charge of the family or the eldest
            son or eldest daughter who is capable of controlling the household
            affairs is the family head.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={ChefHat}
            label="Cuisine"
            title="Food Production, Hunting, Wild-Food Gathering and Food Habits"
          />

          <Para>
            Limboos are mixed farmers depending on both agriculture and animal
            husbandry. They are mainly cultivators and their cultivable fields
            are situated on the slopes of the hills either in the vicinity of
            the village or at some distances from it. The agricultural product
            is insufficient to support the family. About 25% of their food
            requirement is made through hunting of wild animals and gathering
            fruits, rhizomatous and bulb crops, and vegetables from forest's
            nearby stream banks and riverbanks. Rest of their food requirement
            is made through mixed farming, Government subsidized food and market
            purchases.
          </Para>

          <Para>
            They rear all types of domestic animals such as poultry, duck
            rearing, piggery, rearing goat, sheep, buffalo and cattle. Limboos
            are non-vegetarians, pork is their most preferred meat, and many eat
            beef and buffalo. Depending on their thar, prohibition (taboos) of
            eating chicken or mutton or buffalo etc. are there in different
            thars. For example, Khewa thars do not eat chicken, Nembang thars do
            not eat mutton, Mangyung thars do not eat buffalo. The thars
            included in Lhasa-Keyubas eat beef. Similarly, many thars included
            under Kanshi Kethangbas do not eat beef.
          </Para>

          <Para>
            Rice is their staple food. They produce finger millet for preparing
            and offering fermented beer to their deities. They produce various
            kinds of pulses (dal), soya beans etc. both for consumption and
            offering for their deities. They produce different kind of mustard
            oil and pig fats in early years as cooking mediums. They consume and
            offer various kinds of roots and tubers such as sweet potato,
            cassava, greater yam colocasia etc. Various kinds of seasonal fruits
            and vegetables. Now, they also started growing commercial flowers.
            They drink alcohol both homemade and purchase from market. They take
            milk, milk products, potato, and all other vegetables. They smoke
            cigarette and loose tobacco.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-TOBACCO-1.jpg",
                alt: "Locally cultivated tobacco",
                caption: "Locally cultivated tobacco",
              },
              {
                src: "/LIMBOO-TOBACCO-2.jpg",
                alt: "Traditional tobacco preparation",
                caption: "Traditional tobacco preparation in West Sikkim",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            The Limboos are one of the aboriginal tribes of Sikkim Himalayas and
            thus, they have a tremendous indigenous knowledge on food and other
            Livelihood Bio-resources management (Hunting and Gathering) culture.
            However, with the growing Environment awareness of the young
            generation of twenty-first century, and the State Government
            proactive drive of Environmental and Biodiversity conservation, this
            beautiful cultures being disappearing very fast.
          </Para>

          <Para>
            The Limboo tribes of Sikkim were at the stage of go-between food
            production and hunting gathering of food-resources during the middle
            of the nineteenth century when Dr. J.D.Hooker visited Sikkim in
            1849. The underlying reasons, why this transition was continuing for
            many years is that the food production system evolved as a result of
            the accumulation of many separate decisions about allocating time
            and effort. Foraging human, like foraging animals, have only finite
            time and energy, which they can spend in many ways.
          </Para>

          <Para>
            Only in the decade of the last nineteenth century (1890s A.D.), the
            colonial British Administration started settlement of the Nepalese
            from Nepal by clearing the forests and thus, started settled
            agriculture on permanent basis. The rule of bench terracing of land
            for cultivation by the tillers started by the 10th Chogyal Sidkyong
            Tulku, was accelerated in Sikkim after 1890s in Sikkim.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Utensils}
            label="Cuisine"
            title="Limboo Cuisines"
          />

          <Para>
            According to the self-study book on food and drinks published by
            Kirat Yakthung Chumlung Nepal (2002), and Subba (1999) the inclusive
            food and drinks of the Limboos are:
          </Para>

          <SubTitle title="Food Items" />

          <Para>
            Rice is the most popular food item of the Limboos. Besides, Chyakhla
            ko Bhat (food cooked out of crushed maize grain), Ddhero (food
            cooked out of maize or finger millet flour) Poponda (bread of maze,
            finger millet or wheat flour cooked under burning fire) Lungdhakcha,
            (food prepared from freshly harvested maize floor wrapped maize
            husk), Sigolya or Pennagolya, (food prepared out of barley or finger
            millet flour made into lumps and cooked), Kangbha, (wheat, barley, &
            millet lumps put into rice and cooked), Penna Manda, (food prepared
            like soup out of finger millet flour), Khareng (roti, bread prepared
            out of finger millet, barley or maize, buck wheat flour prepared on
            tawa or bhumbro) are the special food cuisines of the community.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-FOOD-PENNA-MANDA.jpg",
                alt: "Penna Manda",
                caption:
                  "Penna Manda (food prepared like soup of finger millet flour)",
              },
              {
                src: "/LIMBOO-FOOD-BREAD.jpg",
                alt: "Bread of Buck wheat",
                caption: "Bread of Buck wheat",
              },
              {
                src: "/LIMBOO-FOOD-KANGBHA.jpg",
                alt: "Kangbha",
                caption:
                  "Kangbha (wheat, barley, & millet lumps cooked with rice)",
              },
              {
                src: "/LIMBOO-FOOD-DHERO.jpg",
                alt: "Dhero",
                caption: "Dhero (food cooked out of maize flour)",
              },
            ]}
            layout="four-small"
          />

          <SubTitle title="Curry Items" />

          <Para>
            Vegetable curry is the most popular curry of the Limboo community.
            Besides, Chembighik, (fermented Soya bean), Kinima Sumbak (fermented
            Soya bean curry) Yangben (curry prepared out of macro-Lichen
            collected from the trees), Yangben Sumbak, (food prepared out of
            macro-Lichen collected from the trees and pork meat with pork
            blood), Sargyangma or Karjyang, (Pork Souses), Sagie Sumbak (Nettle
            curry), Nakthuk Sumbak (Mushroom curry), Kattakwa nock sumbak (Fern
            curry), Fanock sumbak (bamboo shoot), Kasakpa (meat of pork fats)
            Yanglukma sumbak, Sirukma sumbak, Khiringtukma sumbak, Khekrokma
            sumbak, sura sumbak, Sarakeek sumbak etc. are some of the special
            cuisines of the community.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-CURRY-CHEMBIGHIK.jpg",
                alt: "Chembighik",
                caption: "Chembighik – Kinema",
              },
              {
                src: "/LIMBOO-CURRY-YANGBEN.jpg",
                alt: "Yangben",
                caption: "Yangben – Jheo (macro-Lichen)",
              },
              {
                src: "/LIMBOO-CURRY-LICHEN.jpg",
                alt: "Macro-Lichen",
                caption: "Macro-Lichen",
              },
              {
                src: "/LIMBOO-CURRY-SARGYANGMA.jpg",
                alt: "Sargyangma",
                caption: "Sargyangma, Pork Sausage",
              },
              {
                src: "/LIMBOO-CURRY-FANOCK.jpg",
                alt: "Fanock",
                caption: "Fanock, Bamboo shoots",
              },
              {
                src: "/LIMBOO-CURRY-FERN.jpg",
                alt: "Kattakwa nock",
                caption: "Kattakwa nock - Fern",
              },
              {
                src: "/LIMBOO-CURRY-YANGLUKMA.jpg",
                alt: "Yanglukma",
                caption: "Yanglukma - Species of frog",
              },
              {
                src: "/LIMBOO-CURRY-NETTLE.jpg",
                alt: "Sahsungay Sagi",
                caption: "Sahsungay Sagi - Nettle",
              },
            ]}
            layout="eight-small"
          />

          <SubTitle title="Karhi or Dal" />

          <Para>
            All type of pulses are eaten as dal/karhi by the Limboos. But, soya
            bean is taken as pulses and is the most popular. Among the other
            pulses mung-dal (kalo-dal, paheli-dal) peas, beans are most popular.
          </Para>

          <SubTitle title="Achar Items" />

          <Para>
            Phillingey machhi (Achar of phillingey) Nambong Machhi (Achar of
            perrila seeds) Phando Machhi, (Achar of soya bean), Yakhosi Machhi
            (achhar of pumpkin seeds), Mesu (fermented bamboo shoot), Sura
            machhi, Surakeek machhi, Labok machhi, Chimphin machhi are some of
            the special cuisines of the community.
          </Para>

          <SubTitle title="Alcohol (Beverage) Items" />

          <Para>
            These items are Khesung/Marcha (Yeast cake) used for fermented
            purpose, Mangdok thi (fermented millet), Thi-Tongba (Finger millet
            or any food grain, fermented and put in a bamboo or wooden cane),
            Sejongwa or Rakshi (Home made wine), Thiseep, (fermented and sieved
            beer) Pathi thi, Pirisey Sejongwa, Phunkhey thi, Tengothi (simal
            tarul thi) Hurley thi, etc. are the most popular drinks of the
            community.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-DRINK-SEJONGWA-1.jpg",
                alt: "Sejongwa preparation",
                caption: "Sejongwa, Local wine (Rakshi) - preparation",
              },
              {
                src: "/LIMBOO-DRINK-SEJONGWA-2.jpg",
                alt: "Sejongwa distillation",
                caption: "Sejongwa distillation in rural areas",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={BookOpen}
            label="Traditional Knowledge"
            title="Indigenous Knowledge of the Ethnic Food Preparation"
          />

          <Para>
            Some of the important indigenous knowledge for preparation of
            fermented and non-fermented foods and beverages of the Limboos are
            as follows:
          </Para>

          <SubTitle title="Fermented Foods" />

          <SubTitle title="(i) Kinema" />

          <Para>
            Kinema is a sticky fermented soya bean food with ammonical flavor
            produce exclusively by the Limboo women of Sikkim. Black Soya bean
            and white soya bean this variety is soaked overnight and boiled
            until they are soft. About 1% of firewood ash is added to the cooked
            soya bean to maintain the alkaline condition of the product. This is
            covered up in the jute bag and left to ferment naturally at ambient
            temperature (20-30˚ C), for 1-2 days above the earthen oven kitchen.
            Completion of fermentation is indicated by the appearance of the
            white viscous mass on the fermenting soya bean and development of
            slight odor of ammonia. Self-life of Kinema is for 2-3 days in
            summer and 5-7 days in winter without refrigeration. It can be
            preserved for several months by drying in the sun for 2-3 days.
            Kinema is eaten as a curry with boiled rice, delicacy of the Kinema
            can be perceived by its appealing flavour and sticky texture. Kinema
            is eaten in many ways making it in variety, fresh Kinema is also
            eaten as achar. Dried Kinema is sometimes mixed with leafy
            vegetables to make it a mixed curry.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KINEMA-DRY.jpg",
                alt: "Packaged dry Kinema",
                caption: "Packaged dry Kinema ready for sell",
              },
            ]}
            layout="small"
          />

          <Para>
            Kinema is sold in all local periodical markets, locally called haats
            in Sikkim by rural Limboo women. Kinema is produced by natural
            bacterial fermentation.
          </Para>

          <SubTitle title="(ii) Mesu" />

          <Para>
            Mesu is a traditional fermented bamboo shoot with a sour-acidic
            taste of the Limboos of Sikkim. Locally grown or wild bamboo shoots
            of Thaypha, or Choyabans (Dendrocalamus), karanti bans (Bambosa
            tulda) and Bhalu bans (Dendrocalamus sikkimensis) are cleaned,
            chopped finely and pressed tightly into a hollow bamboo stem. The
            tip of the vessel is covered tightly with leaves of other wild plant
            and left for fermentation under natural anaerobic condition for 7-15
            days. Completion of mesu is indicated by the typical mesu flavor and
            taste. The dominant mesu producer is the Limboo women of the Limboo
            community. Mesu is eaten as pickle. Mesu-pickle is mixed with edible
            oil, chilies and salt and is kept in a closed jar for several months
            without refrigeration. Mesu kept in a green bamboo vessel loosely
            caped by leaves of any wild plant tied by the straw is commonly sold
            during summer season by the Limboo women. Lactobacillus plantarum,
            L. Brevis L. Curvatus, Leuconostoc citreum, Pediococcus have been
            found in the samples of (Tamang Budhiman and Tamang J.P 2008; 91).
          </Para>

          <SubTitle title="(iii) Khesung (Limboo) Marcha (Nepali)" />

          <Para>
            Khesung or marcha is not food items but is mixed dough inoculate
            used as starter culture for the preparation of various indigenous
            alcoholic beverages by the Limboos. Khesung is a dry, round to flat,
            bread or cake like, creamy white to dusty white, solid ball like
            starter ranging from 1.9 to 11.8 cm in a diameter with a weight
            ranging from 2.3 gm to 21.2 gms. Khesung is a starter of fermented
            millet beer, without which fermented beer cannot be prepared. The
            starter is exclusively prepared by the Limboo women in Sikkim.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KHESUNG-1.jpg",
                alt: "Preparing Khesung",
                caption:
                  "Preparing Khesung/Marcha (Yeast) by Limboo Women of West Sikkim",
              },
              {
                src: "/LIMBOO-KHESUNG-2.jpg",
                alt: "Khesung balls",
                caption: "Khesung/Marcha starter balls",
              },
              {
                src: "/LIMBOO-KHESUNG-3.jpg",
                alt: "Drying Khesung",
                caption: "Sun-drying of Khesung",
              },
            ]}
            layout="three-small"
          />

          <SubTitle title="(iv) Thi (Limboo) Jaarn (Nepali)" />

          <Para>
            This is an important beverage of the Limboo community. It is used as
            Toongba (putting it in a bamboo or wooden cane) and taken with the
            help of bamboo straw. "Thi-Seep" (crushed and sieved liquid) or
            "Sejongwa" (distilled local wine) beverage. It is used in all social
            and religious occasions without which the occasions are incomplete.
            The Limboos have their own tradition for preparation of these
            beverages.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-THI-1.jpg",
                alt: "Thi-Toongba",
                caption:
                  "A traditional Limboo beverage – Thi-Toongba put in Bamboo or Wooden Cane",
              },
              {
                src: "/LIMBOO-THI-2.jpg",
                alt: "Thi preparation",
                caption: "Preparation of Thi",
              },
              {
                src: "/LIMBOO-THI-3.jpg",
                alt: "Thi serving",
                caption: "Traditional serving of Thi",
              },
            ]}
            layout="three-small"
          />

          <SubTitle title="(v) Kandruk (Limboo) Gundruk (Nepali)" />

          <Para>
            Kandruk or Gundruk is an ethnic fermented vegetable food for the
            entire people of the Himalayas. It is produced during winter when
            large quantity of leaves of rayo sag (brasicca juncea var folicosa)
            or mustard (B. comprestis var toria) or raddish (raphanus sativus)
            vegetables pile up. The leaves are wilted, shredded and crushed
            mildly and pressed into an earthen jar or container or under round
            pit in paddy straw or bamboo leaves (bans ko khafata). It is pressed
            enough to make air tight and allowed to ferment naturally for at
            least 21 days. Thereafter, the material is taken out from the pit or
            jar or container and sun dried for a week to make it dry. It gives a
            mild acidic taste. It is taken as a soup, pickle as a sole product,
            or mixed with potato or other vegetables. It is good appetizer in a
            blend and starchy diet. It is sold in all markets. Lactobacillus
            fermentum, Lplantarum L. casei var peudoplantrum, pedicoccus
            pentosaceus have been found in the sample of (Tamang, Budhiman &
            Tamang, J.P. 2008; 89-90).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KANDRUK-1.jpg",
                alt: "Kandruk preparation",
                caption: "Kandruk or Gundruk preparation",
              },
              {
                src: "/LIMBOO-KANDRUK-2.jpg",
                alt: "Dried Kandruk",
                caption: "Sun-dried Kandruk ready for storage",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="(vi) Khareng (Limboo) Selroti (Nepali)" />

          <Para>
            Khareng or Selroti is a cereal based fermented food of the ancient
            people of the Himalayan region and has Limboo mythological
            connotation as described under Limboo festival of Balihang Tongnam
            as follows:
          </Para>

          <Para>
            Until today, the people who go to celebrate the occasion are usually
            given cash gift and some people used to give edible items as well.
            The best edible items during this occasion are Khareng (selroti).
            Therefore, the Limboos even today feel that this item is best known
            and mandatory item and every one of the household prepare this item
            by any means. The most significant part of this celebration during
            the third day of occasion is to pray and offer good food and
            traditional flowers for wellbeing of the brothers by their own
            sisters.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KHARENG-1.jpg",
                alt: "Rice Khareng",
                caption: "Rice flour Khareng",
              },
              {
                src: "/LIMBOO-KHARENG-2.jpg",
                alt: "Millet Khareng",
                caption: "Millet flour Khareng (Selroti)",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="(vii) Wamyuk" />

          <Para>
            Wamyuk is an important traditional food of the Limboos. It is
            prepared from burnt chicken's small feather and wings and other
            parts. For this, the chicken should be cleaned, killed and its small
            feathers and wings are burnt. These burnt wings and feathers are
            collected in a plate for preparation of "Wamyuk". Chickens heart,
            liver, head, intestine are washed and mixed with other ingredients
            and prepared accordingly. This item is preferred to be eaten by the
            Limboos with millet beer and alcohol in any of the occasions.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-WAMYUK-1.jpg",
                alt: "Local chicken",
                caption: "Local chicken for preparation of Wamyuk",
              },
              {
                src: "/LIMBOO-WAMYUK-2.jpg",
                alt: "Wamyuk dish",
                caption: "The item - Wamyuk",
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
            title="Dress, Limboo Traditional Costumes"
          />

          <Para>
            The dress culture or costumes of the people of Sikkim have a
            tremendous diversity, divided into various communities living in
            Sikkim. With its most colorful diversity and pattern also link
            Sikkim to the history, culture and identity of its own in the
            country. Different communities have their own traditional dresses
            symbolizes commitment to their distinct community, identity and
            culture. The Limboo community, being a distinct ethnic tribe has its
            own dress culture in Sikkim.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-WOMAN-ORNAMENTS.jpg",
                alt: "Limboo woman with ornaments",
                caption:
                  "A woman traditionally adorned with ornaments - Chaptey-Sun, Dhungri, Bullaki, Kalli, Rayji, Potey-Mala, etc",
              },
            ]}
            layout="medium"
          />

          <Para>
            Most of the traditional rural folk dress of the Limboos from
            antiquity is Dawra Sruwal, Pattuka, Thutey Suruwal, Dhaka Topi,
            Waist Coat, Galfan Moza and Laber ko Jutta. They may also wear
            ornaments such as Sirupatey Khukurie, Suna ko Authi, Suna ko Chain
            and Suna ko Aunthi. Most of rural Limboo are dressed in Fariya,
            Chaubandi chola, Hembari, Mujetro, Pattuka, Moja and Lber ko jutta.
            They may also wear ornaments such as Chaptey-Soon, Dhungri, Bullaki,
            Kalli, Raji, Potey-Mala, Aunthi etc. these dress are in vogue in
            rural areas since antiquity.
          </Para>

          <SubTitle title="(i) Head Regions - for males" />

          <Para>
            <span className="font-semibold text-[#1a1550]">Paga:</span> The
            traditional costume of male for head region of the Limboo community
            is paga (Turban or Pheta in Nepali). This is based on Mundhum (oral
            tradition) – Ponlung Leppma (origin of Nahangma sam or chotlung) of
            the Limboos. The Limboos have unique form of performing prayers for
            their origin, which is called "Nahangma" a symbol of power, prestige
            and progress of human being. The myth has also expounded that, the
            use of Muden Phe (knife) or sword honoring the guests with "Paga"
            (pheta or turban) since then, which was in practice in our society.
            (Kainla Bairagi 1993, Shreng Rana Dhoj 1992, 1993 Subba C. 1995
            1-284; Subba J.R. 1998; 1-18 1999; 293-209). Thus, Paga costume of
            the head region of Limboo is a prestigious and was used for elite
            Limboos only. It consists of one to one and half-meter white cotton
            cloth. Now a day it has also been made as a readymade paga, but it
            is yet to be popular. In case of Limboo priest Samba, Yeba (both
            males) and Yema (female), it is made of white and red colored cotton
            where Wassang (feather arrows) sewn. Now a days, this paga has been
            used by Limboos in special ceremonial day or any occasion of
            programme to the guests who are special one as a mark of respect and
            honor.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PAGA-1.jpg",
                alt: "Traditional Paga",
                caption: "Different types of Paga - Turban or Pheta",
              },
              {
                src: "/LIMBOO-PAGA-2.jpg",
                alt: "Paga style",
                caption: "Traditional Paga wearing style",
              },
              {
                src: "/LIMBOO-PAGA-3.jpg",
                alt: "Ceremonial Paga",
                caption: "Ceremonial Paga with decorations",
              },
            ]}
            layout="three-small"
          />

          <Para>
            <span className="font-semibold text-[#1a1550]">Muyesup:</span> Then,
            there developed Thak - khuk or Muyesup as head region costume for
            common people of the Limboos. It is a cap with white and other
            colour clothes too like that of paga in the beginning. Now-a-days,
            most of the Limboos use colorful caps as it is easily available in
            the market. There is a customary to wear and distribute Topi or Cap
            during the final death rituals of the Limboo community since
            antiquity.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-MUYESUP-1.jpg",
                alt: "Muyesup cap",
                caption: "Traditional Muyesup cap",
              },
              {
                src: "/LIMBOO-MUYESUP-2.jpg",
                alt: "Colorful caps",
                caption: "Different types of Muyesup",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="(ii) Head Regions - for females" />

          <Para>
            <span className="font-semibold text-[#1a1550]">Thakumay:</span> The
            common traditional costume of the head region of the Limboo women is
            Thakumay. We find the description of this costume in Mundhum of Yuma
            Sammang. She is suppose to wear white Thakumay, and revered as the
            daughter of the Almighty Goddess Tagera Ningwaphumang or Yuma. She
            (also known as Yuma Sammang or Yuma only is also considered as the
            early form of universal Almighty Goddess. She is suppose to have the
            equal power and grace as that of Almighty Goddess, and thus the
            Limboos pray every morning and evening the Yuma only. It is
            seasonally prayed with newly harvested grains, fruits, roots and
            tubers even with animal sacrifices for worldly peace and comfort
            mainly at crop-harvested time. Thakumay is made of white cotton
            cloth of about one and half meter length and one-meter breadth. All
            class of Limboo women as head costume uses it.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-THAKUMAY.jpg",
                alt: "Thakumay",
                caption:
                  "Thakumay - a common traditional costume of the Limboo woman",
              },
            ]}
            layout="medium"
          />

          <Para>
            <span className="font-semibold text-[#1a1550]">Pothang:</span> It is
            just like that of Thakumay, but bright red colour cotton cloth used
            specially for bride and groom at the time of Mekkam ritual of
            marriage. This is an essential costume of Mekkam Thim (Lagan in
            Nepali) ceremony of marriage of Limboo.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-POTHANG-1.jpg",
                alt: "Young Limboo girl with Pothang",
                caption: "A young Limboo girl wearing Pothang or Shawl",
              },
              {
                src: "/LIMBOO-POTHANG-2.jpg",
                alt: "Pothang shawl",
                caption: "Pothang or Shawl",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="(iii) Head Regions - (both gender)" />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              Ningkheng or Galphan:
            </span>{" "}
            The traditional costume of the neck region of their body made of
            green, red and yellow colour woolen thread (hand woven). The costume
            is in vogue since antiquity, specially young people when performing
            traditional dances like Yalakma, Chyabrung, Khyali etc. we do not
            have any traditional costume for women in the neck region. The
            Limboo women used Thakumay or Pothang in the neck region.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NINGKHENG-1.jpg",
                alt: "Young Limboo boys with Ningkheng",
                caption:
                  "Young Limboo boys in traditional wears with Ningkheng or Galphan",
              },
              {
                src: "/LIMBOO-NINGKHENG-2.jpg",
                alt: "Ningkheng",
                caption: "Ningkheng or Galphan / Scarf",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Upper Body - for male" />

          <Para>
            There are a number of traditional costumes for the upper region of
            body for both men and women. They are (1) Sardokpa (2) Pagappa (3)
            Paohoa (4) Suthekwa (5) Lappeta Dawra (6) Laoghek. these six types
            of traditional costumes of main body are the general dresses of the
            common Limboo Man develop from the primitive single-piece-dress
            known as "taga". They are made of cotton in the beginning but later
            on adopted polyester and nylon with multi-color tied with two to
            four and more pairs of Changnam or (tuna in Nepali).
          </Para>

          <Para>
            (7) Hangchang: In the Limboo language, Hang means the King, and thus
            Hangchang is the royal dress of the elite people or the king. In the
            beginning, it was made of white cotton, but later on switched on to
            polyester, woolen fabric of different colours. The dress is also
            developed from primitive dress "taga" for the elite people .it is
            vogue and often seen being worn by the elite people.
          </Para>

          <Para>
            (8) Sunghreba (coat type), Ascoat (waist coat), Suthekwa (coat) and
            Aalphi (shirt): These costumes were adopted by the male folk of
            Limboos after they come in to contact with the western people
            specially with the English in the later Eighteenth century to early
            period of Nineteenth century. However, these costumes are vogue in
            both rural and urban areas of Sikkim, but considered not their
            traditional costumes.
          </Para>

          <SubTitle title="Upper Body - for female" />

          <Para>
            (1) Sunghamba (2) Chungloghek (3) Chaubandi: These three general
            main body traditional costumes for the women folk of the Limboos are
            developed from the primitive-one-piece female dress known as "loghe"
            in due course of time. It is made of white cotton' later adopted to
            different colours of cotton, polyester and woolen clothes tied to
            the body with or without four pairs of chungnam or stitched as a
            single chungnam. Sunghamba is for the unmarried girls and is without
            Chungnam. Chunglighek and Chaubandi are for the married women and
            are most popular. These costumes are in vogue both in rural and in
            urban areas today. They are easy to wear, easily available,
            adjustable in tightness in the body with help of four pairs of
            Changnam or Tuna, and hence named Chaubandi Choli.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-WOMEN-DRESS-1.jpg",
                alt: "Limboo women in traditional dress",
                caption:
                  "Limboo women folk in traditional dresses Chungnam, Chungloghek and Chaubandi",
              },
              {
                src: "/LIMBOO-WOMEN-DRESS-2.jpg",
                alt: "Limboo women in Chaubandi",
                caption: "Limboo women in Chaubandi Choli",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            (4) Mekhli: it is a Bridal Dress of Limboo woman, usually made of
            red cotton and also developed from "loghe". Now a days it is made of
            different types of fabrics depending on the material available.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-MEKhLI-1.jpg",
                alt: "Modern Mekhli",
                caption: "Modern designable Mekhli",
              },
              {
                src: "/LIMBOO-MEKhLI-2.jpg",
                alt: "Traditional Mekhli",
                caption: "Traditional bridal Mekhli",
              },
              {
                src: "/LIMBOO-MEKhLI-3.jpg",
                alt: "Mekhli design",
                caption: "Contemporary Mekhli designs",
              },
            ]}
            layout="three-small"
          />

          <SubTitle title="Waist region" />

          <Para>
            <span className="font-semibold text-[#1a1550]">Phayee:</span> made
            of white cotton cloth 2-3 meter long, tied around the waist region
            by both the gender. Now a day it is made of different colours
            (mostly red and yellow) and other fabrics.
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">Yuppen:</span> it is
            modern leather or foam leather adopted by Limboo man folk. Although,
            it is in vogue, not considered as their traditional garment.
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">Pangphayee:</span> a
            wide belt of reed cotton is worn by the religious priest Samba, Yeba
            (male) Yema (female). It is the essential gear of the mystic priest.
            It is worn only during the mystic functions Samba, Yeba and Yema.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PHAYEE-1.jpg",
                alt: "Phayee belt",
                caption:
                  "Wide belt (Phayee) used by both gender of Limboo community",
              },
              {
                src: "/LIMBOO-PHAYEE-2.jpg",
                alt: "Phayee tying",
                caption: "Traditional way of tying Phayee",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Lower Body Parts" />

          <SubTitle title="For Males" />

          <Para>
            (a) Jangsumba and (b) Sumba or suruwal: these two types of
            traditional costumes for the lower body part of the common man-folk
            of the Limboos developed in due course of development in the cold
            climate of Himalayas. These are made white cotton. Now a day, it is
            made of various colours and fabrics such as polyester, woolen etc.
            these traditional dresses are in vogue both in rural and urban areas
            of Sikkim.
          </Para>

          <Para>
            (c) Hangpen: Royal dress used by the Hangs (Kings) but now, being
            used by all elite Limboo man-folk. It is like that of Sumba or
            Suruwal; but made of different fabrics and better in quality as that
            of Jangsumba.
          </Para>

          <Para>
            (d) Simna or Yesim: it is a log-pleated robe, held at the waist by a
            strip of cotton passed through a hem-like belt. It is usually white,
            pleated, and decorated with two white horizontal bands; on at the
            levels of thighs, the other at cave's level. It is an essential gear
            of religious priest—Samba Yeba (all males) Yuma (female) and Yema
            (female). They wear it during their mystic dances of Tongsing,
            Phungsok and much such religious ceremony.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-SIMNA-1.jpg",
                alt: "Simna worn by Phedangma",
                caption:
                  "Simna or Yesim - worn by Phedangma the Shaman Priest of Limboo",
              },
              {
                src: "/LIMBOO-SIMNA-2.jpg",
                alt: "Simna details",
                caption: "Traditional Simna with pleats",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            (e) Langsup-Ladhop (shoes-stockings) (f) Huksuppa (hand gloves):
            Although these costumes of both sexes are in vogue today, the Limboo
            consider these costumes of recent adaptation.
          </Para>

          <SubTitle title="For Female" />

          <Para>
            sim or Gunneu: These are traditional Limboo costumes of the female
            folk made of cotton and various colour and all other fabrics. These
            are sometimes almost like that of Lepcha costume but differ in
            length and on the way of wearing. Now it is made of various colour
            and fabrics—polyester, woolen, silk etc. Saya: It is non-traditional
            dress of Limboo women, adopted recently. It is made of cotton and
            used inside sim or Gunneu.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-SIM-GUNNEU.jpg",
                alt: "Sim or Gunneu",
                caption:
                  "An old woman with traditional clothes - Sim or Gunneu",
              },
            ]}
            layout="medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Gem}
            label="Jewelry"
            title="Limboo Traditional Ornaments"
          />

          <SubTitle title="Ornaments for Males" />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (i) Ear Ornaments:
            </span>{" "}
            Gokul: Earring made of gold and silver. It is rarely worn these
            days.
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (ii) Teeth Ornaments:
            </span>{" "}
            Hebo Samyang: Gold nails pegged on the front teeth (two or more in
            numbers).
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (iii) Necklace Ornaments:
            </span>{" "}
            Namloyee: A necklace made of silver. It is very common necklace worn
            during marriage, Tongsing worship etc. it is exclusively a Limboo
            traditional ornament. It is also known as Chandrahara (in Nepali).
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (iv) Hand Ornaments:
            </span>{" "}
            Sikri: Chain made of gold or silver it is rarely worn these days.
            Hukpangee: it is made of silver known as Chura (in Nepali). Now it
            is rarely worn. Swakep: Finger rings made of gold, silver or brass.
            Gold rings are common today.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-HUKPANGEE.jpg",
                alt: "Hukpangee",
                caption: "Hukpangee, Bangles",
              },
              {
                src: "/LIMBOO-SWAKEP.jpg",
                alt: "Swakep",
                caption: "Swakep, Ring",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Female Ornaments" />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (i) Ear Ornaments:
            </span>{" "}
            Nessey: it is called Chaptey Soon (in Nepali) made of gold it is
            very common. Terengna: it is made of silver, Limboo believe it to be
            their traditional exclusively. Laskari: it is an earring made of
            gold. Kanthungri: it is also an earring made of gold. It is in vogue
            in present.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NESSEY.jpg",
                alt: "Nessey",
                caption: "Nessey - Chaptey Soon",
              },
              {
                src: "/LIMBOO-KANTHUNGRI.jpg",
                alt: "Kanthungri",
                caption: "Kanthungri",
              },
              {
                src: "/LIMBOO-NURUKA.jpg",
                alt: "Nuruka",
                caption: "Nuruka or Marwari",
              },
            ]}
            layout="three-small"
          />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (ii) Nose Ornaments:
            </span>{" "}
            Thungri: it is made of gold and very common in rural areas.
            Nebophung or Thungri: it is made of gold and very common in rural
            areas. Pholaki or Mundri: it is also made of gold and common.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-THUNGRI.jpg",
                alt: "Thungri",
                caption: "Thungri - Nose ornament",
              },
              {
                src: "/LIMBOO-PHOLAKI.jpg",
                alt: "Pholaki",
                caption: "Pholaki or Mundri",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (iii) Teeth Ornaments:
            </span>{" "}
            Hebo- Samyang: Gold nails pegged on the front teeth (two or more in
            numbers).
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (iv) Forehead Ornaments:
            </span>{" "}
            Samyangphung: which is called Shirbandi in Nepali a combination of
            three bigger size chain it is forehead traditional ornament made of
            gold. Namphung: which is called Shirphul in Nepali Plate like
            forehead traditional ornament made of gold. It is an exclusive
            ornament of the Limboos. Laghekcho Sikri: which is called Shirbandi
            in Nepali a combinations of three parallel bigger sizes Chain,
            resembling shape of the half moon with Star. it is also a forehead
            traditional ornament made of gold.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NAMPHUNG.jpg",
                alt: "Namphung",
                caption: "Namphung Shirphul",
              },
              {
                src: "/LIMBOO-LADY-NAMPHUNG.jpg",
                alt: "Lady with Namphung",
                caption: "A lady adorned with Namphug & Laghekcho Sikri",
              },
              {
                src: "/LIMBOO-LAGHEKCHO.jpg",
                alt: "Laghekcho Sikri",
                caption: "Laghekcho Sikri",
              },
            ]}
            layout="three-small"
          />

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (v) Necklace Ornaments:
            </span>{" "}
            Hasuli: A kind of necklace made of silver. It is very primitive type
            of ornament, not in vogue. Namloyee: it is made of silver most
            common necklace of Limboo women. It is an exclusive traditional
            ornament of the Limboos also known as Chandrahara (in Nepali).
            Samyang Patche or Kantha: it is made of gold commonly worn by rich
            women.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NAMLOYEE.jpg",
                alt: "Namloyee",
                caption: "Namloyee/Chandrahara",
              },
              {
                src: "/LIMBOO-LADY-ORNAMENTS.jpg",
                alt: "Lady with ornaments",
                caption:
                  "Limboo lady decked with Namloyee, Kantha & other ornaments",
              },
              {
                src: "/LIMBOO-SAMYANG-PATCHE.jpg",
                alt: "Samyang Patche",
                caption: "Samyang Patche/Kantha",
              },
            ]}
            layout="three-small"
          />

          <Para>
            Simikla Hari: it is made of hollow high-altitude bamboo internodes
            beads (Simikla). Pongwari or Kanthui: it is an exclusive traditional
            ornament of Limboos as it has been elaborate in Mundhum, connection
            about the Sun-light and thus essential requirement during Tongsing
            worship ritual. It is also called Pangwalo (in Nepali) made of red
            coral beads. The bead has been found still in some parts of the
            village used by the elderly women folk as an ornaments which is
            being treated as one the traditional ornaments among other.
          </Para>

          <Para>
            Mekkhim Pona: It is called Tilhari in Nepali, it is made of gold
            very popular ornament in rural areas, but considered later adopted
            by the Limboos. Sikiri: it is made of chains of gold or silver. It
            is also very common in rural areas. Panaye: it is Potey Mala (in
            Nepali) made of colourful plastic or stone beads. It is very
            commonly used by married women, but considered adapted later by the
            Limboos in their marriage culture. Kantha: it is made of gold
            commonly worn by rich women. Bahi: Plastics or bamboo bangles.
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (v) Hand Ornaments:
            </span>{" "}
            Hukpangi: it is Chura (in Nepali) made of gold or silver. Bahi:
            Plastics or bamboo bangles. Swakep: Anguthi or finger-rings made of
            gold, silver or brass. Mundro: Finger rings made of Aluminum.
          </Para>

          <Para>
            <span className="font-semibold text-[#1a1550]">
              (v) Leg Ornaments:
            </span>{" "}
            Langpangi: It is Kalli (in Nepali) made of silver.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Performing Arts"
            title="Limboo Traditional Dance and Music"
          />

          <Para>
            Folk culture refers to the localized life style of a subsistence or
            otherwise inward looking culture. It is usually handed down through
            oral tradition and has a strong sense of community and values the
            old ways. The section of folk culture of the Limboos comprises of
            Folk Dances, Folk Musical instruments, Folk music, Folk Songs and
            Folk Tales. The performing arts of the Limboo Community combine Folk
            song, folk music and Folk Dance of the Limboos. Many performing arts
            such as folk songs, folk music, folk dances folk musical instruments
            associated with Limboos and other communities are disappearing with
            the passage of time along with older generation people day by day.
            The state Government of Sikkim is tying its level best to promote
            eco-tourism, village tourism, adventure tourisms etc. in which this
            type of performing arts has got major role to play. The civic group
            such as Sukhim, Yakthung, Sakthim, Phojumbho, Tharpu, West Sikkim,
            holds annual celebration on 23rd August, every year and provide an
            important performance venue for exploring cultural potentialities.
          </Para>

          <SubTitle title="Ceremonial Dances" />

          <Para>
            There are two kinds of ceremonies, religious and social. The
            religious ceremonial dances have ritualistic overtones and are
            celebrative in character, while some of the dances have fascinating
            character or symbolism, others are only celebrative important
            religious occasions (Pani, 2000;28) the Limboos Sewa Samlo while
            dancing with Ke-lang at the time of house warming ceremony falls
            under this category ceremonial dances.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KAYLANG-CEREMONIAL.jpg",
                alt: "Kay Lang ceremonial dance",
                caption: "Kay Lang - ceremonial dance for House warming",
              },
            ]}
            layout="medium"
          />

          <SubTitle title="Yialakma" />

          <Para>
            Yialakkma (Dhan Nach-khas language) is the most popular dance among
            the Limboo community. It is a harvest dance teenagers to late adults
            of both sexes participate enthusiastically. The dance is usually
            organized at night during the paddy harvest seasons in the early
            ages. However, with pace of time and depending on the availability
            of youth in the particular locality the occasion of such dance is
            organized in different occasions. The dance disorganized mostly
            during the festive seasons like marriage, death rituals, New Year's
            celebrations, traditional ceremonies, fare and melas, haats and any
            occasion of entertainment. Moreover, an exclusive program was
            organized and meeting together venue like Bazar, haat sheds, waiting
            sheds, centrally located were fixed as per convenient of both
            parties, this kind of organized program was seen where maximum
            youths were engaged for performing as the source of entertainment in
            the locality.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-YIALAKMA-1.jpg",
                alt: "Yialakma dance",
                caption: "Yialakma harvest dance performance",
              },
              {
                src: "/LIMBOO-YIALAKMA-2.jpg",
                alt: "Yialakma group",
                caption: "Youth performing Yialakma",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Social Dances" />

          <Para>
            Extreme happiness calls for a celebration, dance and celebration go
            hand in hand. Human beings are essentially social. There are some
            events like marriage and birth of a child celebrated with great
            happiness, it is celebrated not only by family members but by the
            entire community living together in the village. Therefore, marriage
            and childbirth are celebrated by all members of the societies and
            sharing of edible food items as a token of gift while attending the
            celebration is very common. There is yet another kind of social
            dance in which unmarried boys and girls choose their partners. This
            type of dances will also falls under this category (Pani J.
            2000;62). Such Limboo dances are Yalakma, Kay - Langma etc. which
            has or will be described under different types of dances in this
            topic.
          </Para>

          <SubTitle title="Seasonal Dances" />

          <Para>
            Seasons are closely connected with agricultural operations. Since
            agriculture is the main stay of the Limboo people of Sikkim,
            especially those living in rural areas, seasonal changes are great
            importance. Majority of folk dance form can be seasonal because they
            are said to be performed in seasons. For instance, all harvest
            dances are seasonal. But, under this sub—heading those dances will
            be discussed which performed to celebrate or welcome the seasons.
          </Para>

          <SubTitle title="Tamkey Okma or Tam Okey" />

          <Para>
            It is a seasonal dance of the Limboo community. Which is performed
            at the time of maize first earthing-up operation during pre-monsoon
            season of Chait-Baisak. Tamkey Ookma (means digging with melodious
            song singing with partners- girls and boys in Limboo Language) is
            performed in the open maize field and song sung during the occasion
            is same like that of Pallam song during Yialang. The same partner
            who usually performs Yialang would be the best competitive partners
            during this Tam Ookay performance too but differs the melodious tone
            of singing. The tone of song is quite lengthy, slower, melodious
            than that of Pallam song which is sung during Yialang or paddy
            dance. During this Tam ookay performance the individual partners
            take Spade and stand each partners earthing-up of maize crop is done
            in consonance with the motion of song, reply, and counter reply of
            the partners in the field. The melodious song leads to love song as
            well depending on the emotional imagination and inner feelings of
            the partners.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-TAMOKEY-1.jpg",
                alt: "Tamkey Okma field",
                caption:
                  "Tam – Okay performed in real life situation at Maize field",
              },
            ]}
            layout="medium"
          />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-TAMOKEY-2.jpg",
                alt: "Tamkey Okma dance",
                caption:
                  "Tam – Okay performed as dance form by different Limboo Artists",
              },
              {
                src: "/LIMBOO-TAMOKEY-3.jpg",
                alt: "Tamkey performance",
                caption: "Tamkey Okma stage performance",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Drum Dance" />

          <Para>
            Most of the Limboo dance require drum accompaniment. Generally, the
            drummer provides the percussion accompaniment with dances. There are
            many dances in which the dancer himself plays the drum while
            dancing. Such dance comes under the drum dance.
          </Para>

          <SubTitle title="Kay Lang or Chyabrung Lang" />

          <Para>
            Kay Lang or Chyabrung is one of most popular drum dances of Limboo
            community. This dance is found to be most attractive and well known
            by many other community in Sikkim and other neighboring state as
            well. The dancers consist of several numbers of males and sometimes
            with each female member are seen dancing with bodily actions in
            between each males and inclusive of all, the number of participants
            ranges from 6 to 20 and even more.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-KAYLANG-STAGE.jpg",
                alt: "Kaylang stage performance",
                caption: "Kaylang group, stage presentation",
              },
              {
                src: "/LIMBOO-KAYLANG-WEDDING.jpg",
                alt: "Kaylang at wedding",
                caption: "Kaylang group welcoming at Marriage ceremony",
              },
              {
                src: "/LIMBOO-KAYLANG-RITUAL.jpg",
                alt: "Kaylang ritual",
                caption:
                  "Kaylang a ritual practice Thok-thamma, on the occasion of House warming",
              },
            ]}
            layout="three-small"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Instruments"
            title="Limboo Folk Musical Instruments"
          />

          <Para>
            Sikkim is very rich in folk musical instruments but very difficult
            to trace the first musical instrument of the state, because the
            primitive people all over the world seem to have made music of some
            sort. Folk music exists in space not in time. According to the myth
            of Mundhum of Limboo community, the first musical instrument was a
            bamboo harp known as Simikla Kom (Binayo in Khas Language) made for
            their sister Tetlara Lahadongna, made by the sons of Sawa Yukphung
            Kemba, namely-Samdang Khewa and Lungdung Khewa for their sister
            Tetlara Lahadongna in antiquity. The myth says that the next
            instrument was Niyara Hongsing Kay of Lokpha Temba and Hongpha
            brothers who danced around the new house to protect the newly
            constructed house from the evil spirits. In another myth of Mundhum,
            it is also said that Samba, Yeba, and Yema Limboo mystic Shaman
            priests came to the village of Sawa Yethangs the primitive dwarf men
            with their gear Yegeysing pole tied with Niyara Hongsing Kay to
            drive away the evil spirits from the villages. Similarly, there are
            a number of myths about the origin of musical instruments amongst
            the different community living in Sikkim in antiquity. (Subba
            J.R.1999; 203:204; 2008:195; 2009:198-354).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-SIMIKLA-KOM-1.jpg",
                alt: "Simikla Kom",
                caption: "Simikla Kom, Bamboo harp",
              },
              {
                src: "/LIMBOO-SIMIKLA-KOM-2.jpg",
                alt: "Simikla Kom playing",
                caption: "Playing Simikla Kom",
              },
              {
                src: "/LIMBOO-NIYARA-HONGSING.jpg",
                alt: "Niyara HongsingKay",
                caption: "Niyara HongsingKay – Cyabrung",
              },
            ]}
            layout="three-small"
          />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NIYARA-2.jpg",
                alt: "Niyara detail",
                caption: "Niyara HongsingKay detail",
              },
              {
                src: "/LIMBOO-CYABRUNG.jpg",
                alt: "Cyabrung",
                caption: "Cyabrung drum",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Negra (Kettle Drum)" />

          <Para>
            "Nagara" is a royal musical instrument having the right of royal
            honor. The ownership of this drum has special character and certain
            conditions, this drum "Nagara" could not be owned or possessed
            without the explicit order of the competent authorities the then
            Royal of Sikkim. It is said that, the fact behind this set of drum
            (Negra) was given to a very few well known and prominent members of
            Limboo communities along with a written Document called Lalmohar and
            the set of drum was treated as a common asset of the particular clan
            and usually inherited by the eldest son of the family. Thus granting
            of permission to to possess this drum has its own significance. The
            Lalmohar (a written document with red seal) categorically empowers
            and enables the concern clan of the community to live with full
            dignity and honor as a Bonafede citizen of Sikkim during the reign
            of the king or Chogyal of Sikkim.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NEGRA-1.jpg",
                alt: "Negra drum",
                caption:
                  "Negra (Kettle Drum) owned by Bonafede people of West Sikkim",
              },
              {
                src: "/LIMBOO-NEGRA-2.jpg",
                alt: "Playing Negra",
                caption:
                  "Young experts the limboo boys playing Negra during festival and marriage ceremony",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            This drum is used in almost all occasions of celebrity and sorrowful
            moments like death, funerals and last rituals. However, the event of
            celebration can be clearly understood through beating of the drum,
            the beating differs in each occasion. Usually, the drum cannot be
            prepared and even for changing of the skin; certain mystic
            formalities are required to be follow. The ownership of the drum
            Nagara can't be changed rather it would be transferred to first
            legal heir of the family with certain roles but under no any
            circumstances the owner is allowed to give anybody. The owner of
            drum Nagara is socially obliged to keep the drum all time well
            maintained as a Royal ornament for all members of the clan and
            sub-clan. The tune of the music from the drum signifies kind of
            event taking place within Limboo community.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-NEGRA-CREMATION.jpg",
                alt: "Negra at cremation",
                caption: "Negra beaten at the time of cremation of body",
              },
            ]}
            layout="medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Music} label="Songs" title="Limboo Folk Songs" />

          <Para>
            Different communities of the state have different folk songs, which
            are generally disappearing, or being replaced by Hindi pop songs,
            English pop songs or other modern forms of songs etc. some of the
            important folk songs of the Limboo community are as follows:
          </Para>

          <Para>
            The Limboo community is very rich in folk songs. Their folk songs
            have been divided into five groups namely:
          </Para>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-white rounded-xl border border-[#1077A6]/10">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430] mt-2 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Khyali</span> - Dialog songs
                    where the young boys and girls express their day-to-day
                    romantic feelings, views on poetic language with tune.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430] mt-2 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Love songs</span> - Sordokpa
                    Pallam samlo, Pallam samlo and Tamkey Ookma Pallam samlo
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430] mt-2 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Hakpare Samlo</span> -
                    Gentlemen and women song, sung in special festive occasions
                    by elder people
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#1077A6]/10">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430] mt-2 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Nisammang Sewa Samlo</span> -
                    Ceremonial songs sung in special festive and worship
                    occasions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c430] mt-2 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Kay-Lang Samlo</span> - songs
                    sung while dancing kay lang
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <Para>
            In addition to this, there are many songs related to agriculture,
            war, historical etc., which are not popular in real life situations
            of Limboo society, but often, observed in special occasions
            organized by different cultural societies in the cultural stages
            only. Limboo Cultural Society of Tharpu, West Sikkim has been doing
            a lot for preservation, development and dissemination to conduct
            such performance of folk songs and dances of Limboos in various
            place of Sikkim.
          </Para>

          <SubTitle title="Pallam samlo" />

          <Para>
            It is a most common folk song of the Limboo and has been beautifully
            described by C. Subba in his book (1995). When the young men and
            women participate in Yalangk dance, they sing almost in the form of
            competition and usually the individual try to excel the partner
            while singing/dancing. The song is invariably sung on the theme of
            Mundhum, entertainment and love. The oral, extempore singing of this
            song requires creative, imaginative and poetic thinking. The song
            indeed requires immediate reply of the queries of the partner and
            he/she often tries to impress the partner with excellent
            composition, reply and suitable/melodious tone. Though there maybe
            long queue of persons participating in the Yalangma by holding hands
            by men and women in a circle or line, no individual who have Blood
            Relations of not less than Three Generations are allowed to hold the
            hands of any opposite gender and whatever may be the queue the main.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PALLAM.jpg",
                alt: "Pallam samlo performance",
                caption:
                  "Pallam samlo - traditional love song performance during Yalangma dance",
              },
            ]}
            layout="medium"
          />

          <Para>
            Competitor for singing shall be the two boys and girls who are
            socially permitted to dance with the particular boy or girl in a
            circle. However, any related male to male and female to female are
            allowed to hold the hands and help in singing chorus and dancing
            process.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Calendar}
            label="Celebrations"
            title="Limboo Festivals"
          />

          <Para>
            Festivals or Utsavas or Chaar means celebration of certain occasions
            and delivering one at the higher mental state. This includes the
            festivity, marry-making, celebration of anniversary, commemoration
            of occasions, observance and honoring of certain moments etc. Most
            of the Utsavas are therefore, associated with some conventions,
            customs, traditions and rituals. Modern thinkers define an Utsava or
            festival' "it is ritual as a symbolic enactment of myth, all rituals
            performed at the time of holding an utsava and have symbolic myths
            behind them which signify meaningful and integral part of the
            convention of the particular community". Sikkim has a number of
            different festivals that range from domestic events or ones focus on
            local shrines to great state holidays.
          </Para>

          <Para>The important festivals celebrated are:</Para>

          <SubTitle title="Balihang Tongnam (Tihar)" />

          <Para>
            Amongst all other festivals of Limboo community, the "Balihang
            Tongnam" (Tihar) is regarded as one of the most significant
            celebration or festival. The mythological reason of this festival is
            most significant than any other festivals and Limboos residing
            anywhere, any part, and any region of the country or world celebrate
            this festival with tremendous enthusiasm and happiness.
          </Para>

          <SubTitle title="Seasonal Festivals" />

          <Para>
            Apart from the main festival of Limboo i.e. Balihang Tongnam, there
            are series of other festivals which are traditionally scheduled
            throughout the year. Most of the festivals are clubbed in the winter
            season and in the spring time. Spring festivals correspond roughly
            with the conclusion of the winter agricultural season and then
            beginning of the hot season. Winter festivals mark the harvest and
            offering of the newly ripened food grains to "Yuma Mang", Almighty
            God for pleasing and satisfying her to bless in the days to come.
            The winter session being comparatively relaxed time after harvesting
            the crops, the inhabitants feel free and thus this particular
            session is utilized for wedding and attending fare, melas, pilgrims,
            inviting and visiting in-laws, relatives and other celebrations.
            Therefore, the Limboo community arranges wedding parties during this
            winter session and till date the convention is being maintained. The
            best seasons for celebration of festivals are either the beginning
            of winter season or beginning of the summer season as well as mid-
            winter and mid-summer season. Thus, the best well-known Limboo
            festivals are Bali Hang Tongnam, Kokphekwa Tumyen (Maghey Sankrati),
            Sisekpa Tumyen (Sawaney Sankrati), Chasok-Thisok, Yumang (Yokwa),
            Tyeongshi Srijunga Sawan Tongnam, Tapfeng, Tongsing, Phungsok etc.
            Amongst all other festivals of Limboo community, the "Balihang
            Tongnam" (Tihar) is regarded as one of the most significant
            celebration or festival. The mythological reason of this festival is
            most significant than any other festivals and Limboos residing
            anywhere, any part, and any region of the country or world celebrate
            this festival with tremendous enthusiasm and happiness.
          </Para>

          <SubTitle title="Chasok-Thisok (Harvest Festival)" />

          <Para>
            "Chasok-Thisok" is a celebration to offer the new food grains,
            fruits, root and tubers and other agricultural products to the gods
            and goddesses when they get ripe or is ready for harvest. It is a
            harvest festival and celebrated individually or collectively. The
            supreme Goddess Yuma Mang is worshipped through her worldly form
            Yuma Sammang ceremoniously for her blessing with various crops and
            animals for cultivation and rearing respectively. They believe that
            Yuma Sammang gave these crops and animals to them for survival and
            thus they offer and sacrifice the first harvest of the crop and the
            first progeny to Yuma Sammang, and celebrate as Chasok-Thisok
            festival (details described under Swaney Sankrati). They offer newly
            ripened food grains, fruits, roots and tubers etc. and also
            sacrifice the first progeny of the domestic animals (pig, fowls)
            etc. Traditionally, various kinds of animals were used to sacrifice
            to appease her during this worship ceremony and sacrifice was
            compulsory. However, the sacrifice of animals was discouraged and
            currently the use of animals sacrificial is comparatively less. This
            offering of food grains is conducted in every household of the
            Limboos. Practically, the first harvested foods like paddy, millet,
            wheat, barley, buck wheat, roots and tubers like greater yam, sweet
            potato, cassava, colocasia, ginger, turmeric, garlic, cardamom are
            restricted to put in the mouth, in case of putting without offering
            as usual the physical suffering would be felt as a mark of
            punishment. Similarly, one female piglet needs to be successful
            piggery. Therefore, offering of these food grains, root and tubers
            spices and also piglet, fowl as Samdangwa Karangwa, finger millet
            beer, husked rice grains, beaten rice (Sambek) is must and Limboos
            compulsory do this and treat as festival. The festival is celebrated
            during the time of ripening of food grains.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-CHASOK-1.jpg",
                alt: "Chasok-Thisok celebration",
                caption: "Celebration of Festival – Chasok Tongnam",
              },
            ]}
            layout="medium"
          />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-CHASOK-2.jpg",
                alt: "Harvest offerings",
                caption: "Harvest offerings during Chasok-Thisok",
              },
              {
                src: "/LIMBOO-CHASOK-3.jpg",
                alt: "Traditional rituals",
                caption: "Traditional rituals during Chasok festival",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Kok phekwa La-gaenge (Maghe Sankranti)" />

          <Para>
            The Limboos follows Yalamber Calendar and as per this calendar the
            first day of the Limboo New Year falls on 14th of January and which
            is regarded as the New Year Day of Limboos. This day is known as
            "Kok phekwa Tumyen" the New Year day is celebrated with full of joy
            and happiness. This celebration welcomes the most prosperous and
            happy New Year. The New Year day of Limboo has the mythological
            origin.
          </Para>

          <Para>
            On this day, Sammangs specially Tap Sammang (Kuee Kudop – Mundangwa
            Sringwa, Tenchama, Khanjoma, Wajanma and Toksangba) propitiated
            worshipped with offering of roots and tuber crops, even with blood
            sacrifices of fowls etc. after taking bath at the confluence of
            River like Teesta and Rangeet River, symbolizing the meeting of
            human beings and Sammangs (divinities) while in life and beyond.
            After all, the man has to go back to his place of origin- physical
            consciousness and then spiritual consciousness (to join the mangs
            and the sammangs after his death leaving his physical body on earth.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-ROOTS-1.jpg",
                alt: "Roots and tubers",
                caption:
                  "Different types of Roots taken at the time of Maghey Sankranti",
              },
              {
                src: "/LIMBOO-ROOTS-2.jpg",
                alt: "Roots collection",
                caption: "Collection of traditional roots and tubers",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            Nevertheless, with the pace of time the system of celebration of
            this "Kak Phekwa Tongnam" is shifted to the premises of Mangheems.
            Currently, the celebration is being made in the premises of
            Mangheems and most appropriate venue is regarded as Mangheem only.
            During this day, tubers such as Ban Tarul, yams and a varieties of
            greater yams, sweet potato, roots Iskus, Simal tarul (cassava),
            colocosia are collected. In earlier days Limboo boys and girls used
            to assembled in the venues two to three days advance in the festival
            and used to perform paddy dance (Yialangma) for the entire week or
            so, and providing the forum for love making and elopement or
            selection of their life partners. Now, exhibition of Government
            Departments are organized at Jorethang South Sikkim and the people
            enjoy the exhibition side by side. The Sikkim Government organizes
            Cultural program for the people who come for taking Makar bath at
            Jorethang. (Subba J.R. 1999;198;2008:217;2009:313-321).
          </Para>

          <SubTitle title="Tyeongshi Sirijunga Sawan Tongnam" />

          <Para>
            The birth anniversary of "Tyeongshi Srijunga Singthebe", the
            incarnate of the king Srijunga Hang of 9th Century, who had codified
            the Limboo script now known as Srijunga Script is celebrated as
            festival by the Limboos of Sikkim. Tyeongshi Srijunga Singthebe
            (1704 to 1742) singly credited for revival and propagation of
            reading and writing Srijunga script in Sikkim. In the process of
            propagation, he came to Martam, West Sikkim in 1730, and started
            propagating Limboo Language and Literature. While he was propagating
            Language and script he was assassinated in 1742, and he sacrificed
            his life for the cause of the Limboos. However, he has been survived
            by his committed work of propagation and he could create a towering
            figure in the history of Limboo language and literature. The Limboos
            feel proud of his sacrifice and assassination. This day falls in the
            month of December Senchrengla Labhoon (Mangsirey Purnima), on this
            day The Government of Sikkim has been pleased to declare Govt.
            holiday. This declaration was made in 1997 as a mark of respect of
            sacrifice of "Tyeongshi Srijunga". Of late, this day of celebration
            become popular to all Limboo community living in Sikkim, West
            Bengal, Assam and Nepal. The celebration is to commemorate the birth
            anniversary of great soul and celebrated in various places.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-SRIJUNGA-STATUE-1.jpg",
                alt: "Statue of Srijunga",
                caption:
                  "Statue of Srijunga at Hee-Yangthang, Maneybong – Dentam West Sikkim",
              },
              {
                src: "/LIMBOO-SRIJUNGA-STATUE-2.jpg",
                alt: "Srijunga at Martam",
                caption:
                  "Statue of Srijunga at 'Srijunga Mangheem' Martam – Bermiok West Sikkim",
              },
            ]}
            layout="two-medium"
          />

          <SubTitle title="Iman Sing Chemjong Sawan Tongnam" />

          <Para>
            The birth anniversary of Iman Sing Chemjong (1904-1976) the great
            historian and Limboo language expert is celebrated as festival in
            his honor by the Limboos in recent years. In Sikkim, the festival is
            organized by Sukkhim Yakthung Saplon Chumbho, west Sikkim every year
            since 1997. The Literary organization was started for the
            development of Limbooo language and literature in 1995, and was
            registered officially in 2000. Annually, literary competition on
            Limboo poem, essay, stories, and drama etc. are held on that
            festival, and winners are awarded for the promotion of Limboo
            language and literature. The language and literary articles
            collected thus are edited and published in annual journals known as
            "Emeytnasung". So far, 40th issues have been released by 2017. A
            number of books, journal, magazines on Limboo language and
            literature are also released on the day of festival. Cultural
            programs like Yialang, Khyali, Hakparey, Chyebrung, etc. are held.
            In this festival awareness program of the Limboo community takes
            place in general.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-IMAN-SINGH.jpg",
                alt: "Iman Singh Chemjong celebration",
                caption:
                  "Celebration of birth anniversary of Lt. Iman Singh Chemjong at Gayzing West Sikkim",
              },
            ]}
            layout="medium"
          />

          <SubTitle title="Pilgrimage" />

          <Para>
            Many Limboo people of the older age of all faiths go on pilgrimage
            every year. Some go to visit the birthplace of their religious
            priests, work place like Yasok, Burasubba, Nepal, Martam in Sikkim
            and other holy places for mental and spiritual satisfaction. Other
            set out to earn merit, fulfill a vow, or seek a boon for deity. A
            pilgrimage may be as simple as an extended trip to a nearly shrine
            or as complex as journey that traverses much of the sacred spaces in
            the state or the country. Usually, the Limboo have tremendous faith
            on origin of ancestors place and this is known as Mangenna Lungdhung
            or Mangenna Yiok by the Limboos, the birth place of particular Clan
            or sub clan(thar or sub-thar)of the Limboo. Limboo treat such
            birthplace as most meaningful and holy pilgrimage. Pilgrimage lifts
            the pilgrim from everyday life as the individual travels to a sacred
            crossing. This period of prolonged contact with the religious
            teachers as pilgrims halt at shrines, such as Mangheems, and enjoy
            teachings by religious teachers, blends seamlessly with tourism. The
            pilgrimage also provides forum for interaction with diverse group of
            people.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Languages}
            label="Language"
            title="Language and Literature"
          />

          <Para>
            Sikkim state has rich socio-cultural source with multi-lingual of
            different ethnic groups with its mother tongue or lingua franca
            called 'Nepali' the language that has been recognized and enlisted
            under 8th schedule of Indian constitution. The Lepcha, Bhutia and
            Nepali languages have been recognized by the state Government as
            official languages in the year 1977. The Limboo language has been
            given status of official language by the state Government in the
            year 1981. Further, during the year 1997, seven other languages have
            been given the status of official languages and thus all together
            eleven languages have now been accorded official languages in the
            state of Sikkim.
          </Para>

          <Para>
            Historical written record reveal that, during 9th century A.D. the
            king popularly called as Srijunga Hang invented/devised a script of
            Limboo language which is of late known in his honor "Srijunga
            script". The design of the script resembles as script through
            blueprint copying of the Brahmi script of the Gupta period (4th to
            8th century A.D.). The letters of the Srijunga script are comparable
            to the Gupta Brahmi script, later; Srijunga Tyeongshi (1704-1741)
            revived and popularized Srijunga's Script. A number of photocopies
            of practicing writing system while teaching the Limboo people at
            Martam, West Sikkim are evidence of his work, safely preserved in
            the office of Indian Office Library London. There was no addition or
            deletion of letters to the "Srijunga Script" during his period.
          </Para>

          <SubTitle title="Limboo Language Developments" />

          <Para>
            The policy of educating more and more about its own state and
            culture to the students of Sikkim could not be successful as desired
            even today, because of absence of its own Board of Education. Now
            the Sikkim University is trying its level best towards this
            direction since 2007. From the Linguistic point of view, this is the
            movement away from Tibetan and Nepali to the regional vernacular
            languages, emerged from ancient oral Literature to written forms,
            stimulated by the integration of the Sikkim in to the Indian union
            as the 22nd state of India.
          </Para>

          <Para>
            The Government of Sikkim through the Sikkim Official Language Act,
            1977 recognized Nepali, Bhutia, Lepcha Language as the Official
            languages of Sikkim, the Limboo language got status of state
            official language only in 1981. The Graduate level classes were
            started in the year 2000, under NBU, and the Sikkim University
            formally started the classes from 2008 respectively. Now, in this
            current stage the Ph. D Courses has also been started from the year
            2022. It is because of rapid Limboo Language development the Limboo
            Language along with Bhutia and Lepcha Language, got recognition from
            UGC for the permission to teach in the Master Degree level from the
            year 2016, now, which is being executed and run in the Sikkim under
            Sikkim University.
          </Para>

          <Para>
            Limboo Literary Association (Sukkhim Yakthung Sapsok Sangjunbho) was
            registered in 1979. Numerous Limboo folklores, poems, essay, novel
            etc. have been published in Sikkim from time to time. The prominent
            Limboo writers are B.B.Subba, Padam Singh Subba, S.R. Khajum, Jas
            Raj Subba, Mohan Prasad Subba, Bal Bahadur Subba, Lt. Mohan Subba
            (Ijam), Lt. Chandra Mangyung Harka Bahadur Khamthak, Dr. B.L
            Khamthak and many other school Teachers. Srijunga script was
            computerized in 1995, (J.R.Subba, 2002; 2008; 159,178; Subash
            Deepak, 2014).
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Heart}
            label="Religion"
            title="Religious Traditions"
          />

          <Para>
            "Yuma Samyo" Yumaism is the religion followed by the Limboo
            community. Yumaism is a Henotheist or Kathenotheist religion and
            believes in a single Almighty Goddess "Tagera Ningwaphuma" which is
            also popularly known as "Yumamang" while still recognizing other
            gods and goddesses created by her, as her Messenger or Her
            manifestations who helped Her in the creation of universe, earth,
            planet, the entire living and non-living things and its
            preservation, sustenance and development. Tagera Ningwaphuma is the
            ultimate supreme Goddess, omniscient (all knowing) omnipresent (in
            all places at all times) omnipotent (all powerful) infinite (without
            beginning or end) and eternal force light or power of existence
            which has none of the attributes. The basic concept of Yumaism is
            that, the Tagera Ningwaphuma created the universe including every
            living and non-living things in it with the help of her messengers,
            collectively known as Mangs (Deities). She is there in everything of
            Her creation. Yuma Mang or Yuma is the creator, the preserver, the
            sustainer and should be prayed every morning and evening to
            establish close relationship with Her by the Yumaism adherents.
          </Para>

          <SubTitle title="The Worship place Mangheem/Mangdhans of households" />

          <Para>
            The Almighty Goddess Tagera Ningwaphuma is the only Goddess who is
            revered most and whose names referred in the direction of several
            times and several places. A number of other Gods and Goddesses are
            also prayed for blessing and success for their respective role of
            occasion in assisting the Almighty Goddess Tagera Ningwaphuma in the
            creation of the universe, all other gods and goddesses are her
            messengers (Sijo-ingmi Sa). Construction of a collective worship
            place known as "Mangheem" for the Almighty Goddess Tagera
            Ningwaphuma in its "Mang" (Deity form) at "Mangheem" has also been
            started in many places from the last quarter of 20th century.
          </Para>

          <Para>
            The Mangheem comprises of Eight Steps on the center of the Mangheem
            inside, tapering on the top representing the Eight Atmospheric
            layers of the earth (Eight Dens) each considered as a separate realm
            or world or Den of the mother earth atmosphere known as "Sangbhe".
            The ground floor is considered as the living world (Iksha Khambek
            Den). The Mangheem of the outer structure comprises of three layers
            plus Five cone "Star" at the top or apex (Gajur), representing nine
            Dens/world/realms (tal-atal) (3+5+1 ground floor) again of the
            earth's atmospheric layers inclusive of Iksha Khambek Den. The
            Mangheem looks typically of the Yuma samyo due to its architectural
            identity.
          </Para>

          <Para>
            The religion does not believe in idol worship. The adherents pray
            and worship the Almighty Goddess Tagera Ningwaphuma in its Yuma
            Sammang (Yuma Sam) form as a physical consciousness or as Her
            daughter (Divinity/Sam/Soul/Incarnate form) in every households,
            with a simple flower vase with Artemisia Vulgarize flowers twigs.
            The Goddess is prayed every morning and evening.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-MANGHEEM-1.jpg",
                alt: "Mangheem exterior",
                caption: "Mangheems of few places",
              },
              {
                src: "/LIMBOO-MANGHEEM-2.jpg",
                alt: "Mangheem interior",
                caption: "Mangheem interior structure",
              },
            ]}
            layout="two-medium"
          />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-SANGBE-1.jpg",
                alt: "Sangbe interior",
                caption:
                  "Sangbe - inside the Mangheem represents as the Eight atmospheric layers of mother earth",
              },
              {
                src: "/LIMBOO-SANGBE-2.jpg",
                alt: "Altar",
                caption:
                  "Altar for daily prayers or worship by the priests/Phedangmas & devotees",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Heart}
            label="Priesthood"
            title="Spirit Possession in Limboo Priesthood or Limboo Shaman Priests"
          />

          <Para>
            The Limboo religious priests are defined as part time tutelary
            spirit possession Shamans who perform both Shamanistic and
            non-Shamanistic social ceremonies in the Limboo society, and hence
            known as Shamanistic priests. They perform shamanistic rituals
            through controlled state of ecstasy, trance or possession to gain
            intimate knowledge of supernatural beings, their where about, their
            mannerism, their desires, likes and dislikes, needs and
            requirements. They are specialist in human soul and therefore,
            perform manifest functions in the society. They are part time
            professionals of cures and healers and limit their activities to
            prayer, worship and religious offerings to supernatural beings.
          </Para>

          <Para>
            The Yuma religious practitioners are collectively known as
            Phedangmas. It is a general term for all types of Limboo religious
            practitioners. In classical term, they are recognized as
            "Sibhak-Yami Sa" which means (Si—Departed, Phak or Bhak—Cycle,
            Yami—Name, Sa—Individual) incarnate individuals having departed
            Divine souls. Thus, Phedangmas are reincarnate part-time religious
            practitioners. They officiate and perform all the life rituals and
            worship such as Pre-Natal womb worship, birth rituals, new born
            child naming to initiate the perceptive souls of the child, purify
            the new born pollution rituals, solemnize marriage weddings, death
            rituals, offerings of household divinities, harvest ceremonies etc.
            besides curing and healing of the sick.
          </Para>

          <SubTitle title="The Limboo Religious Priests - Phedangmas" />

          <Para>
            The Yuma religious practitioners are collectively known as
            Phedangmas. It is a general term for all types of Limboo religious
            practitioners. In a classical Mundhum language they recognize them
            self as "Sibhak-Yaming Sa" which means (Si—Departed, Phak or
            Bhak—Cycle, Yaming or Yami—Name of Sam Sire Deity/incarnate,
            Sa—Individual) incarnate individuals having departed Divine souls.
            Thus, Phedangmas are reincarnate part-time religious practitioners.
            One cannot become a Phedangma by learning Mundhums. At the most the
            layman learns Mundhums and officiate religious and social functions
            as "Yehang" (as a learned person) but cannot perform any religious
            worship. To become a Phedangma he must be reincarnate individual.
            Hence, the Limboos believe that the Phedangmas are reincarnate
            individuals having an additional soul of the departed dignitaries as
            "Sam Sire" recognized and sent by the Almighty Goddess Tagera
            Ningwaphuma.
          </Para>

          <Para>
            They officiate and perform all the life rituals and worship such as
            Pre-Natal womb worship, birth rituals, new born child naming to
            initiate the perceptive souls of the child, purify the new born
            pollution rituals, solemnize marriage weddings, death rituals,
            offerings of household divinities, harvest ceremonies etc. besides
            curing and healing of the sick. They are sole specialists, collect,
            retrieve the souls of the death, travel/accompany the souls to the
            land of ancestors, and finally hand over to the ancestors of the
            clan. They worship Mangs (Deities), Sammangs (Divinities) and
            Sammang Chyangs (Retinues of the Divinities) and able to retrieve
            the soul of the sick and thus cure the members of the community.
            Sometimes, they do divination to gain knowledge of supernatural
            beings their where about, their mannerism, their desires, likes and
            dislikes, needs and requirements through varieties of controlled
            state of ecstasy, Trans or possessions. However, most of the
            worship, religious life rituals, and social and religious functions
            are performed or controlled without controlled ecstasy, Trans and
            possession of their Sam Sire (Deity).
          </Para>

          <Para>
            A number of Anthropologists such as Jones (199: 29-55) Jones (1994,
            22-28), Reinhard (1994; 12-18) and Sagant (1994; 56-99) have
            conducted field visit on the religious phenomenon of the Limboo
            religion and Phedangmas in Nepal, and have given us a good account
            of it. However, their study was focused only on pre-conceived notion
            of Shamanism. They failed to understand the believe system of
            "Yetcham" (Eight Soul Manifestation Tradition), incarnate status of
            Phedangmas, their recognition procedures etc.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PHEDANGMA-1.jpg",
                alt: "Phedangma priest",
                caption:
                  "Religious practitioners – Phedangma from different places",
              },
              {
                src: "/LIMBOO-PHEDANGMA-2.jpg",
                alt: "Phedangma ritual",
                caption: "Phedangma performing traditional ritual",
              },
            ]}
            layout="two-medium"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Users}
            label="Priests"
            title="Types of Phedangmas"
          />

          <Para>
            Historically, the Limboos recognize nine types of Phedangmas. They
            are:
          </Para>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (i) Muhikkum Ongshi
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (ii) Phejiri Phedangma
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (iii) Samboko Samba
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (iv) Yeboko Yeba
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">(v) Yeboko Yema</div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">(vi) Yuma Sam</div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (vii) Sammundhum
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (viii) Yepmundhum
            </div>
            <div className="p-3 bg-[#1077A6]/5 rounded-lg">
              (ix) Sidapangdang
            </div>
          </div>

          <Para>
            They differ in their gear or costumes known as Sama, their role in
            the religious functions in the community, worship methodology as
            cures, healers and offerings to supernatural beings. They are
            briefly described as follows:
          </Para>

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PHEDANGMA-PHEJIRI.jpg",
                alt: "Phejiri Phedangma",
                caption: "Phedangma - Phejiri Phedangma",
              },
              {
                src: "/LIMBOO-PHEDANGMA-SAMBA.jpg",
                alt: "Samboko Samba",
                caption: "Phedangma - Samboko Samba",
              },
            ]}
            layout="two-medium"
          />

          <ImageGrid
            images={[
              {
                src: "/LIMBOO-PHEDANGMA-YEBA.jpg",
                alt: "Yeboko Yeba",
                caption: "Phedangma - Yeboko Yeba",
              },
              {
                src: "/LIMBOO-PHEDANGMA-YEMA.jpg",
                alt: "Yeboko Yema",
                caption: "Phedangma - Yeboko Yema",
              },
              {
                src: "/LIMBOO-PHEDANGMA-YUMASAM.jpg",
                alt: "Yuma Sam",
                caption: "Yuma Sam - Divine manifestation",
              },
              {
                src: "/LIMBOO-PHEDANGMA-SAMMUNDHUM.jpg",
                alt: "Sammundhum",
                caption: "Sammundhum - Ritual specialist",
              },
              {
                src: "/LIMBOO-PHEDANGMA-SIDAPANGDANG.jpg",
                alt: "Sidapangdang",
                caption: "Sidapangdang - Ancestral priest",
              },
            ]}
            layout="seven-small"
          />
        </Section>

        <div className="mt-10 pt-8 border-t border-[#1077A6]/8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/tribes/sherpa"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Previous: Sherpa Tribe
          </Link>
          <Link
            href="/tribes/tamang"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            Next: Tamang Tribe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
