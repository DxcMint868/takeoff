/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        dark: "#1b1333",
        white: "#fff",
        "white-30": "#5f5a70",
        "white-60": "#a4a1ad",
        gray: "rgba(255, 255, 255, 0.2)",
        purple: "#735fd4",
        mediumpurple: "#8c78ed",
        colbalt:'#33277C',
        /** Work / marketing cards (Figma) */
        "surface-card": "#261d44",
        "surface-media": "#060e24",
        "surface-border": "rgba(112, 104, 163, 0.4)",
        /** Pill/tag accents — reuse for labels, badges, highlights */
        "tag-cyan": "#71f6ed",
        "tag-mint": "#75f671",
        "tag-amber": "#ffda8f",
        "tag-pink": "#ffb9fa",
        "tag-lime": "#edff9d",
        "tag-sky": "#92d5ff",
        "tag-coral": "#ffb57d",
      },
      boxShadow: {
        card: "0px 0px 30px 0px rgba(0, 0, 0, 0.06)",
      },
      spacing: {},
      fontFamily: {
        sora: "Sora",
        reg: "Inter",
      },
      borderRadius: {
        "3xs": "10px",
        "81xl": "100px",
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
      sm: "14px",
      "19xl": "38px",
      "3xl": "22px",
      lg: "18px",
      "29xl": "48px",
      "10xl": "29px",
      xs: "12px",
      "397xl": "416px",
      "85xl": "104px",
      "147xl": "166px",
      "55xl": "74px",
      "25xl": "44px",
      "40xl": "59px",
      "5xl": "24px",
      lgi: "19px",
      inherit: "inherit",
    },
    screens: {
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      ms1024: '1024px',
    },
  },
  corePlugins: {
    preflight: false,
  },
};
