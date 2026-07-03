"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SunGauge } from "@/components/SunGauge";

const badges = ["Free Quote", "No Obligation", "Trusted UK Installers"];

function scrollToForm() {
  document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grain-surface absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-2 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            60-second eligibility check
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink dark:text-white sm:text-5xl lg:text-[3.4rem]">
            Check If Your Home Could Benefit From Solar Panels
          </h1>

          <p className="mt-5 max-w-md text-lg text-ink-soft dark:text-white/70">
            Complete our free 60-second eligibility check and receive a
            no-obligation quote from trusted UK installers.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" onClick={scrollToForm}>
              Check My Eligibility
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-sm font-medium text-ink-soft dark:text-white/60"
              >
                <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto flex flex-col items-center"
        >
          <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full bg-white dark:bg-surface-cardDark shadow-glow sm:h-[340px] sm:w-[340px]">
            <div className="absolute inset-6 rounded-full border border-dashed border-primary/20 animate-[spin_40s_linear_infinite]" />
            <SunGauge
              progress={78}
              size={230}
              strokeWidth={12}
              label="78%"
              sublabel="Est. roof suitability"
            />
          </div>
          <p className="mt-4 max-w-[240px] text-center text-xs text-ink-soft dark:text-white/50">
            Illustrative reading. Your actual eligibility score is calculated
            from the answers you give below.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
