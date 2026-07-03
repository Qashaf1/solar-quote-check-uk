"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileCheck2, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Complete the eligibility checker",
    description: "Answer a few quick questions about your home and energy usage.",
  },
  {
    icon: FileCheck2,
    title: "Receive your free quote",
    description: "A trusted UK installer reviews your details and prepares a no-obligation quote.",
  },
  {
    icon: ThumbsUp,
    title: "Choose whether to proceed",
    description: "Take your time, compare, and decide what's right for your home.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-card dark:bg-surface-cardDark py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
            How It Works
          </h2>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent sm:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-card">
                <step.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <span className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Step {i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-sm text-ink-soft dark:text-white/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
