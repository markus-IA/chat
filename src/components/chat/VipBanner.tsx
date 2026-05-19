import { Lock } from "lucide-react";

export const VipBanner = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[hsl(var(--tg-header))] px-3 py-2 text-white shadow-md animate-message-in"
  >
    <span className="absolute inset-0 animate-pulse bg-white/10" />
    <Lock className="h-3.5 w-3.5" />
    <span className="relative text-[13px] font-semibold tracking-wide">
      Desbloquear acesso ao grupo VIP
    </span>
  </button>
);
