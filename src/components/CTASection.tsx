import { Link } from "react-router-dom";
import YandexFormEmbed from "./YandexFormEmbed";
import { Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSectionView } from "@/hooks/use-analytics";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useSectionView('CTA');
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div ref={animationRef} className="max-w-2xl mx-auto text-center">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Готовы начать?
          </h2>
          
          <p 
            className={`text-lg text-muted-foreground mb-10 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Присоединяйтесь к первым пользователям Focus. 
            Оставьте заявку для получения раннего доступа.
          </p>

          <div 
            className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <YandexFormEmbed />
          </div>

          <div 
            className={`flex items-center justify-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <Link to="/privacy" className="underline hover:no-underline hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
