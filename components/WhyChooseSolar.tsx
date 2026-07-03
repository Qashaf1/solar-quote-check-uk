"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Leaf } from "lucide-react";
import { Card } from "@/components/ui/Card";

const reasons = [
  {
    icon: TrendingDown,
    title: "Lower Energy Bills",
    description:
      "Generate your own electricity during daylight hours and reduce how much you rely on the grid.",
  },
  {
    icon: TrendingUp,
    title: "Increase Property Value",
    description:
      "Homes with solar installed are frequently more appealing to buyers looking for lower running costs.",
  },
  {
    icon: Leaf,
    title: "Reduce Carbon Footprint",
    description:
      "Cut down on fossil-fuel electricity and shrink your household's environmental impact.",
  },
];

export function WhyChooseSolar() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
          Why Choose Solar
        </h2>
        <p className="mt-3 text-ink-soft dark:text-white/60">
          Three reasons UK homeowners are switching to solar power.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="group h-full p-7 transition-shadow hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <reason.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {reason.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
