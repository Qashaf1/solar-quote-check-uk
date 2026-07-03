"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SunGaugeProps {
  /** 0 - 100 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

/**
 * Signature visual: a radial gauge styled after a solar irradiance meter.
 * Reused as the hero's centerpiece (static illustrative reading) and as the
 * multi-step form's progress indicator (live, tied to step completion).
 */
export function SunGauge({
  progress,
  size = 180,
  strokeWidth = 10,
  label,
  sublabel,
  className,
}: SunGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // 270 degree sweep, like an instrument dial, not a full circle
  const sweep = 0.75;
  const arcLength = circumference * sweep;
  const gapLength = circumference - arcLength;
  const clamped = Math.min(100, Math.max(0, progress));
  const filled = arcLength * (clamped / 100);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ?? "Progress"}: ${Math.round(clamped)}%`}
    >
      <svg width={size} height={size} className="-rotate-[135deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${gapLength}`}
          className="text-black/8 dark:text-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#sunGaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${gapLength}`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength - filled }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="sunGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {label && (
          <span className="font-mono text-2xl font-semibold tabular text-ink dark:text-white">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="mt-1 text-[11px] uppercase tracking-widest text-ink-soft dark:text-white/50">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
