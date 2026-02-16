import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InterfaceSection from "@/components/InterfaceSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { useScrollDepth, useTimeOnPage } from "@/hooks/use-analytics";

const Index = () => {
  // Отслеживаем глубину прокрутки и время на странице
  useScrollDepth();
  useTimeOnPage();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <ResultsSection />
        <HowItWorksSection />
        <InterfaceSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
