// Onde cada export é registrado: a URL do Web App do Google Apps Script
// (termina em "/exec"). Veja scripts/sheets_webhook.gs para publicar.
//
// Cole a URL abaixo OU defina NEXT_PUBLIC_EXPORT_WEBHOOK_URL no ambiente.
// Vazio = salvamento desligado (o PDF continua exportando normalmente).

export const EXPORT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_EXPORT_WEBHOOK_URL?.trim() ||
  "https://script.google.com/macros/s/AKfycbwCr-AGEWjy03YQesGmvk5d3T0n_u5S86Y5y8hHVjdnConJKy5cH_GLApnqCvJAAQI/exec";

// Token compartilhado opcional; precisa bater com TOKEN no sheets_webhook.gs.
// Vazio = sem checagem de token.
export const EXPORT_TOKEN = process.env.NEXT_PUBLIC_EXPORT_TOKEN?.trim() || "";

// reCAPTCHA v2 (checkbox) — Site Key (PÚBLICA, pode ficar no cliente).
// Crie em https://www.google.com/recaptcha/admin e registre os domínios
// (localhost + o domínio do onrender). A chave SECRETA NÃO vai aqui — ela fica
// em Script Properties (RECAPTCHA_SECRET) no Apps Script (lado servidor).
// Vazio = sem captcha (o app funciona normalmente).
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ||
  "6LdvtQ4tAAAAALbArC4ic_nYbvqq5YrxFcalivwQ";
