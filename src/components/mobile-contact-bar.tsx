import { telegramHref, whatsappHref } from "@/lib/env";
import type { Dictionary } from "@/i18n/dictionaries";

type MobileContactBarProps = {
  labels: Dictionary["contactLinks"];
};

export function MobileContactBar({ labels }: MobileContactBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3 shadow-2xl md:hidden">
      <a
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white"
        href={whatsappHref()}
      >
        {labels.whatsapp}
      </a>
      <a
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky-600 px-4 text-sm font-semibold text-white"
        href={telegramHref()}
      >
        {labels.telegram}
      </a>
    </div>
  );
}
