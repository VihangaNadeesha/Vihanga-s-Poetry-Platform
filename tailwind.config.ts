import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        card: "#1A1A1A",
        rose: "#FF5C8A",
        blush: "#FFC2D1",
        paper: "#FFFFFF"
      },
      fontFamily: {
        sans: ["var(--font-sinhala)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 92, 138, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
