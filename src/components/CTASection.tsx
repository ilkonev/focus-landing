import { Link } from "react-router-dom";
import { Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useSectionView } from "@/hooks/use-analytics";

const ANDROID_DOWNLOAD_URL = "https://disk.360.yandex.ru/d/RZDeqwglGkVtqw";

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

  const visible = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div ref={animationRef} className="max-w-2xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 transition-all duration-700 ${visible}`}
          >
            Скачать Focus
          </h2>

          <p
            className={`text-lg text-muted-foreground mb-12 transition-all duration-700 delay-100 ${visible}`}
          >
            Установите приложение и начните достигать целей уже сегодня.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 delay-200 ${visible}`}
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="gap-2.5 min-w-[200px] h-14 text-base shadow-lg hover:shadow-xl"
            >
              <a
                href={ANDROID_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="w-5 h-5" />
                Скачать для Android
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              disabled
              className="gap-2.5 min-w-[200px] h-14 text-base opacity-80 cursor-not-allowed"
            >
              <Smartphone className="w-5 h-5" />
              <span className="flex items-center gap-2">
                Скачать для iOS
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Скоро!
                </span>
              </span>
            </Button>
          </div>

          <div
            className={`flex items-center justify-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-300 ${visible}`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <Link
              to="/privacy"
              className="underline hover:no-underline hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
