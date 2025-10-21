import Contacts from "@/components/sections/ContactsSection";
import HeroSection from "@/components/sections/HeroSection";
import BarberRibbons from "@/components/sections/BarberRibbons";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import MobileActionButton from "@/components/ui/MobileActionButton";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <BarberRibbons />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <MobileActionButton />
      <Contacts />
    </div>
  );
}
