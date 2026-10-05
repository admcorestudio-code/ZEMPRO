const STEPS = [
  {
    title: "Passe à une station ZEMPRO",
    text: "Gare-toi à la station la plus proche, entre deux courses.",
  },
  {
    title: "Ton casque passe aux UV",
    text: "La machine désinfecte l'intérieur du casque par lumière ultraviolette, sans produit chimique.",
  },
  {
    title: "Tu repars avec un casque propre",
    text: "Ton client monte rassuré, et toi tu roules l'esprit tranquille.",
  },
];

export function Steps() {
  return (
    <section id="comment" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16">
      <h2 className="text-center text-3xl font-bold">Comment ça marche</h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-foreground/70">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
