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
              higher elevation of Tashiding, Begha, Upper Bermoik
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Namchi District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Ralang, Navabusty, Wok, Dew-Damthang, Jaubari, Basxhari, Perbing,
              Temi, Namchi, Kewzing, Bermoik-Palak, Phali-Parengtaar, Ben,
              Thingrithang
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Gangtok District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              JN Road, Khamdong, Busuk, Bojoghari
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Mangan District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Kabi Tingda
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Pakyong District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Phadamchen, Nimachen, Bouchen, Phengdong, Agamlok, Lafa,
              Chujachen, Rongli, Changu, Gnathang, Kupup, Zaluk, Pathing, Tokchi
              (pakyong)
            </td>
          </tr>
          <tr className="hover:bg-[#f4c430]/5 transition-colors">
            <td className="px-4 py-3 text-[14px] font-medium text-[#1a1550]">
              Soreng District
            </td>
            <td className="px-4 py-3 text-[14px] text-[#1a1550]/70">
              Ribdi, Bharang, Okharey, Upper Thambong, Siribadam, Singling and
              Buriakhop
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function SherpaPage() {
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
            Sherpa Tribe
          </h1>
          <div
            className="w-14 h-1 rounded-full mt-3"
            style={{ background: "#f4c430" }}
          />
          <p className="text-white/60 text-[15px] mt-4 max-w-xl leading-relaxed">
            The highlanders of the Eastern Himalayas — people from the east,
            guardians of sacred mountains.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <Section>
          <SectionTitle
            icon={BookOpen}
            label="Introduction"
            title="Introduction"
          />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-INTRO.jpg",
                alt: "Sherpa people in traditional attire",
                caption: "Sherpa community in traditional attire",
              },
            ]}
            layout="medium"
          />

          <Para>
            Sikkim is the land of peace and tranquility, a land blessed by Guru
            Padmasambhava in 8th century, which was initially known as Beyul
            Demazong and Mayal-Lyang (J.R Subba: 2007). It is a land of natural
            beauty and peaceful co-existence of different communities, namely
            Bhutia, Lepcha and Nepali.
          </Para>

          <Para>
            The Sherpa is an ethnic group that lives on the higher mountainous
            region of Eastern Himalayas mainly distributed in eastern Nepal,
            Sikkim, Darjeeling and Bhutan. Sherpa shares a common Tibeto-Burman
            language and follows an ancient form of Buddhism tradition and way
            of life supports and suggests a historical root back to Tibet.
          </Para>

          <Para>
            The title 'Sherpa' has been popularized throughout the world
            especially for the reasons of high-altitude mountaineering and
            living in a harsh and rugged topography of Himalayas. Oral history
            suggest that 'Sherpa' evolved for the word 'shar-pa' which is
            derived from the combination of shar meaning east and pa or wa
            suffix for belonging. The literal meaning translation of shar-wa or
            Sherpa is "people from the east".
          </Para>

          <Para>
            Sherpa is one of the scheduled tribe of Sikkim as according to the
            scheduled tribes order 1978 but it is considered as one of the
            sub-tribes of Bhutia. It is not in 1978 that Sherpa community
            considered one of Bhutia sub-tribes, but there are evidence like
            census of 1911, which records population of Sikkim as Bhutia
            including Sherpas, Lepchas and Paharias.
          </Para>

          <Para>
            Since, Sherpas comes as sub-tribes of Bhutia, there is no separate
            enumeration of data regarding Sherpa's demographic, socio-economic
            conditions, and there are no demographic details available. But as
            according to Subba (2007; 281) the Sherpa community comprised 25,808
            persons constituting 4.45 percent of the state's population on the
            basis of voter's list of 2004. The Sherpa household numbered 5,174
            consisting 4.63 percent of the total household in the state.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={BookOpen}
            label="History"
            title="Origin and History"
          />

          <Para>
            Today, Sherpas are known as highlanders, people living in high range
            mountains, with harsh and challenging life on rugged topography.
            They are of Tibetan origin with faith in nyingmapa school of
            Mahayana Buddhism and language of their own with Sambota Script.
            There is a consensus among the historians, researchers, Sherpas and
            other communities that Sherpas original homeland is the kham region
            of Tibet.
          </Para>

          <Para>
            As Sherpa, L.N., (2008; 3) writes that Kham is a rugged region in
            eastern Tibet dissected by many rivers including the headwaters of
            the Mekong, Yangtze, and Salween, the area was also known as the
            "Chhu Shi Gang Druk", the four rivers and six ridges region. A
            particular ridgeline called Salmo Gang in the Kham Minyag area is
            thought to be one place where Sherpa originated.
          </Para>

          <Para>
            It was in around 1480s, Sherpa ancestors were driven out of the
            ancestral homeland of kham, probably because of sectarian conflict
            within Mahayana Buddhism. After leaving kham, they travelled through
            U and Tsang, settling there temporarily before crossing over the
            Himalayas to reach their current homeland of eastern Himalayas.
          </Para>

          <Para>
            The connection of Sherpa and Sikkim has its link to the journey of
            Guru Padmasambhava in 8th century when he purified the land and
            later considered it as Sangrila. Sherpa ancestors were Nyingmapa
            followers popularly known as the 'Red Hat Sect' particularly the
            group that believed in the hidden treasures including the tradition
            of Beyul (hidden valleys).
          </Para>

          <Para>
            The initial record of Sherpa in Sikkim has been mentioned by Subba
            (2007; 279) that in early first half of 18th century, Phuntsog
            Namgyal, Chogyal of Sikkim married the granddaughter of Rabden
            Sherpa. Further writes that Sherpa were in Sikkim long before the
            date given by the western social authorities. They gradually
            accumulated with Bhutia of Sikkim alike other sub-tribes.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={MapPin}
            label="Distribution"
            title="Geographical Distribution"
          />

          <Para>
            There was a time when Sikkim had territories that was spread across
            the larger portion, the boundary in the north was Dipdala in the
            north, Shingsa Dag-Pay, Walang, Yangmag Khangchen Yarlung and Timur
            Chorten in the west, down along the Arun and DudhKosi rivers, down
            to the MahaNodi, Nuxulbari and Titaliya in the south, on the east
            Tagong La and Tang La on the north (subba, 2007; 289). Similarly
            Sherpa settlement is found in the Sikkim, Tibet, and eastern side of
            Nepal, Darjeeling, Bhutan, (Europe and America).
          </Para>

          <SubTitle title="Table 1: Showing areas with higher concentration of Sherpas population in Sikkim" />

          <ToggleSection title="View Population Distribution by District">
            <PopulationTable />
          </ToggleSection>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Users}
            label="Clans"
            title="Sherpa Clans (Sherwiru)"
          />

          <Para>
            The Sherpa are divided into 25 paternal clans group and sub-groups.
            Ru literally means "bone": Sherpa believe that a child inherits bone
            from the father and blood from the mother. It is generally accepted
            that the four original Clans (Lama Serpa, Chawa, Minyagpa and
            Thimmi) came into existence as paternal clans. Other clans are
            formed as sub-clans of the original four paternal clans.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-CLAN-TREE.jpg",
                alt: "Sherpa Clan Tree Diagram",
                caption: "Sherpa Paternal Clans Structure",
              },
            ]}
            layout="large"
          />

          <Para>
            The Lama clan came as the Lama Serpa and Lama Gonpa brother clans.
            The chawa remained a single clan that originated from a lama and his
            family. The Thimmi clan gave rise to the Salakha, Lhakshinto,
            Kambache, Goparma, Paldorje, Binagpa, Mendowa and Chhusharwa. The
            Minyagpa gave rise to the Pinasa, Gole, Gartza, Pangkarma, Thakto,
            Khapa, Penagpa, Shari-topa and Yulgongma brother clans.
          </Para>

          <Para>
            Other clans that it has come to know in Sikkim are Kerong Khamba in
            Agamlok and Shosing, Durbiza in Perbing, Phalidara, and Wadimba in
            Perbing, Thingrithang, Dokchen, Shyangden in Perbing. Sherpa custom
            does not allow marriage between members of the same clan or brother
            clans.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Culture"
            title="Culture and Traditions"
          />

          <SubTitle title="1. Festivals" />

          <Para>
            Sherpas of Sikkim are originally of Buddhist faith and almost all
            the customs, culture and traditions are shaped by the philosophy of
            Buddhism belief. They celebrate Losar, Nyungne, Lapsang, Dumchi,
            Mani Rimdu and Yarchang. Other than that Sherpa also celebrated Saga
            Dawa, Drukpa Tshechi, Buddha Jyanti and Lhabab Duchen. These
            occasions are religious in nature, with important participation by
            Lamas and monks.
          </Para>

          <Para>
            The main deity of Sherpas is Deo Padma Sambat or (Guru Rimpochay).
            Gumpas are found in almost all Sherpa villages, where they gather
            together to celebrate their festivals in an epic scale.
          </Para>

          <SubTitle title="1.1 LOSAR (New Year)" />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-LOSAR-1.jpg",
                alt: "Sherpa Losar Celebration",
                caption: "Losar celebration with traditional offerings",
              },
              {
                src: "/SHERPA-LOSAR-2.jpg",
                alt: "Sherpa New Year",
                caption: "Family gathering during Losar",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            Losar means New Year. It is the festival that celebrates the New
            Year, and a fun time eagerly anticipated by children and adults
            alike. On the 29th day of the lunar calendar, families conduct their
            spring cleaning, removing ceiling soot and garbage. This symbolizes
            removal of pollution (thrip). In the evening, guthuk a special
            porridge made of nine different food items, is cooked and shared
            within the family.
          </Para>

          <Para>
            On the New Year's Eve, family members stay home, prepare food and
            decorate the house. Butter lamps are lit in the evening and Khapse
            (deep-fried bread), nuts and candies are arranged. New Year's Day
            starts with burning of incense in the family heart for the deities.
            Then pure, fresh water is fetched from the village spring.
          </Para>

          <Para>
            Water is offered on the altar, and the water kettle is filled for
            good luck. Sur (incense) is offered to the lu (deities), an offering
            of serkyim is made to the protector deities, and new prayer flags
            are installed on the roof tops. The family starts the celebration by
            offering khapse and chhang porridge (chhanku), then decorates the
            house by placing dabs of flour (gyen) for good luck.
          </Para>

          <Para>
            Afterwards, neighbors are invited for a party. Losar parties are
            hosted in turn by each household in the village and can go on for
            weeks depending on the size of the village. People will dance and
            sing until late into the night. Each party ends with blessing drinks
            (chopa) dedicated to Guru Rinpoche and khata (Scarf) are offered to
            the departing guests for long life and good health.
          </Para>

          <SubTitle title="1.2 Chirim Lhapsang (Deity Worshiping Ceremony)" />

          <Para>
            This festival is a community sponsored deity worshiping ceremony
            that takes place in villages. It is meant to invoke the protector
            deities seeking protection of land, crops, livestock and the people.
          </Para>

          <SubTitle title="1.3 Dumchi (Big Prayer)" />

          <Para>
            Dumchi festival is celebrated in the main village during monsoon,
            soon after the potato crop is planted and before moving the
            livestock to alpine pastures. The main purpose of the festival is to
            celebrate Guru Rinpoche's birthday, but many of the Sherpa families
            are celebrated Guru Rinpoche Trunker Tsechu in Sikkim.
          </Para>

          <SubTitle title="1.4 Yarchang (Summer Festival)" />

          <Para>
            Yarchang literally means "summer beer." This festival begins with a
            lhapsang ritual (deity worshiping ceremony) to appease the mountain
            deities and seek their protection. This is followed by parties in
            the harder's house and neighbors are invited to share food and
            drink.
          </Para>

          <SubTitle title="1.5 Mani Rimdu (Mask Dance Festival)" />

          <Para>
            This festival is a religious ceremony dedicated to Chyenrezig, the
            god of compassion, who brings peace and harmony in the world.
            Following a weeklong preparation and blessing of the life-giving
            pills (rilu), the monks hold a three day public ceremony. Tsewang,
            the life consecration ceremony, is held on the first day, during
            which the blessed pills are distributed to the public. This is
            followed by a ritual mask dance (chhaam) performance, featuring
            various deities, on the second day. The ceremony concludes on the
            third day with the fire offering rituals (zingsha).
          </Para>

          <SubTitle title="1.6 Nyungne (Fasting Retreat)" />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-NYUNGNE.jpg",
                alt: "Nyungne Fasting Retreat",
                caption: "Monks during Nyungne retreat",
              },
            ]}
            layout="medium"
          />

          <Para>
            Nyungne are held at a monastery, participants take part in a retreat
            involving several days of fasting and silence. Nyungne is organized
            by the monastery committee or sponsored by individuals. The aim of
            ritual is to perform a symbolic abstinence from worldly activities
            and practice renunciation. This practice helps personal spiritual
            development and confers merit.
          </Para>

          <Para>
            The Nyungne rituals generally last for three days. The first day
            sokjya, participants consume three times food. On the second day
            nakche, participants fast and maintain silence. They say prayers and
            mantras silently, circumambulating monasteries and sacred sites
            during breaks. On the last day chowa, fasting ends and eating and
            drinking begins.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Heart} label="Religion" title="Religion" />

          <Para>
            The Sherpas are the followers of the Nyingmapa sect of Buddhism.
            Many of the great Himalayan Mountains are worshiped as gods. Each
            Sherpa villagers recognizes mountain gods identified with certain
            peaks that are their protective deities.
          </Para>

          <Para>
            The Sherpa perform many rituals for different purposes. Rituals are
            performed to heal sickness, to appease deities, to promote peace, to
            earn religious merit and to avoid misfortune. Many of these ritual
            traditions are inherited from the ancient Phenpu (Bon) religion.
            Rituals are performed by learned priests, village shamans and lay
            practitioners alike.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-CHHOSHAM.jpg",
                alt: "Sherpa Chhosham",
                caption: "Traditional Sherpa Chhosham (altar cabinet)",
              },
            ]}
            layout="medium"
          />

          <Para>
            Ritual objects are kept in a special place in the house, called
            chhosham. It is a fully carved wooden cabinet decorated with
            traditional motifs. The Nyingmapa treasure the statues of Chyenrezig
            (in the right), Wopagme (in the middle) and Guru Rinpoche (in the
            left) are placed in the chhosham. They represent the body of
            religion (chho-kyi-ku), the body of enjoyment (long-chod-kyi-ku) and
            the transformation body (trul-pei-ku) respectively.
          </Para>

          <Para>
            These statues are made of a wide variety of substances including
            earth, brass, copper, silver and gold and they are filled with
            sacred mantras (jhung) and blessed. The next important objects are
            the religious texts (pecha) including the hundreds of volumes of
            Kangur and the Tengur. Offerings of water, butter lamps and incense
            are regularly made in front of these holy objects.
          </Para>

          <Para>
            An important aspect of Sherpa religion is the monastery or gumpa.
            Many Sherpa villages have their own sect of gumpas. There are some
            communities of lamas and gyalung (staying unmarried especially for
            religious purpose) and lead a life in isolation in search of truth
            and enlightenments. They are also celebrated their religious
            festivals in the monastery.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Utensils} label="Cuisine" title="Food Habits" />

          <Para>
            The Sherpas are usually non-vegetarian. The Sherpa staple food is
            potato and wheat from which they prepare varieties of items for
            their consumption. In addition, they use to drink sujya (tea served
            with salt and butter) at all meals and throughout the day.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-FOOD-1.jpg",
                alt: "Sherpa traditional food",
                caption: "Traditional Sherpa cuisine",
              },
              {
                src: "/SHERPA-FOOD-2.jpg",
                alt: "Sherpa meal preparation",
                caption: "Preparation of traditional Sherpa dishes",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            A typical breakfast consists of sujya and chhampha (roasted barley
            flour) is taken usually. Lunch is eaten in the late morning and may
            include boiled potatoes which are dipped in ground spices. In the
            dinner they like to take shen (stiff dough made from flour of grain)
            with somarshundur (soup of preserved soft cheese) and nurma/durma
            (mash with potato's gravy specially served with stiffed dough).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-FOOD-3.jpg",
                alt: "Sherpa special food",
                caption: "Femar - special food for marriage ceremonies",
              },
            ]}
            layout="medium"
          />

          <Para>
            In the Sherpa society their special food is femar (a mixer of
            roasted corn flour and butter). It is very necessary food in the
            marriage ceremony. Their some food varieties are; boiled potato with
            a pickle of aermang (timboor), chhampha (roasted barley flour),
            rigikur (potato bread), fe-shen (stiff dough made from flour of
            grain), rildok (mashed potato mixed with wheat flour), pakril (food
            made from wheat and bread), momo (steam food made from wheat flour
            with mixing of vegetables & meat), chhen (dried green corn mixed
            with meat or vegetable commonly known as phalgi).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-FOOD-4.jpg",
                alt: "Sherpa food varieties",
                caption: "Variety of Sherpa traditional dishes",
              },
            ]}
            layout="medium"
          />

          <Para>
            Shakpa/aeri (a typical stew food consisting of balls of dough &
            vegetable), nurma/durma (mash with potato's gravy specially served
            with stiffed dough), thukpa (noodle made from wheat flour), towa
            (noodle made from potato), kaksyer (raw corn flex), sharkam (soup of
            soft fresh cheese) etc are occasionally and seasonally consumed.
            Dairy products, especially butter and curds, are important in the
            Sherpa diet. Sherpas eat meat, but as practicing Buddhists they will
            not kill animals themselves.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Shirt}
            label="Attire"
            title="Traditional Dresses and Ornaments"
          />

          <Para>
            Sherpa dresses are similar to that worn by Tibetans. Sherpas live in
            the high altitude thus it is cold all the year round. For many
            months the land is snow covered. The clothing and costumes of the
            Sherpa people were/are generally made from yak and sheep wool, and
            colored with natural dye. The wool clothing is very thick to suit
            the cold environment.
          </Para>

          <Para>
            Men wear their chhuba to knee length and under it they have a jacket
            or shirt with a stiff high collar and extremely long sleeves tetung.
            Women wear a sleeveless chhuba called engi, or a sleeved one called
            tongok. Over it they wear multicolored striped woolen aprons worn to
            cover the front and back of the bodies below the waist which is
            called pangden and gyaptil respectively.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-DRESS.jpg",
                alt: "Sherpa traditional dress",
                caption: "Sherpa traditional attire",
              },
            ]}
            layout="medium"
          />

          <Para>
            Both sides of pangden have a kingkap (triangle shape stiff) which
            determines the marital status of the woman. Both males and females
            wear high, woolen boots with hide soles (docha). The uses of
            traditional clothing are being confined to a ceremonial occasions.
            Only Sherpa women, monks and nuns are wearing traditional dresses at
            all the season. Traditional shyomung (woolen hat) completes the
            dresses of Sherpa men and women.
          </Para>

          <SubTitle title="Sherpa Ornaments" />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-ORNAMENT-1.jpg",
                alt: "Sherpa ornaments",
                caption: "Traditional Sherpa jewelry",
              },
              {
                src: "/SHERPA-ORNAMENT-2.jpg",
                alt: "Sherpa jewelry",
                caption: "Sherpa women's ornaments",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            Sherpa Jewelry is very unique and different from the others. There
            is the apron buckle which is called kyetig. It is a silver buckle
            that women use to hold the back and the front of their aprons. There
            are some ornaments which Sherpa women wear in ceremonial occasion
            and some of them were wear all the time in the villages.
          </Para>

          <Para>
            They are dzhichhuruk (onyx with coral), mathil (golden bracelet),
            kaau (golden pendant), inanila (sapphire), dzhi (onyx), pykurkukte
            (earring), chapchap (silver batch), gyanjyan (golden necklace),
            dikra (silver and golden chain that is hold in the front waist to
            the right side shoulder) and tiktik (necklace worn on a special
            occasion).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-ORNAMENT-3.jpg",
                alt: "Sherpa men's earring",
                caption: "Alung - traditional men's earring",
              },
            ]}
            layout="medium"
          />

          <Para>
            Lastly, there is an alung. This is a men's earring. These earrings
            are made of gold and they have turquoise or coral insets.
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-ORNAMENT-4.jpg",
                alt: "Sherpa ornaments display",
                caption: "Complete set of Sherpa traditional ornaments",
              },
            ]}
            layout="large"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Performing Arts"
            title="Traditional Songs and Dances"
          />

          <Para>
            Sherpa communities have a rich tradition of folk songs and dances.
            They sing folk songs to bonds people together, uplifts their spirits
            and provides recreation and rejuvenation. There is a traditional
            Sherpa saying – Lu min taam yin – which means songs are not just
            songs but are a medium of communication.
          </Para>

          <Para>
            They sing selo (Sherpa selo), tashi-sol-che and yangdosiba. Shebdro
            song is very much popular in the Sherpa community across the world.
          </Para>

          <Para>
            They perform folk dances such as shebru dance (group dance perform
            by connecting hands), shyaptuk dance (group dance), nading dance
            (dance by tapping foot), tashi-sol-che dance (dance performed in
            marriage ceremony), yangdosiba (ceremonial dance), silluwa dance
            (the dance performed in marriage ceremony by two dancers with
            holding sword and yak's tail), Khayirolyang dance (traditional
            instrumental dance), dramngyang dance (traditional instrumental
            dance), chyakikargna dance (traditional instrumental dance),
            khirkhuley dance (foot stepping dance) and yungmakabu dance (bamboo
            dance).
          </Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-DANCE.jpg",
                alt: "Sherpa traditional dance",
                caption: "Sherpa folk dance performance",
              },
            ]}
            layout="large"
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Heart}
            label="Marriage"
            title="Zendi (Marriage)"
          />

          <Para>
            One of the most important events in Sherpa culture is Tartang/Zendi
            (Marriage). A marriage is arranged by the mutual consent of the
            couples' parents, often respecting the veto of the child. The
            traditional Sherpa wedding is a lengthy process lasting more than a
            week. The wedding practices are carried out mainly for purpose of
            bestowing happiness and prosperity in the couple's married life.
          </Para>

          <Para>A Sherpa wedding consists of several stages.</Para>

          <ImageGrid
            images={[
              {
                src: "/SHERPA-WEDDING-1.jpg",
                alt: "Sherpa wedding ceremony",
                caption: "Traditional Sherpa wedding",
              },
              {
                src: "/SHERPA-WEDDING-2.jpg",
                alt: "Sherpa bride and groom",
                caption: "Sherpa bride and groom in traditional attire",
              },
              {
                src: "/SHERPA-WEDDING-3.jpg",
                alt: "Sherpa wedding rituals",
                caption: "Wedding rituals and ceremonies",
              },
            ]}
            layout="three-small"
          />

          <SubTitle title="4.1 Longchhag" />

          <Para>
            "Longchhang" is the proposal by the boy's parents to the girl's
            parents asking the hand of the girl in marriage. Before Longchhang,
            the people from either the boy's or the girl's side seek information
            indirectly regarding the possibility of the marriage. In this step,
            some members of the boy's family and relatives (normally two to
            three in number) visit the girl's home carrying a "pong" of wine. A
            pong is a traditional wooden jar used by the Sherpas to keep liquor.
            They fasten Khatak, a white silk scarf, around the neck of the pong
            and put some butter on its lid to show their respect to the girl's
            parents. An engagement is not approved on the day of the Longchhang
            by the girl's parents. The boy's family returns home and wait for
            the decision.
          </Para>

          <SubTitle title="4.2 Thichhang" />

          <Para>
            Once the boy and the girl are betrothed, the boy's and the girl's
            parents start preparing for the upcoming marriages processes.
            "Thichhang" refers to asking the girl's parents about the necessary
            things that they need to prepare and bring during the wedding day.
            This is also known as "Sodene" in Nepali language.
          </Para>

          <SubTitle title="4.3 First Pechang" />

          <Para>
            A process called Pechhang, a small meeting between the parents of
            the girl and the boy's family, is conducted to make necessary
            decisions for the wedding. In fact Pechhang is any meeting carried
            to make certain important decision. For this particular meeting one
            or two people from the boy's side go to the girl's home no matter
            how far the girl's home may be.
          </Para>

          <SubTitle title="4.4 Demchhang" />

          <Para>
            A process called Pechhang, a small meeting between the parents of
            the girl and the boy's family, is conducted to make necessary
            decisions for the wedding. In fact Pechhang is any meeting carried
            to make certain important decision. For this particular meeting one
            or two people from the boy's side go to the girl's home no matter
            how far the girl's home may be.
          </Para>

          <SubTitle title="4.5 Chhyawi" />

          <Para>
            In the next step called "Chhyawi", the boy's parents provide many
            bags of millet mixed with maize, approximately thirty "pathi" for
            wine preparation to the girl's parents. One "pathi", is the amount
            weighing four kilogram. However, in Dolakha Kimti, the amount of
            millet to be provided to the girl's parents is about sixty pathi and
            hence the amount varies according to the variation in the place as
            well. Generally, if the girl's parents accept the whole thirty pathi
            then it is the indirect indication to the boys folk that they do not
            have to bother preparing huge amounts of phemar for the zendi (the
            wedding day).
          </Para>

          <SubTitle title="4.6 Second Pechang" />

          <Para>
            Two or three weeks prior to the wedding day, the boy's and the
            girl's family members hold a gathering of the villagers to inform
            them about the marriage. The parents ask for the villagers' support
            during the wedding. The members of the bride and the bridegroom ask
            the villagers and their relatives to estimate how many people will
            be present during the wedding day. Then the preparation for the
            wedding day starts. The villagers and their relatives gather,
            discuss among themselves and choose some relatives representatives
            to collect money from those who will be present during the wedding
            day. The money, which they collect, is invested for the various
            parties during the wedding. The active participation of the Sherpas
            in the fulfillment of the communal responsibility shows their
            respect for Buddhist ideologies of compassion.
          </Para>

          <SubTitle title="4.7 Zendi or Chhangdu (the wedding day)" />

          <Para>
            "Sippa Khorlo", a special flag which is representing the wheel of
            cycle existence. It holds in front of janti (people in the
            procession). It is believed that the Khorlo protects the "Janti"
            from all the evils that they may encounter on the way to the girl's
            home. It is believed to overpower all the evils that come from any
            of the direction it faces.
          </Para>

          <Para>
            The groom takes Dhattar, Phumba and Duflong along with him and the
            main Ngagpa (married priest) carries with him the Sippa Khorlo. The
            dancers carry Sword, Bukchal (cymbals), Gelings (long metallic
            flutes) and yak's ngama (yak's tail). The "janti" also take the
            requested number of phemar, wine, khatak and chhang.
          </Para>

          <Para>
            These kinds of cymbals: one small and two large, distinguished with
            small bosses (Sil-nyen) are held vertically and used in offerings to
            peaceful deities. Those with large central bosses (Buk-chal) are
            held horizontally and used in prayers to fierce deities. The small
            cymbals (Ting-sha) are used in offering rituals.
          </Para>

          <Para>
            Dhattar represents a stick fastened with five different striped
            clothes. Dhattar is thought to bring power and prosperity. Phumba is
            a pot, the shape of which is like a flat shaped jar with a pipe to
            bring out the water from the pot and which is richly decorated with
            precious stones and metals. Phumba is normally found placed on altar
            in the Sherpa homes to keep water perhaps the most important in
            Buddhist rituals, as an offering to the god. Phumba is thought to
            increase the life span of the bridegroom.
          </Para>

          <Para>
            The bride wears five layers of clothes topped up by
            floor-length-embroidered tunic and two aprons. The bridegroom is
            dressed in a colorful chuva that is symbolic of a king whereas that
            of the bride is symbolic of a Queen. He is treated like a king with
            an umbrella carried by the Kelmi over his head. The Kelmi is the
            best man usually his cousin or brother who is not yet married.
          </Para>

          <Para>
            The bride's parents introduce themselves to the bridegroom's party
            and kindly ask whether their journey was safe and enjoyable. This
            process is known as Ngosi Tomsi. The host family hands Siljang, a
            chhang which is offered to the bridegroom as an indication that he
            is now free to take his cloak off and to take some rest. When this
            has been done, the bridegroom's parents hand over kyakiphemar and
            khatak to the bride's parents and relatives.
          </Para>

          <Para>
            Parents of the bride's family then greet the guest and inquire
            whether their journey has been safe and peaceful. All the guests
            then have their dinner. Some important members of the groom enter
            the girl's home to present Phemars and Khataks. In the mean time,
            guns are fired in the air outside the home. This process is known as
            Chhini Gegug.
          </Para>

          <Para>
            Once again both the party of the bridegroom and the bride perform
            Syorki Tomsi to each other. The Ngagpa then reads out Mola, a public
            announcement of the marriage. The Ngagpa who recites Mola should
            have a good knowledge of the religion; its history, significance and
            its association to the wedding. He is given Khatak and Chhang by the
            members of the bride and the bridegroom, cordially requesting him to
            read out the Mola on their behalf.
          </Para>

          <Para>
            Then all the guests rhythmically utter in loud voice "Khu-A, Khu-A"
            in a wave like fashion to show their acceptance of the marriage. In
            other words, Khu-A means that we now happily accept the girl then
            followed by the song sung by the members of the groom. The marriages
            are treated as holy union between two souls. It has always been an
            event of social and customary importance.
          </Para>

          <SubTitle title="4.8 Nor or Chhitong (giving away of dowry)" />

          <Para>
            When the married couple gives birth to a child, the process of
            giving dowry takes place. While giving the dowry things like the
            family condition, the behavior of the husband throughout their stay
            with each other, and other economical problems are taken into
            account.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Users}
            label="Traditions"
            title="Name Giving Ceremony"
          />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-NAME-GIVING.jpg",
                alt: "Sherpa name giving ceremony",
                caption: "Traditional name giving ceremony",
              },
            ]}
            layout="medium"
          />

          <Para>
            The name-giving ceremony of a Sherpa child is an important event.
            The local lama (Buddhist spiritual leader) is informed of the birth
            and the time that it occurred. On the basis of this information, the
            lama determines the child's name and when the naming ceremony should
            take place. Children, their first name is often named after the name
            of the day of the week on which they were born. Thus a baby born on
            Friday would be called "Pasang" (the Sherpa word for "Friday"). The
            lama, relatives, and neighbors are invited to celebrate the
            name-giving at a feast.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle icon={Heart} label="Rituals" title="Death Rituals" />

          <ImageGrid
            images={[
              {
                src: "/SHERPA-DEATH-1.jpg",
                alt: "Sherpa death ritual",
                caption: "Traditional death ceremony",
              },
              {
                src: "/SHERPA-DEATH-2.jpg",
                alt: "Sherpa funeral",
                caption: "Cremation ceremony",
              },
            ]}
            layout="two-medium"
          />

          <Para>
            Funerals are the longest and most elaborate life-cycle ceremonies;
            the body is cremated, and the soul of the deceased is encouraged,
            through ritual action and instruction, to seek an advantageous
            rebirth. When a person dies, lamas are called immediately to perform
            rituals to try to generate good, positive energy for the deceased.
          </Para>

          <Para>
            There are many different customs, but, usually, the body is kept for
            three days then cremated. The remnants of the fire mixed with clay
            and are made into tsatsa that are left in a chorten or under a large
            rock at the end of 49 days.
          </Para>

          <Para>
            Every seven days after the death, special prayers (denjen) are
            offered in the home of the deceased or in the monastery until 49
            days. One head lama is staying at the deceased home and every
            morning and evening in the same time the head lama offering surbi
            (mixture of nine items made by chhampa, minduk, milk, cord, butter,
            honey, black sugar, sakker) on the fire's hot coals for the spirit
            of the deceased until 49 days.
          </Para>

          <Para>
            The Bardo for 49 days after the death is the time and space between
            lives, by the end of which the person's next life is determined and
            they may be reborn.
          </Para>
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
