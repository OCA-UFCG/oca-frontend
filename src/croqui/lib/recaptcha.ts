// Lazy loader for Google reCAPTCHA v2 (checkbox). The script is injected once;
// the widget itself is rendered by the ExportModal. Only the public Site Key
// touches the client — the Secret stays server-side (in the Apps Script).

interface Grecaptcha {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      size?: "normal" | "compact" | "invisible";
      theme?: "light" | "dark";
    },
  ) => number;
  reset: (id?: number) => void;
  getResponse: (id?: number) => string;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<Grecaptcha> | null = null;

export function loadRecaptcha(): Promise<Grecaptcha> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<Grecaptcha>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha);

      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("Falha ao carregar o reCAPTCHA."));
    s.onload = () => {
      // grecaptcha.render may not exist for a tick after onload — poll briefly.
      const start = Date.now();
      const t = window.setInterval(() => {
        if (window.grecaptcha?.render) {
          window.clearInterval(t);
          resolve(window.grecaptcha);
        } else if (Date.now() - start > 10000) {
          window.clearInterval(t);
          reject(new Error("reCAPTCHA não inicializou."));
        }
      }, 50);
    };
    document.head.appendChild(s);
  });

  return scriptPromise;
}
