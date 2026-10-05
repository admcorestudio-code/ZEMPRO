import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HomePage from "@/app/(marketing)/page";

afterEach(cleanup);

test("la page d'accueil affiche le nom et les prix", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("ZEMPRO");
  const text = screen.getByRole("main").textContent ?? "";
  expect(text).toContain("500 FCFA");
  expect(text).toContain("3 000 FCFA");
});
