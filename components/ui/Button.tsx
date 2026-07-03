"use client";

import { ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children">,
    Pick<NativeButtonProps, "type"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "md" | "lg";
  isLoading?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary:
        "bg-primary text-white shadow-card hover:bg-primary-dark",
      secondary:
        "bg-white text-primary border-2 border-primary hover:bg-primary/5",
      ghost: "text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10",
      outline:
        "border border-ink/15 text-ink hover:border-primary hover:text-primary dark:text-white dark:border-white/20",
    };

    const sizes: Record<string, string> = {
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: disabled ? 1 : 1.015 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
