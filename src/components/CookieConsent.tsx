import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/98 backdrop-blur-sm">
      <div className="section-container max-w-lg text-center space-y-8 p-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Cookie className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Использование cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Мы используем cookies и Яндекс Метрику для аналитики и улучшения работы сайта. 
            Продолжая использование сайта, вы соглашаетесь с этим.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleAccept}
            size="lg"
            className="rounded-full px-8 font-semibold"
          >
            Принять
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-full px-8 font-semibold"
          >
            <Link to="/privacy">Политика конфиденциальности</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};