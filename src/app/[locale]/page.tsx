import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/FooterSection";
import Contacts from "@/components/sections/ContactsSection";
import HeroSection from "@/components/sections/HeroSection";
import BarberRibbons from "@/components/sections/BarberRibbons";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <BarberRibbons />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <Contacts />
      <Footer />
    </div>
  );
}
