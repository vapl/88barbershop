import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/FooterSection";
import MobileActionButton from "@/components/ui/MobileActionButton";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <Navbar />
      {children}
      <MobileActionButton />
      <Footer />
    </NextIntlClientProvider>
  );
}
