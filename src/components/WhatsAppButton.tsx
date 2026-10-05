import { whatsappLink, ZEMPRO_WHATSAPP_NUMBER } from "@/lib/whatsapp";

type Props = {
  label?: string;
  variant?: "solid" | "floating";
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.25.69-1.44 1.32-1.98 1.37-.51.05-.99.24-3.33-.69-2.82-1.11-4.6-4-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.37.72-2.04.97-2.32.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.47.25.6.85 2.07.92 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.71-.18 1.4Z" />
    </svg>
  );
}

export function WhatsAppButton({ label = "Écrire sur WhatsApp", variant = "solid" }: Props) {
  const href = whatsappLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ZEMPRO_WHATSAPP_NUMBER,
  );

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-background shadow-lg shadow-black/40 transition hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-background transition hover:brightness-110"
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}
