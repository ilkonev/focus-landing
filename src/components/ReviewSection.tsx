import { useEffect, useRef, useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-primary text-primary"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            Нравится Focus?
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Поделитесь впечатлениями — ваш отзыв помогает нам становиться лучше
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 h-12 px-8 text-base rounded-full border-primary/40 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
              >
                <MessageSquarePlus className="w-5 h-5" />
                Оставить отзыв
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl w-full p-0 overflow-hidden rounded-2xl">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-xl font-bold">Оставить отзыв</DialogTitle>
              </DialogHeader>
              <div className="px-4 pb-4 overflow-y-auto max-h-[80vh]">
                <iframe
                  src="https://forms.yandex.ru/cloud/6a1f09d6d0468837b819b05a?iframe=1"
                  frameBorder="0"
                  name="ya-form-6a1f09d6d0468837b819b05a"
                  width="100%"
                  height="650"
                  title="Оставить отзыв"
                  className="w-full border-0"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
