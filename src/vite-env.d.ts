/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer?: unknown[];
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export {};
