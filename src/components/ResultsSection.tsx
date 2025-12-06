import { TrendingDown, TrendingUp, Zap, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSectionView } from "@/hooks/use-analytics";

const stats = [
  {
    icon: TrendingDown,
    value: "–25%",
    label: "лишнего экранного времени",
    description: "Мягкие ограничения и постепенная корректировка привычек",
  },
  {
    icon: TrendingUp,
    value: "+18%",
    label: "целей",
    description: "ИИ-анализ усиливает ваши собственные намерения",
  },
  {
    icon: Zap,
    value: "–25%",
    label: "случайных открытий",
    description: "Рейтинг дня и микро-цели снижают автоматические действия",
  },
  {
    icon: Users,
    value: "70%",
    label: "соблюдают собственные лимиты без напоминаний",
    description: "Естественное ощущение контроля вместо давления",
  },
];

const ResultsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useSectionView('Results');
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
    <section id="results" ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="section-container">
        <div ref={animationRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Осознанное использование — это{" "}
            <span className="text-gradient">привычка</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            которую можно развить
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`card-interactive p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              
              <div className="text-4xl font-extrabold text-foreground mb-2">
                {stat.value}
              </div>
              
              <h3 className="text-foreground font-semibold mb-2">
                {stat.label}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
