import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HomePage from "@/app/(marketing)/page";

afterEach(cleanup);

test("la page d'accueil présente l'offre", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Un casque propre",
  );
  for (const title of ["Comment ça marche", "Nos prix", "Questions fréquentes"]) {
    expect(screen.getByRole("heading", { level: 2, name: title })).toBeDefined();
  }
});

test("les cartes de prix affichent 500 FCFA et 3 000 FCFA par mois", () => {
  render(<HomePage />);
  const prices = screen.getByRole("heading", { level: 2, name: "Nos prix" })
    .parentElement?.textContent ?? "";
  expect(prices).toContain("500 FCFA");
  expect(prices).toContain("3 000 FCFA / mois");
  expect(prices).toContain("8 nettoyages par mois");
});

test("les boutons WhatsApp pointent vers wa.me", () => {
  render(<HomePage />);
  const links = screen.getAllByRole("link", { name: /WhatsApp/ });
  expect(links.length).toBeGreaterThanOrEqual(2);
  for (const link of links) {
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
  }
});
