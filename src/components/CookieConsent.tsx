import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "cookie_consent";
const YM_ID = 107069895;

function loadYandexMetrika() {
  if ((window as any).__ymLoaded) return;
  (window as any).__ymLoaded = true;

  // Create the ym queue function so calls before script load are buffered
  (window as any).ym =
    (window as any).ym ||
    function (...args: unknown[]) {
      ((window as any).ym.a = (window as any).ym.a || []).push(args);
    };
  (window as any).ym.l = Date.now();

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`;
  script.onload = () => {
    window.ym!(YM_ID, "init", {
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true,
    });
    // Track initial page view (missed because YM loaded after navigation)
    window.ym!(YM_ID, "hit", window.location.pathname + window.location.search);
  };
  document.head.appendChild(script);
}

function clearYMCookies() {
  const names = ["_ym_uid", "_ym_d", "_ym_isad", "_ym_visorc", "_ym_wv2", "_ym_mp2_subhit"];
  const host = window.location.hostname;
  names.forEach((name) => {
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    document.cookie = `${expired}; domain=${host}`;
    document.cookie = `${expired}; domain=.${host}`;
  });
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted" || consent === "true") {
      loadYandexMetrika();
    } else if (!consent) {
      setShowBanner(true);
    }

    const handleShowBanner = () => setShowBanner(true);
    window.addEventListener("show-cookie-banner", handleShowBanner);
    return () => window.removeEventListener("show-cookie-banner", handleShowBanner);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);
    loadYandexMetrika();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShowBanner(false);
    clearYMCookies();
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
            Мы используем cookies и Яндекс.Метрику для аналитики, включая
            запись сессий (движения мыши, клики, скроллы). Без вашего согласия
            данные не собираются.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={handleAccept}
            size="lg"
            className="rounded-full px-8 font-semibold w-full sm:w-auto"
          >
            Принять
          </Button>
          <Button
            onClick={handleDecline}
            variant="secondary"
            size="lg"
            className="rounded-full px-8 font-semibold w-full sm:w-auto"
          >
            Отклонить
          </Button>
        </div>

        <Link
          to="/privacy"
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Политика конфиденциальности
        </Link>
      </div>
    </div>
  );
};
