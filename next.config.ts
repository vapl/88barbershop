import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const baseConfig: NextConfig = {
  webpack(config) {
    // 🔹 Atrodam noklusēto noteikumu un izslēdzam SVG no fail-loader
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (arg0: string) => unknown } }) => rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 🔹 Pievienojam SVGR (SVG kā React komponenti)
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default withNextIntl(baseConfig);
