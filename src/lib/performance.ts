// Утилиты для отслеживания производительности

// Отслеживание метрик производительности
export const trackPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  // Ждем загрузки всех ресурсов
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Time to First Byte (TTFB)
        const ttfb = navigation.responseStart - navigation.requestStart;
        
        // First Contentful Paint (FCP)
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        const fcp = fcpEntry ? fcpEntry.startTime : 0;
        
        // Largest Contentful Paint (LCP)
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        const lcp = lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
        
        // Total Blocking Time (TBT) - упрощенная версия
        const longTasks = performance.getEntriesByType('longtask');
        const tbt = longTasks.reduce((acc, task) => acc + (task.duration - 50), 0);
        
        // Cumulative Layout Shift (CLS)
        let cls = 0;
        const layoutShiftEntries = performance.getEntriesByType('layout-shift') as PerformanceEntry[];
        layoutShiftEntries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        
        // Отправляем метрики в консоль (можно расширить для отправки в аналитику)
        console.log('Performance Metrics:', {
          ttfb: Math.round(ttfb),
          fcp: Math.round(fcp),
          lcp: Math.round(lcp),
          tbt: Math.round(tbt),
          cls: cls.toFixed(3),
        });
        
        // Можно добавить отправку в Google Analytics через Custom Events
        // trackEvent('performance_metric', {
        //   metric_name: 'ttfb',
        //   value: Math.round(ttfb),
        // });
      }
    }, 2000); // Даем время на сбор всех метрик
  });
};

// Отслеживание ошибок загрузки ресурсов
export const trackResourceErrors = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('error', (event) => {
    if (event.target && (event.target as HTMLElement).tagName) {
      const target = event.target as HTMLElement;
      console.error('Resource Error:', {
        tag: target.tagName,
        src: (target as HTMLImageElement).src || (target as HTMLLinkElement).href,
        error: event.message,
      });
    }
  }, true);
};

