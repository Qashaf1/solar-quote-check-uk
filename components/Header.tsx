"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sqc-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("sqc-theme", next ? "dark" : "light");
  }

  function scrollToForm() {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#0f1412]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Sunrise className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] tracking-tight">
            Solar Quote Check <span className="text-primary">UK</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button size="md" className="hidden sm:inline-flex" onClick={scrollToForm}>
            Check My Eligibility
          </Button>
        </div>
      </div>
    </header>
  );
}
