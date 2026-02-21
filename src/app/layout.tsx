import { Inter, Libre_Bodoni, Merriweather } from "next/font/google";
import "./globals.css";
import "./liquidGlass.css";
import Script from "next/script";
import { cookies, headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-bodoni",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-merriweather",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-next-intl-locale");
  const localeCookie = (await cookies()).get("NEXT_LOCALE")?.value;
  const localeValue = localeHeader || localeCookie || "lv";
  const lang = localeValue === "lv" || localeValue === "en" || localeValue === "ru" ? localeValue : "lv";

  return (
    <html
      lang={lang}
      className={`${merriweather.variable} ${inter.variable} ${libreBodoni.variable} bg-white text-foreground scroll-smooth overflow-y-scroll [scrollbar-gutter:stable]`}
    >
      <body>
        {children}
        <Analytics />

        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Barbershop",
              name: "88 Barber shop Riga",
              image: "https://88barbershop.lv/og-image.jpeg",
              telephone: "+37128816466",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Akmeņu iela 16",
                addressLocality: "Rīga",
                postalCode: "LV-1048",
                addressCountry: "LV",
              },
              openingHours: "Mo-Sa 09:00-20:00",
              sameAs: [
                "https://www.instagram.com/barbershop88.lv/",
                "https://www.facebook.com/88barbershoplv",
              ],
              url: "https://88barbershop.lv",
            }),
          }}
        />
      </body>
    </html>
  );
}
