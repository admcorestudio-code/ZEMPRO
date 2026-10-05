import { formatFCFA } from "@/lib/format";
import {
  SUBSCRIPTION_CLEANINGS,
  SUBSCRIPTION_PRICE_XOF,
  UNIT_PRICE_XOF,
} from "@/lib/offers";

const QUESTIONS = [
  {
    q: "Comment fonctionne la désinfection aux UV ?",
    a: "La machine éclaire l'intérieur du casque avec une lumière ultraviolette (UV-C), utilisée pour désinfecter les surfaces sans eau ni produit chimique. Ton casque reste sec et prêt à porter.",
  },
  {
    q: "Combien ça coûte ?",
    a: `${formatFCFA(UNIT_PRICE_XOF)} le nettoyage à l'unité, ou ${formatFCFA(SUBSCRIPTION_PRICE_XOF)} par mois pour ${SUBSCRIPTION_CLEANINGS} nettoyages avec l'abonnement.`,
  },
  {
    q: "Comment je paie ?",
    a: "À l'unité, tu paies sur place en espèces ou par Mobile Money. L'abonnement se paie par Mobile Money (T-Money ou Flooz).",
  },
  {
    q: "Où sont les stations ?",
    a: "La liste des stations arrive bientôt sur le site. En attendant, écris-nous sur WhatsApp pour connaître la station la plus proche.",
  },
  {
    q: "C'est quoi le parrainage ?",
    a: "Chaque conducteur inscrit reçoit un code de parrainage à partager avec ses collègues. Les meilleurs parrains de chaque zone apparaissent au classement de leur communauté.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-16">
      <h2 className="text-center text-3xl font-bold">Questions fréquentes</h2>
      <div className="mt-10 space-y-3">
        {QUESTIONS.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {item.q}
              <span
                aria-hidden="true"
                className="text-2xl text-primary transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-foreground/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
