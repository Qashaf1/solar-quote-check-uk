"use client";

import { motion } from "framer-motion";
import { Star, Users, MapPinned, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Users, value: "Thousands", label: "of UK homeowners have requested quotes using our service" },
  { icon: MapPinned, value: "UK-wide", label: "coverage from installers across England, Scotland and Wales" },
  { icon: ShieldCheck, value: "Vetted", label: "installers checked before they can receive your enquiry" },
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-amber-signal text-amber-signal" />
          ))}
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-ink dark:text-white sm:text-2xl">
          Thousands of UK homeowners have requested quotes using our service.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-black/5 dark:border-white/10 p-6 text-center"
          >
            <stat.icon className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-lg font-bold text-ink dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-ink-soft dark:text-white/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
