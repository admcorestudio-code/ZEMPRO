import { formatFCFA } from "@/lib/format";

export const UNIT_PRICE_XOF = 500;
export const SUBSCRIPTION_PRICE_XOF = 3000;
export const SUBSCRIPTION_CLEANINGS = 8;

export type Offer = {
  id: "unit" | "subscription";
  name: string;
  priceXof: number;
  period?: string;
  highlight?: string;
  features: string[];
};

export const OFFERS: Offer[] = [
  {
    id: "unit",
    name: "À l'unité",
    priceXof: UNIT_PRICE_XOF,
    features: [
      "Un nettoyage de casque",
      "Sans inscription",
      "Payé sur place, en espèces ou Mobile Money",
    ],
  },
  {
    id: "subscription",
    name: "Abonnement",
    priceXof: SUBSCRIPTION_PRICE_XOF,
    period: "mois",
    highlight: "Le plus avantageux",
    features: [
      `${SUBSCRIPTION_CLEANINGS} nettoyages par mois`,
      `Soit ${formatFCFA(SUBSCRIPTION_PRICE_XOF / SUBSCRIPTION_CLEANINGS)} le nettoyage`,
      "Payé par Mobile Money (T-Money ou Flooz)",
      "Suivi de tes nettoyages et code de parrainage",
    ],
  },
];
