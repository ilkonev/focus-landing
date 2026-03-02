import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import { trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

const YM_COUNTER_ID = 107069895;

// Компонент для отслеживания изменений маршрута
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
    // Просмотр страницы в Яндекс.Метрике при смене маршрута (SPA)
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(YM_COUNTER_ID, 'hit', path, { title });
    }
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
