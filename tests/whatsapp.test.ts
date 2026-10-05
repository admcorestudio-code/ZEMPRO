import { describe, expect, test } from "vitest";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const text = encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);

describe("whatsappLink", () => {
  test("nettoie un numéro avec indicatif, espaces et +", () => {
    expect(whatsappLink("+228 90 12 34 56")).toBe(
      `https://wa.me/22890123456?text=${text}`,
    );
  });

  test("accepte le préfixe international 00", () => {
    expect(whatsappLink("00228-90-12-34-56")).toBe(
      `https://wa.me/22890123456?text=${text}`,
    );
  });

  test("sans numéro, ouvre WhatsApp avec le message seul", () => {
    expect(whatsappLink(undefined)).toBe(`https://wa.me/?text=${text}`);
    expect(whatsappLink("")).toBe(`https://wa.me/?text=${text}`);
  });

  test("encode un message personnalisé", () => {
    expect(whatsappLink("22890123456", "Salut & merci")).toBe(
      "https://wa.me/22890123456?text=Salut%20%26%20merci",
    );
  });
});
