import { getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import { ModalProvider } from "@/context/ModalContext";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/FooterSection";
import MobileActionButton from "@/components/ui/MobileActionButton";
import LocaleChrome from "@/components/layout/LocaleChrome";
// import Preloader from "@/components/Preloader";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  return (
    <NextIntlClientProvider locale={locale}>
      <ModalProvider modals={siteData.modals} locale={locale}>
        <LocaleChrome
          navbar={
            <Navbar navData={siteData.navigation} contactsData={siteData.contacts} locale={locale} />
          }
          mobileAction={<MobileActionButton contactsData={siteData.contacts} />}
          footer={
            <Footer
              footerData={siteData.footer}
              contactsData={siteData.contacts}
              navData={siteData.navigation}
              workingTimeData={siteData.working_time}
              locale={locale}
            />
          }
        >
          {children}
        </LocaleChrome>
      </ModalProvider>
    </NextIntlClientProvider>
  );
}
