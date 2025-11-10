import { PageProps, getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import { ModalProvider } from "@/context/ModalContext";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/FooterSection";
import MobileActionButton from "@/components/ui/MobileActionButton";

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: "lv" }, { locale: "en" }, { locale: "ru" }];
}

export default async function LocaleLayout({
  children,
  params,
}: PageProps & { children: React.ReactNode }) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  return (
    <NextIntlClientProvider locale={locale}>
      <ModalProvider modals={siteData.modals} locale={locale}>
        <div id="preloader" className="">
          <Navbar navData={siteData.navigation} contactsData={siteData.contacts} locale={locale} />
          {children}
          <MobileActionButton contactsData={siteData.contacts} />
          <Footer
            footerData={siteData.footer}
            contactsData={siteData.contacts}
            navData={siteData.navigation}
            workingTimeData={siteData.working_time}
            locale={locale}
          />
        </div>
      </ModalProvider>
    </NextIntlClientProvider>
  );
}
