import ReactGA from 'react-ga4';

export type AnalyticsEvent =
  | 'form_start'
  | 'form_submit'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'section_view'
  | 'link_click'
  | 'cta_click'
  | 'faq_open'
  | 'scroll_depth'
  | 'time_on_page'
  | 'page_view';

export interface AnalyticsEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export const initAnalytics = () => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('GA4 Measurement ID не настроен. Аналитика не будет работать.');
    return;
  }

  ReactGA.initialize(measurementId, {
    testMode: import.meta.env.DEV,
  });

  // Отправляем событие о первом просмотре страницы
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const trackEvent = (
  eventName: AnalyticsEvent,
  params?: AnalyticsEventParams
) => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  
  if (!measurementId) {
    return;
  }

  ReactGA.event(eventName, params);
};

export const trackPageView = (path: string, title?: string) => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  
  if (!measurementId) {
    return;
  }

  ReactGA.send({ 
    hitType: 'pageview', 
    page: path,
    title: title || document.title
  });
};

export const trackFormStart = (formType: 'hero' | 'cta') => {
  trackEvent('form_start', {
    event_category: 'form',
    event_label: formType,
    form_type: formType,
  });
};

export const trackFormSubmit = (formType: 'hero' | 'cta', success: boolean, error?: string) => {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', {
    event_category: 'form',
    event_label: formType,
    form_type: formType,
    error_message: error,
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
    section_name: sectionName,
  });
};

export const trackLinkClick = (linkText: string, linkUrl: string, linkLocation: string) => {
  trackEvent('link_click', {
    event_category: 'navigation',
    event_label: linkText,
    link_url: linkUrl,
    link_location: linkLocation,
  });
};

export const trackCTAClick = (ctaText: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaText,
    cta_location: ctaLocation,
  });
};

export const trackFAQOpen = (question: string) => {
  trackEvent('faq_open', {
    event_category: 'engagement',
    event_label: question,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
  });
};

export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    value: seconds,
  });
};

