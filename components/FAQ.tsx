"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

const faqs: FaqItem[] = [
  {
    question: "Is the quote free?",
    answer:
      "Yes. Completing the eligibility checker and receiving a quote is completely free, with no hidden charges.",
  },
  {
    question: "Am I obligated to buy?",
    answer:
      "No. Your quote is no-obligation. You're free to compare it, think it over, or decide not to proceed at all.",
  },
  {
    question: "How long does it take?",
    answer:
      "The eligibility checker takes about 60 seconds to complete. Installers typically get in touch within a few working days.",
  },
  {
    question: "Can I compare installers?",
    answer:
      "Yes. Depending on your details, you may be contacted by more than one trusted installer so you can compare options.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface-card dark:bg-surface-cardDark py-16 sm:py-24" id="faq">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 divide-y divide-black/5 dark:divide-white/10 rounded-2xl bg-white dark:bg-[#141b18] shadow-soft">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-ink dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-primary transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
