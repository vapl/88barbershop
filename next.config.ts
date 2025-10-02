import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// pasaki pluginam, kur atrodas request.ts
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // šeit var atstāt citas Next.js opcijas, piemēram images, reactStrictMode utt.
};

export default withNextIntl(nextConfig);
