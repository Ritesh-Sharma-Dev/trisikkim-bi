"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Users,
  Target,
  CheckCircle2,
  Library,
  Globe,
  GraduationCap,
  ClipboardList,
  Mic2,
  Landmark,
} from "lucide-react";

/* ─── Framer variants ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const DIVISIONS = [
  { icon: Library, label: "Library and Data Bank Unit" },
  { icon: Building2, label: "Resource Centre / Cafeteria" },
  {
    icon: Landmark,
    label: "Guest House / Girls Hostel / Boys Hostel / Conference Hall",
  },
  { icon: Globe, label: "Museum" },
  { icon: BookOpen, label: "Tribal Museum and Library" },
  { icon: Mic2, label: "Audio-visual / Multimedia / Mini Theatre" },
  { icon: Users, label: "Culture / Tradition" },
];

const ROLES = [
  "To extend academic support to the tribal students for implementation of different policies and program of education sector.",
  "To develop tribal E-learning and website on tribal languages for preservation.",
  "To design and develop materials for the promotion of tribal Arts & Artifacts.",
  "To conduct training program extending academic support to the ST.",
  "To conduct evaluative studies on issues related to tribal of Sikkim.",
  "To participate in various tribal programs organized by International/National and Regional Agencies as and when called for capacity enhancing.",
  "All tribal School Inspection and monitoring.",
];

export default function AboutPage() {
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

        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#f4c430]/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#f4c430]/15 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-[#f4c430]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#f4c430]">
                About Us
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-[clamp(26px,4vw,44px)] leading-tight tracking-tight mb-3">
              Tribal Research Institute
            </h1>
            <div className="w-14 h-[3px] rounded-full bg-[#f4c430] mb-4" />
            <p className="text-white/65 text-[15px] max-w-2xl leading-relaxed">
              Strengthening research, documentation, and capacity-building for
              the tribal communities of Sikkim.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 space-y-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4"
                style={{ background: "#1077A615", borderColor: "#1077A630" }}
              >
                <BookOpen className="w-5 h-5 text-[#1077A6]" />
              </div>
              <h2 className="font-display font-bold text-[#1a1550] text-[22px] leading-tight mb-2">
                Tribal Research Institute
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mb-3"
                style={{ background: "#f4c430" }}
              />
              <p className="text-[#1a1550]/50 text-[13px] leading-relaxed">
                An apex institution under the Government of Sikkim, supported by
                the Ministry of Tribal Affairs, Government of India.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#1077A6]/10 shadow-sm p-7 md:p-8">
              <div
                className="w-1 h-full rounded-full absolute left-0 top-0 bottom-0"
                style={{ background: "#f4c430" }}
              />
              <div
                className="border-l-4 pl-5 mb-6 py-1"
                style={{ borderColor: "#f4c430" }}
              >
                <p className="text-[#1077A6] font-semibold text-[14px] italic leading-relaxed">
                  "Grants-in-Aid to Tribal Research Institutes, Sikkim — a
                  component of the Research and Mass Information scheme."
                </p>
              </div>
              <p className="text-[#1a1550]/70 text-[14.5px] leading-[1.85] mb-0">
                The Schemes of the Government of India reveals that, through the
                Ministry of Tribal Affairs, Government of India has decided to
                continue the scheme Grants-in-Aid to Tribal Research Institutes,
                Sikkim as a component of the "Research and Mass Information"
                scheme, with revised financial norms and identified
                interventions. Identifying challenges in the field of
                socio-economic development of Schedule Tribe's and
                understanding, promoting, and preserving their culture become
                important when formulating various developmental programs.
              </p>
              <p className="text-[#1a1550]/70 text-[14.5px] leading-[1.85] mt-4">
                The basic objectives of the scheme are to strengthen Tribal
                Research Institute (TRI) in the area of research and
                documentation (Preservation of Tribal Community), training and
                capacity-building on laws/constitutional provisions, capacity
                building of functionaries and the Tribal representation on
                socio-economic programs. Grants will be given to Tribal Research
                Institute (TRI) set up for various State Governments. Keeping in
                view, the considerable percentage of Scheduled Tribe population
                in the State of Sikkim.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <div className="flex items-start gap-5 mb-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-[13px] border mt-1"
              style={{
                background: "#1077A615",
                color: "#1077A6",
                borderColor: "#1077A630",
              }}
            >
              01
            </div>
            <div>
              <h2 className="font-display font-bold text-[#1a1550] text-[clamp(18px,2.5vw,24px)] leading-tight">
                Divisions of Tribal Research Institute
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mt-2 mb-3"
                style={{ background: "#f4c430" }}
              />
              <p className="text-[#1a1550]/55 text-[14px] leading-relaxed max-w-2xl">
                The Tribal Research Institute shall have the following
                divisions, namely:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DIVISIONS.map((div, i) => (
              <motion.div
                key={div.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="group bg-white rounded-xl border border-[#1077A6]/10 p-5 hover:border-[#f4c430]/60 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center border mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "#1077A610", borderColor: "#1077A625" }}
                >
                  <div.icon
                    className="w-4.5 h-4.5 text-[#1077A6]"
                    style={{ width: 18, height: 18 }}
                  />
                </div>
                <p className="text-[#1a1550] text-[13.5px] font-semibold leading-snug">
                  {div.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <div className="flex items-start gap-5 mb-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-[13px] border mt-1"
              style={{
                background: "#1077A615",
                color: "#1077A6",
                borderColor: "#1077A630",
              }}
            >
              02
            </div>
            <div>
              <h2 className="font-display font-bold text-[#1a1550] text-[clamp(18px,2.5vw,24px)] leading-tight">
                Establishment & Grant-in-Aid
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mt-2"
                style={{ background: "#f4c430" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#1077A6]/10 shadow-sm p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#f4c430]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center border"
                  style={{ background: "#f4c43015", borderColor: "#f4c43040" }}
                >
                  <GraduationCap className="w-4 h-4 text-[#1a1550]" />
                </div>
                <h3 className="font-display font-bold text-[#1a1550] text-[16px]">
                  Grant-in-Aid
                </h3>
              </div>
              <p className="text-[#1a1550]/68 text-[14px] leading-[1.85]">
                The Tribal Research Institute will receive a Grant-in-Aid from
                Ministry of Tribal Affairs, Government of India. The State
                Government deems it necessary to establish a Tribal Research
                Institute (TRI) in the State of Sikkim to identify the various
                challenges in the socio-economic and educational development of
                tribal.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#1077A6]/10 shadow-sm p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#1077A6]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center border"
                  style={{ background: "#1077A610", borderColor: "#1077A625" }}
                >
                  <Target className="w-4 h-4 text-[#1077A6]" />
                </div>
                <h3 className="font-display font-bold text-[#1a1550] text-[16px]">
                  Objective
                </h3>
              </div>
              <p className="text-[#1a1550]/68 text-[14px] leading-[1.85]">
                The objective is to preserve and enrich the tribe's way of life
                in the State of Sikkim. In pursuit of these objectives, the
                State Government has established the Tribal Research Institute.
                To ensure smooth functioning, the Department of Social Welfare,
                Government of Sikkim has temporarily set-up its office in the
                main building of the Department.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          <div className="flex items-start gap-5 mb-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-[13px] border mt-1"
              style={{
                background: "#1077A615",
                color: "#1077A6",
                borderColor: "#1077A630",
              }}
            >
              03
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-[#1a1550] text-[clamp(18px,2.5vw,24px)] leading-tight">
                Role and Function of Tribal Research Institute, Sikkim
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mt-2 mb-3"
                style={{ background: "#f4c430" }}
              />
              <p className="text-[#1a1550]/55 text-[14px] leading-relaxed max-w-2xl">
                An apex organization for planning, implementing, and evaluating
                State programs related to tribal activities at the State and
                National Level.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#1077A6]/10 shadow-sm p-7 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {ROLES.map((role, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.4}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#f8f7fc] border border-[#1077A6]/8 hover:border-[#f4c430]/40 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2
                      className="w-4.5 h-4.5"
                      style={{ color: "#1077A6", width: 17, height: 17 }}
                    />
                  </div>
                  <p className="text-[#1a1550]/72 text-[13.5px] leading-relaxed">
                    {role}
                  </p>
                </motion.div>
              ))}
            </div>

            <div
              className="rounded-xl p-5 border"
              style={{ background: "#1077A608", borderColor: "#1077A620" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: "#1077A618" }}
                >
                  <ClipboardList className="w-4 h-4 text-[#1077A6]" />
                </div>
                <p className="text-[#1a1550]/70 text-[13.5px] leading-relaxed">
                  <span className="font-semibold text-[#1077A6]">
                    In addition
                  </span>{" "}
                  to the existing roles and functions, the Tribal Research
                  Institute, Sikkim is expected to be an apex organization for
                  planning, implementing, and evaluating the State programs,
                  related to tribal activities at the State and National Level.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
