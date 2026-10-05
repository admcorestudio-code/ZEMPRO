import { formatFCFA } from "@/lib/format";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="rounded-full border border-primary/40 px-4 py-1 text-sm text-primary">
        Bientôt disponible
      </p>
      <h1 className="text-5xl font-bold tracking-tight">
        ZEM<span className="text-primary">PRO</span>
      </h1>
      <p className="max-w-md text-lg text-foreground/80">
        Un casque propre à chaque course. Désinfection aux UV en station pour
        les conducteurs de taxi-moto.
      </p>
      <p className="text-accent">
        Dès {formatFCFA(500)} le nettoyage, ou {formatFCFA(3000)} par mois.
      </p>
    </main>
  );
}
