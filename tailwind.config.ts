import containerQueries from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,vue,tsx}"],
  prefix: "tw-",
  important: "#html-body",
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter", sans-serif',
          {
            // fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"slnt" 0',
          },
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
  },
  plugins: [
    containerQueries,
    plugin(({ addVariant }) => {
      addVariant("light", `.light &`);
    }),
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
    plugin(function ({ addVariant }) {
      addVariant("hocus-visible", ["&:hover", "&:focus-visible"]);
    }),
  ],
};

export default config;
