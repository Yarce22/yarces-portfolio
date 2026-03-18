import type { ContactFormData } from "./contentful-types";

export function buildWhatsAppUrl(phone: string, data: ContactFormData): string {
  const message = `Hola! Soy ${data.nombre}.\n\nAsunto: ${data.asunto}\n\nMensaje: ${data.mensaje}\n\nEmail de contacto: ${data.email}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
