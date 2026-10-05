import { describe, expect, test } from "vitest";
import { formatFCFA } from "@/lib/format";

const nbsp = " ";

describe("formatFCFA", () => {
  test("sépare les milliers et ajoute FCFA", () => {
    expect(formatFCFA(3000)).toBe(`3${nbsp}000${nbsp}FCFA`);
    expect(formatFCFA(1250000)).toBe(`1${nbsp}250${nbsp}000${nbsp}FCFA`);
  });

  test("laisse les petits montants intacts", () => {
    expect(formatFCFA(500)).toBe(`500${nbsp}FCFA`);
    expect(formatFCFA(0)).toBe(`0${nbsp}FCFA`);
  });

  test("gère les montants négatifs", () => {
    expect(formatFCFA(-3000)).toBe(`-3${nbsp}000${nbsp}FCFA`);
  });

  test("refuse les montants non entiers", () => {
    expect(() => formatFCFA(12.5)).toThrow();
  });
});
