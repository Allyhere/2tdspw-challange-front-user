export const PHONE_AUTH_ERROR_FALLBACK =
  "Não foi possível autenticar. Tente novamente.";

export const PHONE_AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-verification-code": "Código inválido.",
  "auth/code-expired": "Este código expirou. Peça outro.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde e tente novamente.",
  "auth/invalid-phone-number": "Este celular não é válido.",
  "auth/captcha-check-failed":
    "Não foi possível confirmar que você não é um robô.",
  "auth/billing-not-enabled":
    "Ative o faturamento do Firebase (plano Blaze) para enviar o código.",
};
