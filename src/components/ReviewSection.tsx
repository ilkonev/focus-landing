import { useEffect, useRef, useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const REVIEW_URL = "https://forms.yandex.ru/cloud/6a1f09d6d0468837b819b05a";

const ReviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visible = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <section className="py-16 sm:py-20 bg-secondary/30 border-t border-border">
      <div className="section-container">
        <div
          ref={sectionRef}
          className={`max-w-xl mx-auto text-center transition-all duration-700 ${visible}`}
        >
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            Нравится Focus?
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Поделитесь впечатлениями — ваш отзыв помогает нам становиться лучше
          </p>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 h-12 px-8 text-base rounded-full border-primary/40 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
          >
            <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <MessageSquarePlus className="w-5 h-5" />
              Оставить отзыв
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
