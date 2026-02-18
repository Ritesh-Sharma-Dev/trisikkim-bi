"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Award, Globe } from "lucide-react";

const STATS = [
  { icon: Users, value: "12+", label: "Tribal Communities Documented" },
  { icon: BookOpen, value: "200+", label: "Research Publications" },
  { icon: Users, value: "5000+", label: "Beneficiaries Trained" },
  { icon: Award, value: "30+", label: "Years of Dedicated Service" },
  { icon: Globe, value: "100%", label: "Govt. of Sikkim Backed" },
];

export default function QuickStats() {
  return (
    <section className="bg-white border-b border-[#322880]/8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-[#322880]/8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col items-center text-center px-4 py-6 group hover:bg-[#1a1550]/[0.03] transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4fd1c5]/10 flex items-center justify-center mb-3 group-hover:bg-[#4fd1c5]/20 transition-colors duration-200">
                <stat.icon className="w-4 h-4 text-[#1a1550]" />
              </div>
              <span className="font-display font-bold text-[22px] text-[#1a1550] leading-none">
                {stat.value}
              </span>
              <span className="text-[#1a1550]/50 text-[11.5px] mt-1.5 leading-snug max-w-[120px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
