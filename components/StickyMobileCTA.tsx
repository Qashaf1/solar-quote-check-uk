"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  function scrollToForm() {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#0f1412]/95 sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button size="lg" className="w-full" onClick={scrollToForm}>
        Check My Eligibility
      </Button>
    </motion.div>
  );
}
