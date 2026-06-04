import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "var(--bg)", 2: "var(--bg-2)" },
        panel: { DEFAULT: "var(--panel)", 2: "var(--panel-2)", hi: "var(--panel-hi)" },
        line: { DEFAULT: "var(--line)", 2: "var(--line-2)" },
        fg: "var(--text)",
        dim: "var(--dim)",
        mute: "var(--mute)",
        accent: { DEFAULT: "var(--accent)", 2: "var(--accent-2)", soft: "var(--accent-soft)" },
        good: { DEFAULT: "var(--good)", 2: "var(--good-2)", soft: "var(--good-soft)" },
        bad: { DEFAULT: "var(--bad)", 2: "var(--bad-2)", soft: "var(--bad-soft)" },
        neutral: { DEFAULT: "var(--neutral)", 2: "var(--neutral-2)", soft: "var(--neutral-soft)" },
        info: "var(--info)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: { panel: "var(--radius)", card: "var(--radius-sm)" },
      boxShadow: { panel: "var(--shadow)" },
      maxWidth: { dash: "1280px" },
    },
  },
  plugins: [],
};

export default config;
