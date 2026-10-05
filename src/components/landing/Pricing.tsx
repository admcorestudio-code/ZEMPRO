import { formatFCFA } from "@/lib/format";
import { OFFERS } from "@/lib/offers";

export function Pricing() {
  return (
    <section id="prix" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16">
      <h2 className="text-center text-3xl font-bold">Nos prix</h2>
      <p className="mt-2 text-center text-foreground/70">
        Simple et sans surprise.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {OFFERS.map((offer) => (
          <article
            key={offer.id}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              offer.highlight
                ? "border-primary bg-primary/5"
                : "border-foreground/10 bg-foreground/[0.03]"
            }`}
          >
            {offer.highlight && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-background">
                {offer.highlight}
              </span>
            )}
            <h3 className="text-lg font-semibold">{offer.name}</h3>
            <p className="mt-3">
              <span className="text-4xl font-bold">{formatFCFA(offer.priceXof)}</span>
              {offer.period && (
                <span className="text-foreground/70"> / {offer.period}</span>
              )}
            </p>
            <ul className="mt-6 space-y-3 text-foreground/80">
              {offer.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span aria-hidden="true" className="text-primary">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
