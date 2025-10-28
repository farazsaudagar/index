import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { 
      center: true, 
      padding: "2rem" 
    },
    extend: {
      colors: {
        ink: "#213555",
        navy: "#3E5879",
        sand: "#D8C4B6",
        paper: "#F5EFE7",
        shelf: "#EBE1D6",
      },
      borderRadius: { 
        xl: "16px", 
        "2xl": "24px" 
      },
    },
  },
  plugins: [],
};
export default config;

