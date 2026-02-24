const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const isEnabled = (): boolean =>
  typeof window !== 'undefined' && typeof window.gtag === 'function' && Boolean(MEASUREMENT_ID);

const send = (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (!isEnabled() || !MEASUREMENT_ID) return;
  window.gtag!('event', eventName, {
    send_to: MEASUREMENT_ID,
    ...params,
  });
};

/** Загружает gtag.js и инициализирует GA4. Вызывать один раз при старте приложения. */
export const initAnalytics = (): void => {
  if (typeof window === 'undefined' || !MEASUREMENT_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
};

/** Просмотр страницы — основа для подсчёта посетителей и сессий. */
export const trackPageView = (path: string, title?: string): void => {
  if (!isEnabled() || !MEASUREMENT_ID) return;
  window.gtag!('config', MEASUREMENT_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
};

/** Клик по кнопке «Подать заявку» / «Получить доступ» / «Оставить заявку». */
export const trackCTAClick = (buttonText: string, placement: string): void => {
  send('cta_apply_click', { button_text: buttonText, placement });
};

/** Клик по ссылке или кнопке в footer (Telegram, Email, Политика, Поддержать). */
export const trackFooterClick = (
  linkId: string,
  linkText: string,
  linkUrl: string
): void => {
  send('footer_click', {
    link_id: linkId,
    link_text: linkText,
    link_url: linkUrl,
  });
};

/** Время нахождения на странице перед уходом (секунды). */
export const trackTimeOnPage = (durationSeconds: number): void => {
  send('time_on_page', { duration_seconds: durationSeconds });
};

// ——— Остальные события (совместимость с существующим кодом) ———

export const trackFormStart = (formPlacement: 'hero' | 'cta'): void => {
  send('form_start', { form_placement: formPlacement });
};

export const trackFormSubmit = (
  formPlacement: 'hero' | 'cta',
  success: boolean,
  errorMessage?: string
): void => {
  send('form_submit', {
    form_placement: formPlacement,
    success,
    ...(errorMessage && { error_message: errorMessage }),
  });
};

export const trackSectionView = (sectionId: string): void => {
  send('section_view', { section_id: sectionId });
};

export const trackLinkClick = (linkText: string, linkUrl: string, linkPlacement: string): void => {
  send('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_placement: linkPlacement,
  });
};

export const trackFAQOpen = (questionText: string): void => {
  send('faq_open', { question: questionText });
};

export const trackScrollDepth = (depthPercent: number): void => {
  send('scroll_depth', { depth_percent: depthPercent });
};

export type AnalyticsEvent =
  | 'form_start'
  | 'form_submit'
  | 'section_view'
  | 'link_click'
  | 'cta_apply_click'
  | 'footer_click'
  | 'faq_open'
  | 'scroll_depth'
  | 'time_on_page'
  | 'page_view';

export interface AnalyticsEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: string, params?: AnalyticsEventParams): void => {
  if (!params) {
    send(eventName);
    return;
  }
  const clean: Record<string, string | number | boolean> = {};
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && typeof v !== 'object') {
      clean[k] = v as string | number | boolean;
    }
  });
  send(eventName, clean);
};
