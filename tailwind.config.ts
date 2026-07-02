import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#15803d",
        },
        secondary: "#22c55e",
        ink: {
          DEFAULT: "#1f2937",
          soft: "#374151",
        },
        surface: {
          DEFAULT: "#ffffff",
          card: "#f4f6f5",
          cardDark: "#1a2420",
        },
        amber: {
          signal: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(31, 41, 55, 0.06), 0 8px 24px rgba(31, 41, 55, 0.05)",
        card: "0 1px 2px rgba(31,41,55,0.04), 0 12px 32px -12px rgba(22,163,74,0.18)",
        glow: "0 0 0 1px rgba(22,163,74,0.15), 0 8px 40px -8px rgba(34,197,94,0.35)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "dash-in": {
          from: { strokeDashoffset: "var(--dash-start, 283)" },
          to: { strokeDashoffset: "var(--dash-end, 0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
