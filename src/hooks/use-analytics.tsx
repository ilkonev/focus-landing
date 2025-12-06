import { useEffect, useRef } from 'react';
import { trackSectionView, trackScrollDepth, trackTimeOnPage } from '@/lib/analytics';

// Хук для отслеживания просмотра секции
export const useSectionView = (sectionName: string, threshold: number = 0.2) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          trackSectionView(sectionName);
          hasTracked.current = true;
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionName, threshold]);

  return sectionRef;
};

// Хук для отслеживания глубины прокрутки
export const useScrollDepth = () => {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Отслеживаем каждые 25% прокрутки
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackScrollDepth(milestone);
          trackedDepths.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Хук для отслеживания времени на странице
export const useTimeOnPage = () => {
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0) {
        trackTimeOnPage(timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
};

