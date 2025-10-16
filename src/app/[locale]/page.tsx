import { useTranslations } from "next-intl";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/FooterSection";
import Contacts from "@/components/sections/ContactsSection";
import HeroSection from "@/components/sections/HeroSection";
import BarberRibbons from "@/components/sections/BarberRibbons";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <BarberRibbons />
      <ServicesSection />
      <AboutSection />
      <Contacts />
      <Footer />
    </div>
  );
}
