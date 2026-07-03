import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteForm } from "@/components/QuoteForm";
import { WhyChooseSolar } from "@/components/WhyChooseSolar";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 sm:pb-0">
        <Hero />
        <QuoteForm />
        <WhyChooseSolar />
        <HowItWorks />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
