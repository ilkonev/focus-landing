// Заглушки аналитики (ранее использовался GA4). Вызовы сохранены для совместимости.

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

export const initAnalytics = () => {};

export const trackEvent = (_eventName: AnalyticsEvent, _params?: AnalyticsEventParams) => {};

export const trackPageView = (_path: string, _title?: string) => {};

export const trackFormStart = (_formType: 'hero' | 'cta') => {};

export const trackFormSubmit = (_formType: 'hero' | 'cta', _success: boolean, _error?: string) => {};

export const trackSectionView = (_sectionName: string) => {};

export const trackLinkClick = (_linkText: string, _linkUrl: string, _linkLocation: string) => {};

export const trackCTAClick = (_ctaText: string, _ctaLocation: string) => {};

export const trackFAQOpen = (_question: string) => {};

export const trackScrollDepth = (_depth: number) => {};

export const trackTimeOnPage = (_seconds: number) => {};
