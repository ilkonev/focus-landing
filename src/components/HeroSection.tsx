import PhoneMockup from "./PhoneMockup";
import { useSectionView } from "@/hooks/use-analytics";
import { trackLinkClick } from "@/lib/analytics";

const HeroSection = () => {
  const sectionRef = useSectionView('Hero');

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="section-container relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] animate-fade-in-up tracking-tight">
                <span className="text-foreground">Время под контролем</span>
                <br />
                <span className="text-gradient">внимание в фокусе</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up-delay-1 leading-relaxed">
                Персональный ИИ-помощник, который превращает управление экранным временем в осознанную игру. 
                Адаптивная аналитика и мягкая мотивация без стресса.
              </p>
            </div>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 animate-fade-in-up-delay-2 group"
              onClick={() => trackLinkClick('Узнать больше', '#how-it-works', 'hero')}
            >
              Узнать больше
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up-delay-2">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
