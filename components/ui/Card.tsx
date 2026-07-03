import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-card dark:bg-surface-cardDark border border-black/5 dark:border-white/5 shadow-soft",
        className
      )}
      {...props}
    />
  );
}
