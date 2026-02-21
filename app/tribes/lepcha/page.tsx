"use client";

import { motion, Variants, easeOut } from "framer-motion";
import Link from "next/link";
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
  Leaf,
  Utensils,
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
      ease: easeOut, // Using imported easeOut constant
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

export default function LepchaPage() {
  return (
    <div className="min-h-screen bg-[#f8f7fc] font-body">
      {/* ── Hero ── */}
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
            Lepcha Tribe
          </h1>
          <div
            className="w-14 h-1 rounded-full mt-3"
            style={{ background: "#f4c430" }}
          />
          <p className="text-white/60 text-[15px] mt-4 max-w-xl leading-relaxed">
            The indigenous inhabitants of Sikkim — beloved children of God,
            guardians of Mayel Lyang.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <Section>
          <SectionTitle
            icon={BookOpen}
            label="History"
            title="Origin, Ethno & History"
          />
          <Para>
            Lepcha refers to an indigenous people inhabiting in Sikkim,
            Darjeeling, Kalimpong districts of West Bengal and Tripura in India.
            The nomenclatures of language, people and their culture is same —
            thus they use Lepchas (for the people), Lepcha for the distinct
            language and also the culture they carry since time immemorial is
            also referred as Lepcha culture.
          </Para>
          <Para>
            The other term that refers to both the Lepcha people and their
            language is called <strong className="text-[#1a1550]">Rong</strong>.
            The endoethnonym of the Lepchas is{" "}
            <strong className="text-[#1a1550]">
              Mutanchi Rong Kup Rum Kup
            </strong>
            , the meaning of which is popular among the Lepchas as the{" "}
            <em>beloved Children of God</em>. The Constitution (Sikkim)
            Scheduled Tribe Order, 1978 listed Lepchas as Scheduled Tribe in the
            State of Sikkim. The population of Lepcha as per the Census of
            India, 2011 is 42,909 with 21,614 male and 21,295 female.
          </Para>
          <Highlight>
            "The Lepchas are the original inhabitant of Sikkim" — Hooker (1854),
            Hunter (1876), Risley (1891), Nebesky (1965) and others.
          </Highlight>
          <Para>
            The land of the Lepchas is popularly known as{" "}
            <strong className="text-[#1a1550]">Nye Mayal Lyang</strong>. In the
            process of reshuffling, people started referring to the land as
            Mayal Lyang — a short form of Nye Mayal Lyang — which refers to the
            Lepcha land.
          </Para>
          <Para>
            Scholars may have different views on the origin and distribution of
            the Lepchas in India, but there are commonalities in their
            observations. Sources from many scholars who have worked on the
            Lepchas include O'Malley (1907), Kawagachi (1909), Dozey (1922),
            Gorer (1938), and others.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Users}
            label="Demographics"
            title="Population Settlement Pattern"
          />
          <Para>
            Sikkim is the original homeland to the Lepchas, spreading across the
            Darjeeling district of West Bengal mainly in Kalimpong, also the
            state of Sikkim and Tripura.
          </Para>
          <Para>
            The general consensus is that the total population of Lepchas was
            approximately more than one lakh in India. However, the Census of
            India, 2011 gives a different picture bringing it down to less than
            one lakh. According to the 2001 Census, the population of the
            Lepchas of Sikkim was recorded as 35,728, while Lepchas of
            Darjeeling is 34,000. The accuracy of these census records is,
            however, contested.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Utensils}
            label="Cuisine"
            title="Food Production & Food Habits"
          />
          <Para>
            In the past, the Lepchas depended mostly on hunting, fishing and
            forest products. H.H. Risley in the Gazetteer of Sikkim (1894) wrote
            that the Lepchas find innumerable things to eat in the jungles —
            fruits, leaves, piths of stems, roots and flower buds, in addition
            to an enormous amount of fungi.
          </Para>
          <Para>
            The Lepcha food consists of grains mostly maize, millet, white
            millet (called <em>Kamdak</em> — exclusively used by Lepchas),
            variety of roots, bamboo shoots, nettle leaves, and meat prepared in
            a simple and rustic manner without spices.
          </Para>

          <SubTitle title="Suejom" />
          <Para>
            Suejom is the traditional non-vegetarian food of the Lepchas. The
            non-vegetarian stuff is baked inside the soil — a pit of about two
            feet depth is prepared, a flat stone is placed on the bottom, banana
            leaves are laid, the food is put on the leaves, and red hot stones
            are placed atop. After five or six hours the food is taken out. This
            method preserves the essential protein and fat content.
          </Para>

          <SubTitle title="Buk Mut" />
          <Para>
            Edible roots are baked under fire — placed in the fireplace covered
            by ashes and burning charcoal, with firewood kept burning until the
            roots are properly cooked. The roots are important sources of
            carbohydrates.
          </Para>

          <SubTitle title="Tok Tok" />
          <Para>
            Edible roots are boiled in water until a gruel is ready. Tok Tok is
            also prepared by grinding grains of millet or Kamdak on a flat
            stone. It is a major source of calcium, magnesium, manganese,
            copper, iron, zinc, sodium, potassium and phosphorus.
          </Para>

          <SubTitle title="Khu Zom" />
          <Para>
            A thick bread prepared from flour of millet or maize mixed with
            water and stirred into a smooth paste. The paste is poured over a
            hot flat stone or pan and turns into bread eaten with tea or water.
          </Para>

          <SubTitle title="Sukyor Syer" />
          <Para>
            Bamboo or cane shoots are chopped into small pieces, boiled, cooled
            and kept in a container for months. The fermented bamboo shoots are
            later boiled with water and taken as soup — an important source of
            protein and minerals.
          </Para>

          <SubTitle title="Ponyu Zom" />
          <Para>
            Food cooked inside a green bamboo container — rice, fish, and
            vegetables are placed inside with salt and chopped ginger. The
            bamboo opening is sealed with leaves and the bamboo is placed on
            burning fire until it changes color.
          </Para>

          <SubTitle title="Khudee" />
          <Para>
            A popular food item served on important occasions. Vegetables are
            chopped and fried, then placed on a thin bread of millet or
            buckwheat flour and gently rolled. It is a celebrated Lepcha
            delicacy.
          </Para>

          <SubTitle title="Sorong Bee" />
          <Para>
            Taken as curry or soup. Leaves of Khuzu (urtica dioica) are boiled
            with water until properly cooked, with salt and ghee added. Ready in
            twenty to thirty minutes.
          </Para>

          <SubTitle title="Mong-noungthuk" />
          <Para>
            A curry or soup prepared by boiling chopped non-vegetarian or
            vegetarian ingredients with water, adding a paste of millet flour
            and seasonings of ginger, salt, and chilly, cooked for 6–10 minutes.
          </Para>

          <SubTitle title="Chi / Aarok" />
          <Para>
            An indigenous alcoholic beverage made from millet or rice juice.
            Chi-Aarok is the traditional alcoholic drink of the Lepchas.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Shirt}
            label="Attire"
            title="Dress & Custom (Ornament)"
          />
          <Para>
            Dress has always played an important role in retaining one's
            cultural identity. Lepchas have retained their ethnicity through
            different dress codes for different occasions and genders. The
            traditional dress for Lepcha women is known as{" "}
            <strong className="text-[#1a1550]">Dumvun</strong> and for men is
            called <strong className="text-[#1a1550]">Dumpra</strong>.
          </Para>

          <SubTitle title="Women's Attire" />
          <BulletList
            items={[
              "Dumvun — the primary traditional dress",
              "Mugan, Sitling",
              "Dumbun (It) — an ankle-length dress worn with a blouse",
              "Jyoordong Tago — a long gown worn over Dambun, typically by married women",
              "Tago — a red color blouse worn with Dum Bun",
              "Taroo — a white color scarf worn around the head",
            ]}
          />

          <SubTitle title="Women's Jewellery" />
          <BulletList
            items={[
              "Alyak (bead necklace)",
              "Naykong (earrings)",
              "Akager (bangles)",
              "Feather-Chut — blessed by Narok Rum, God of music",
              "Kawo, Sambrangbor — design copied from Sambrang reep",
              "Punthop, Kakyap, Chap-Chap jeth, Nyerkyup",
              "Lyak made from seed/grain (Kalyen) ryotkup Lyak, grown on the river bank",
              "Bahur, takvill — originally made from cane, later replaced by silver",
            ]}
          />

          <SubTitle title="Men's Attire" />
          <BulletList
            items={[
              "Dumpra — a shawl-like cloth wrapped around one shoulder and held by a belt at the waist",
              "Koojoo Vaadoah — one of the oldest dresses, made from a plant, dark green in color",
              "Thakroah — a multicolored dress with Lepcha patterns, made of soft fibers, without embroidery",
              "Tago — a shirt worn inside Dumpra, with high collars covering the neck; also worn during hunting and fishing",
              "Tomoo — white trousers worn underneath Dumpra, above ankle and below knee, also worn while farming",
            ]}
          />

          <SubTitle title="Men's Accessories" />
          <Para>
            Men also wear colored beads (a necklace) around the neck along with
            a long knife known as{" "}
            <strong className="text-[#1a1550]">Banpok or Payuk</strong>. The
            traditional bag is known as{" "}
            <strong className="text-[#1a1550]">Tanggyip or Tokvyoal</strong>,
            hung on the shoulders.
          </Para>

          <SubTitle title="Traditional Hats" />
          <BulletList
            items={[
              "Thyaak Tuk (also known as Shymboo) — made of black velvet or fur, decorated with bird feathers, round in shape",
              "Papri — made from bamboo or cane, worn during fishing or hunting",
              "Samoak — an artistic creation made with small cane splits",
            ]}
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Music}
            label="Culture"
            title="Dance, Music, Folktales, Folklores, Folksong & Instruments"
          />
          <Para>
            Music forms an integral part of Lepcha culture. Different songs are
            sung on different occasions accompanied by folk instruments such as
            flutes and drums. The themes of the songs include marriage, love,
            war, and agriculture.
          </Para>

          <SubTitle title="Folk Songs" />
          <Para>
            Some of the songs include: Aprya Vom, Achuley, Tungbaong Fat Khalen
            Apraya Vom, Bri Munlaom Aprya Vom, Amar Aprya Vom, Takna Lyang,
            Mao-Mae, Fyen Alaok, Rangnyoo Rangeet, Kunchoong Pat tachat,
            Lenchhyo Ashyaot, Varto-Amoo Rum go ma boo gum, Amoo Kasa sa, Pano
            Gaeboo Achyok, Sam Phyet Athen, Ka Sa Sakchin, Poodam Bunu (water
            filling song), and many more.
          </Para>

          <Highlight>
            One of the famous songs about Mount Kanchenjunga speaks of golden
            snowy peaks as a crown, morning dews playing on flowers as
            ornaments, and the Lepcha's joy of being born, living, and dying in
            Mayel Lyang — the Lepcha land in the lap of Mount Kanchenjunga.
          </Highlight>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Calendar}
            label="Celebrations"
            title="Festivals"
          />
          <Para>
            Lepcha festivals are connected with nature and almost all the
            prayers, offerings, ceremonies, and festivals are dedicated to
            trees, plants, mountains, mother deities (nature), and rivers. Since
            nature is all-pervasive, they do not need a particular place to
            worship or celebrate. Lepcha festivities usually begin after
            Muns/Bongthings/Pudims decide the auspicious place and time.
          </Para>
          <Para>
            Lepcha festivals include huge feasting, which may last for days
            (usually three days). Most of the festivals take place in the
            harvest season or in the autumn and winter months.
          </Para>

          <CardGrid
            items={[
              {
                title: "Chyu Rum Faat",
                body: "A festival of offerings and prayers to the guardian deity, Mt. Kanchenjunga, its ranges and the foothills. Chyu in Lepcha stands for mountains or the Himalayan peaks; Rum means God.",
              },
              {
                title: "Lyang Rum Faat",
                body: "Dedicated to worship of the environment, performed by Muns/Bongthings/Pudims with rituals offering prayers to the ecosystem for sustainability.",
              },
              {
                title: "Lee Rum Faat",
                body: "Lee in Lepcha culture means house. This festival is an invocation to the god of the house and is celebrated to appease the household deity.",
              },
              {
                title: "Muk zyuk Ding Rum Faat",
                body: "Muk means greenery, zyunk means to sprout, and ding is to stand forth. Celebrated to worship the sprouting of grass — of utmost importance to Lepcha agriculturalists.",
              },
              {
                title: "Sakyoo Rum Faat",
                body: "Observed to offer prayers to Mayel Kyong and the seven immortal Lepcha couples residing in paradise — believed to move from childhood to old age within one full day.",
              },
              {
                title: "Satap Rum Faat",
                body: "An offering to Satap Rum, the hailstorm God, performed during winters (January). Prayers request no storms or disasters, and seek good ecology and harvest.",
              },
              {
                title: "Tendong Lho Rum Faat",
                body: "Celebrated on 8th August every year to worship the Tendong hill in Sikkim. Lepcha folklore holds that Mount Tendong saved the Lepchas from a great flood.",
              },
              {
                title: "Namsoong",
                body: "The Lepcha New Year celebration, falling between December and January. It celebrates the victory over the death of Lasso Mung and is observed for a week.",
              },
            ]}
          />
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Languages}
            label="Language"
            title="Languages & Dialect"
          />
          <Para>
            In 1977, Lepcha language was accorded official language status
            through the Sikkim Official Language Act, 1977 by the Sikkim
            Government. Following this, textbooks were developed and published
            for schools and colleges in the Textbook unit of the Education
            Department.
          </Para>

          <SubTitle title="Key Publications" />
          <BulletList
            items={[
              "First Lepcha grammar: Compiled in 1876 by General G.B. Mainwaring of Bengal Staff Corps, stationed at Lebong, Darjeeling.",
              "First Lepcha-English dictionary compiled in 1898 by General G.B. Mainwaring.",
              "First Lepcha Hindi-English dictionary in 1983 by D.C. Luksom.",
              "The first Lepcha reader: Rongg Arok Chhukalbo, published in 1961.",
              "The first literary magazine: Mayel Lyang, published by Renjyong mutanchi Ringmom Kurmom in 1978.",
              "Rong Dungit Vom (Lepcha folk songs) published in 1977 by Sonam Tshering Lepcha.",
              "Kayu Rong Vom Chhyo (Lepcha Songbook) published in 1986 by Hildamit Lepcha.",
            ]}
          />

          <SubTitle title="Literary Tradition" />
          <Para>
            Before the advent of Buddhism, Lepchas had their own literary
            tradition, which in the seventeenth century was overlapped during
            the Chogyal regime when priority was given for conversion to
            Buddhism.
          </Para>
          <Para>
            The traditional orthography begins with{" "}
            <strong className="text-[#1a1550]">Lazóng</strong> — Lepcha
            consonants recited by a teacher in the right melody enabling
            students to speak, read and memorize letters. After gaining basic
            knowledge through Lazóng, students progress to writing via the
            famous work{" "}
            <strong className="text-[#1a1550]">Shuyuk Llápjen</strong>.
          </Para>
          <Para>
            The Lepcha literary tradition comprises genres such as story or
            narrative (Sung), book (Chyo), prayers and blessings (Munlom),
            legend or biography (Namthar), poetry, fiction, folktales,
            folksongs, cultural writings, and religious works.
          </Para>
        </Section>

        <Divider />

        <Section>
          <SectionTitle
            icon={Heart}
            label="Spirituality"
            title="Religious Belief"
          />
          <Para>
            Lepcha traditional religion is based on oral traditions performed by
            the <strong className="text-[#1a1550]">Mun/Bongthing Padim</strong>{" "}
            — regarded as custodians of Lepcha culture. They play an active role
            in healing illness, exorcizing demons and guiding souls to
            afterlife. All rituals and religious ceremonies from birth to death
            are initiated by Mun/Bongthing Padim, who act as an intermediary
            between Gods, humans, and spirits.
          </Para>
          <Para>
            The Lepchas are divided into different religious communities —
            Buddhist, Christian, and Hindu — but they have a common cultural
            denominator: their tradition. The commonality can be traced through
            the expression{" "}
            <strong className="text-[#1a1550]">Rongkup-Rumkup</strong>, used by
            all Lepchas belonging to different faiths, meaning "Lepcha, the
            Children of God."
          </Para>

          <Highlight>
            Almost all prayers are an invocation directed towards nature —
            trees, plants, mountains, rivers, and streams. Lepchas are nature
            worshippers at heart, regardless of their formal religious
            affiliation.
          </Highlight>

          <SubTitle title="Deities & Beliefs" />
          <Para>
            <strong className="text-[#1a1550]">Nozyongnyu</strong> is considered
            the Chief Goddess of the Lepcha tradition.{" "}
            <strong className="text-[#1a1550]">It-Bumoo</strong> is acknowledged
            as the mother creator, a female earth deity. Lepchas have separate
            deities for clans, villages, families, and regions — with clan
            deities named after peaks and rivers, and regional deities
            associated with Kanchenjunga.
          </Para>

          <SubTitle title="Rituals" />
          <Para>
            Rituals and ceremonies are performed for the benefit of individual
            households and communities. The first offering is made to the
            devils, followed by a second ceremony offering to the Gods and
            Goddesses of Khanchedzonga and Chu Rum Faat. The presence of
            Mun/Bongthing/Padim in all occasions — birth, marriage, and death —
            is necessary for Lepcha tradition.
          </Para>
          <Para>
            They also perform various therapeutic rituals — without herbal
            medicine or amulets, they can cast off evil spirits and remove bad
            luck by directly confronting Mung or Rum, bargaining with evil
            spirits ranging from accepting animal sacrifice to the removal of a
            spirit from a person.
          </Para>

          <SubTitle title="Coexistence of Faiths" />
          <Para>
            Despite the introduction of Buddhism and Christianity, traditional
            Lepcha culture and faith in local gods and goddesses continued. In
            the 19th century, conversion of Lepchas into Christianity by
            Scottish missionaries took place through translation of the Bible
            into Lepcha language.
          </Para>
          <Para>
            The different-layered religion in Lepcha culture coexists, though
            accommodating Buddhism has somewhere eroded certain aspects of
            Lepcha identity. For instance, the Buddhist practice of cremation of
            the dead is not fully acceptable to Lepchas, who believe the dead
            body of a Mun or Bongthing should be buried according to traditional
            Lepcha tradition to facilitate the spirit's return to the lineage.
          </Para>
        </Section>

        <div className="mt-10 pt-8 border-t border-[#1077A6]/8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/tribes/bhutia"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Previous: Bhutia Tribe
          </Link>
          <Link
            href="/tribes/limboo"
            className="group inline-flex items-center gap-2 text-[#1a1550]/55 hover:text-[#1a1550] transition-colors duration-200 text-[14px] font-medium"
          >
            Next: Limboo Tribe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
