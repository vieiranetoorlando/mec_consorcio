const WHATSAPP_PHONE = "5511999999999";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export { WHATSAPP_PHONE };
