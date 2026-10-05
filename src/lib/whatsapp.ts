export const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour ZEMPRO, je veux faire nettoyer mon casque.";

/**
 * Construit un lien WhatsApp (wa.me) vers le numéro ZEMPRO avec un message prérempli.
 * Accepte un numéro avec espaces, tirets ou "+" ("+228 90 00 00 00").
 * Sans numéro valide, le lien ouvre WhatsApp pour choisir le destinataire.
 */
export function whatsappLink(
  phone: string | undefined,
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): string {
  const digits = (phone ?? "").replace(/\D/g, "").replace(/^00/, "");
  const text = encodeURIComponent(message);
  return digits.length >= 8
    ? `https://wa.me/${digits}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
