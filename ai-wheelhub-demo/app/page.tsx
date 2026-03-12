import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-silver">
      <Navbar />
      <Hero />
      <Process />
      <Pricing />
      <FAQSection />
      <Footer />
    </main>
  );
}
