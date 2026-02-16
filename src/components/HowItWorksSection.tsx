import { BarChart3, Gamepad2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSectionView } from "@/hooks/use-analytics";
import { trackCTAClick } from "@/lib/analytics";

const features = [
  {
    icon: BarChart3,
    title: "Научный подход",
    description: "Focus основан на исследованиях поведенческой психологии. ИИ отслеживает паттерны поведения и помогает укреплять фокус.",
    number: "01",
  },
  {
    icon: Gamepad2,
    title: "Мотивация через игру",
    description: "Рейтинги, уровни и челленджи, которые мотивируют соблюдать собственные ограничения и добиваться целей.",
    number: "02",
  },
  {
    icon: Sparkles,
    title: "Индивидуальный подход",
    description: "Focus подстраивается под ваш ритм жизни. Вы выбираете уровень контроля — от подсказок до строгого режима.",
    number: "03",
  },
];

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useSectionView('HowItWorks');
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
    <section id="how-it-works" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div ref={animationRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Технологии на страже{" "}
            <span className="text-gradient">вашего внимания</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="card-interactive p-6 sm:p-8 h-full">
                {/* Number badge */}
                <span className="text-6xl font-extrabold text-primary/10 absolute top-6 right-6 transition-all duration-300 group-hover:text-primary/20">
                  {feature.number}
                </span>
                
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div 
          className={`flex justify-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold"
          >
            <a href="#cta" onClick={() => trackCTAClick('Оставить заявку', 'how-it-works')}>
              Оставить заявку
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
