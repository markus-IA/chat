import { Lock } from "lucide-react";

export const VipFooter = ({ onClick }: { onClick: () => void }) => (
  <div className="shrink-0 border-t border-black/10 bg-white px-3 py-2.5">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-3 text-white shadow-[0_4px_0_0_hsl(142_71%_30%)] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(142_71%_30%)]"
    >
      <Lock className="h-4 w-4" />
      <span className="text-[14px] font-bold uppercase tracking-wide">
        Desbloquear VIP — R$ 12,00
      </span>
    </button>
    <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
      Pagamento único · Acesso vitalício · 100% seguro
    </p>
  </div>
);
