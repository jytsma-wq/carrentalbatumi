import { telegramHref, whatsappHref } from "@/lib/env";
import type { Dictionary } from "@/i18n/dictionaries";

type MobileContactBarProps = {
  labels: Dictionary["contactLinks"];
};

export function MobileContactBar({ labels }: MobileContactBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-[#d9e2df] bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
      <a
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#183f36] px-4 text-sm font-semibold text-white transition active:scale-[0.98]"
        href={whatsappHref()}
      >
        {labels.whatsapp}
      </a>
      <a
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0f5f71]/25 bg-[#f7faf8] px-4 text-sm font-semibold text-[#0f5f71] transition active:scale-[0.98]"
        href={telegramHref()}
      >
        {labels.telegram}
      </a>
    </div>
  );
}
