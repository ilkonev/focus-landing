import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InterfaceSection from "@/components/InterfaceSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";

const Index = () => {
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
        <ReviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
