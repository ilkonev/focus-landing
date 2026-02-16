import { BarChart3, Target, Lightbulb, TrendingUp, Trophy, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSectionView } from "@/hooks/use-analytics";

const screens = [
  {
    title: "Статистика",
    content: (
      <div className="p-4 space-y-4 bg-background h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">Экранное время</span>
          <span className="text-xs text-primary font-semibold">–23%</span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Instagram", time: "45 мин", progress: 60, color: "bg-pink-500" },
            { name: "YouTube", time: "1ч 20м", progress: 80, color: "bg-red-500" },
            { name: "Telegram", time: "30 мин", progress: 40, color: "bg-primary" },
          ].map((app, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-foreground font-medium">{app.name}</span>
                <span className="text-muted-foreground">{app.time}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${app.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${app.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 flex items-center gap-2 border-t border-border">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">Подробная аналитика</span>
        </div>
      </div>
    ),
  },
  {
    title: "Челленджи",
    content: (
      <div className="p-4 space-y-4 bg-background h-full">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-3 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-primary font-semibold uppercase">Челлендж дня</p>
              <p className="text-sm text-foreground font-medium">Без соцсетей до 12:00</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { text: "Лимит YouTube: 1 час", done: true },
            { text: "30 мин фокус-сессии", done: false },
            { text: "Вечерний детокс", done: false },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
              <div className={`w-5 h-5 rounded-full border-2 ${task.done ? 'bg-success border-success' : 'border-muted-foreground'} flex items-center justify-center`}>
                {task.done && <span className="text-[10px] text-success-foreground">✓</span>}
              </div>
              <span className={`text-sm ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">1 из 3 целей</span>
        </div>
      </div>
    ),
  },
  {
    title: "Рекомендации",
    content: (
      <div className="p-4 space-y-3 bg-background h-full">
        {[
          { 
            icon: Lightbulb, 
            title: "Пиковое время", 
            text: "Попробуйте прогулку в 14:00",
            color: "text-warning",
            bg: "bg-warning/10"
          },
          { 
            icon: TrendingUp, 
            title: "Отличный прогресс", 
            text: "–18% за неделю!",
            color: "text-success",
            bg: "bg-success/10"
          },
          { 
            icon: Zap, 
            title: "Новый уровень", 
            text: "До 13 уровня: 120 очков",
            color: "text-primary",
            bg: "bg-primary/10"
          },
        ].map((item, i) => (
          <div key={i} className="bg-secondary/50 rounded-2xl p-4 hover:bg-secondary transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const InterfaceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useSectionView('Interface');
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
    <section id="interface" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-secondary/30">
      <div className="section-container">
        <div ref={animationRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Красота в <span className="text-gradient">простоте</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Чистый интерфейс и визуализация прогресса — все для вашего комфорта
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {screens.map((screen, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Phone mockup */}
              <div className="group relative">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75" />
                
                <div className="relative w-[200px] h-[380px] md:w-[220px] md:h-[420px] rounded-[2.5rem] bg-foreground p-1.5 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Screen */}
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-background">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
                      <div className="w-5 h-2.5 bg-foreground rounded-sm" />
                    </div>
                    
                    {/* Screen content */}
                    {screen.content}
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-background/30 rounded-full" />
                </div>
              </div>
              
              {/* Label */}
              <div className="text-center mt-6">
                <h3 className="font-bold text-lg text-foreground">{screen.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterfaceSection;
