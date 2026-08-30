import Navbar from "@/components/cosmo/Navbar";
import Hero from "@/components/cosmo/Hero";
import Catalog from "@/components/cosmo/Catalog";
import Benefits from "@/components/cosmo/Benefits";
import History from "@/components/cosmo/History";
import Videos from "@/components/cosmo/Videos";
import Flipbook from "@/components/cosmo/Flipbook";
import Testimonials from "@/components/cosmo/Testimonials";
import Faq from "@/components/cosmo/Faq";
import Instagram from "@/components/cosmo/Instagram";
import Contact from "@/components/cosmo/Contact";
import Footer from "@/components/cosmo/Footer";
import SoundButton from "@/components/cosmo/SoundButton";

export default function Home() {
  return (
    <div className="bg-[#f8f6ff] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Catalog />
      <Benefits />
      <History />
      <Videos />
      <Flipbook />
      <Testimonials />
      <Faq />
      <Instagram />
      <Contact />
      <Footer />
      <SoundButton />
    </div>
  );
}