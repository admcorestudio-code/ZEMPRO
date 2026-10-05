import { Faq } from "@/components/landing/Faq";
import { Pricing } from "@/components/landing/Pricing";
import { Steps } from "@/components/landing/Steps";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { formatFCFA } from "@/lib/format";
import { UNIT_PRICE_XOF } from "@/lib/offers";

function Logo() {
  return (
    <span className="text-2xl font-bold tracking-tight">
      ZEM<span className="text-primary">PRO</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#" aria-label="ZEMPRO, retour en haut">
            <Logo />
          </a>
          <div className="flex items-center gap-5 text-sm text-foreground/80">
            <a href="#comment" className="hidden hover:text-primary sm:inline">
              Comment ça marche
            </a>
            <a href="#prix" className="hover:text-primary">
              Prix
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center sm:pt-24">
          <p className="rounded-full border border-primary/40 px-4 py-1 text-sm text-primary">
            Désinfection de casques aux UV
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Un casque propre <span className="text-primary">à chaque course</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">
            ZEMPRO désinfecte les casques des conducteurs de taxi-moto avec des
            machines UV, directement en station. Ton client monte rassuré.
          </p>
          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <WhatsAppButton />
            <a
              href="#prix"
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 font-semibold transition hover:border-primary hover:text-primary"
            >
              Voir les prix
            </a>
          </div>
          <p className="mt-6 text-accent">
            À partir de {formatFCFA(UNIT_PRICE_XOF)} le nettoyage
          </p>
        </section>

        <Steps />
        <Pricing />
        <Faq />

        <section className="mx-auto w-full max-w-5xl px-4 pt-8 pb-24">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-primary/10 px-6 py-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Prêt à rouler avec un casque propre ?
            </h2>
            <p className="max-w-md text-foreground/80">
              Écris-nous sur WhatsApp : on t&apos;indique la station la plus proche.
            </p>
            <WhatsAppButton />
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/10 px-4 py-8 text-center text-sm text-foreground/60">
        <Logo />
        <p className="mt-2">© {new Date().getFullYear()} ZEMPRO · Togo</p>
      </footer>

      <WhatsAppButton variant="floating" />
    </>
  );
}
