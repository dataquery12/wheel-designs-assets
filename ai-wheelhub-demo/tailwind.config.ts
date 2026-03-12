import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        heading: ["var(--font-rajdhani)", "sans-serif"],
      },
      colors: {
        gold: "#D4AF37",
        silver: "#E5E5E5",
        charcoal: "#0A0A0A",
        cyan: "#00B4FF",
        electric: "#0050FF",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px rgba(0, 180, 255, 0.4))",
          },
          "50%": {
            filter: "drop-shadow(0 0 24px rgba(0, 180, 255, 0.8))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
