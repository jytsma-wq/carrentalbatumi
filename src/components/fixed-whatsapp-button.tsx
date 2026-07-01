import { whatsappHref } from "@/lib/env";
import type { Dictionary } from "@/i18n/dictionaries";

type FixedWhatsAppButtonProps = {
  labels: Dictionary["contactLinks"];
};

export function FixedWhatsAppButton({ labels }: FixedWhatsAppButtonProps) {
  return (
    <a
      aria-label={labels.whatsapp}
      className="fixed bottom-[5.5rem] right-4 z-40 grid size-14 place-items-center rounded-full bg-[#22c55e] text-white shadow-2xl shadow-emerald-900/20 ring-1 ring-white/70 transition hover:-translate-y-1 hover:bg-[#16a34a] focus:outline-none focus:ring-4 focus:ring-[#22c55e]/25 active:scale-95 md:bottom-6 md:right-6 md:size-16"
      href={whatsappHref()}
      rel="noreferrer"
      target="_blank"
    >
      <span className="sr-only">{labels.whatsapp}</span>
      <svg
        aria-hidden="true"
        className="h-8 w-8 md:h-9 md:w-9"
        fill="none"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4.25c-6.35 0-11.5 4.86-11.5 10.86 0 2.2.7 4.25 1.9 5.96L5.25 27.5l6.7-1.44c1.25.52 2.62.8 4.05.8 6.35 0 11.5-4.86 11.5-10.86S22.35 4.25 16 4.25Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12.24 10.9c.27-.6.5-.62.76-.62h.57c.18 0 .43.06.66.48.25.44.82 1.98.9 2.12.07.14.12.31.02.5-.1.21-.16.33-.32.51l-.47.51c-.15.16-.32.34-.14.66.18.32.8 1.25 1.72 2.02 1.17.98 2.16 1.28 2.48 1.43.32.15.51.13.7-.08.2-.22.8-.88 1.02-1.18.21-.3.43-.25.72-.15.3.1 1.9.84 2.22 1 .32.15.54.23.62.36.08.14.08.78-.18 1.54-.26.75-1.5 1.43-2.08 1.48-.54.05-1.24.07-2-.13-.46-.12-1.05-.31-1.8-.63-3.16-1.31-5.22-4.36-5.38-4.56-.16-.2-1.28-1.61-1.28-3.07 0-1.46.8-2.18 1.08-2.47Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
