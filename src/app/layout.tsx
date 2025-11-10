import { PageProps } from "@/lib/pageUtils";
import { Inter, Libre_Bodoni, Merriweather } from "next/font/google";
import "./globals.css";
import "./liquidGlass.css";
import { getSEOData } from "@/lib/getSEOData";
import Script from "next/script";
import Preloader from "@/components/Preloader";

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

export async function generateMetadata({ params }: PageProps) {
  const { locale } = params;
  return getSEOData(locale);
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "lv" | "en" | "ru" };
}) {
  return (
    <html
      lang={params.locale}
      className={`${merriweather.variable} ${inter.variable} ${libreBodoni.variable} bg-white text-foreground scroll-smooth overflow-y-scroll [scrollbar-gutter:stable]`}
    >
      <body>
        <Preloader />
        {children}

        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Barbershop",
              name: "88 Barber shop Riga",
              image: "https://88barbershop.lv/og-image.jpg",
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "395",
              },
              url:
                params.locale === "lv"
                  ? "https://88barbershop.lv"
                  : `https://88barbershop.lv/${params.locale}`,
            }),
          }}
        />
      </body>
    </html>
  );
}
