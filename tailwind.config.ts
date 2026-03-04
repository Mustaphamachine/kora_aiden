import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-green": "#9EFF00",
        "deep-black": "#0A0A0A",
        "light-gray": "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(158, 255, 0, 0.5)",
        "neon-lg": "0 0 40px rgba(158, 255, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
