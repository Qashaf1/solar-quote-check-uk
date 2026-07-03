import Link from "next/link";
import { Sunrise } from "lucide-react";

const links = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#0f1412] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
            <Sunrise className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          Solar Quote Check <span className="text-primary">UK</span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-soft dark:text-white/60">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-ink-soft/70 dark:text-white/30">
        © {new Date().getFullYear()} Solar Quote Check UK. All rights reserved.
        Solar Quote Check UK is a lead-generation service and does not itself
        install solar panels.
      </p>
    </footer>
  );
}
